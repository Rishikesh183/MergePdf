import { NextRequest, NextResponse } from 'next/server';
import PDFMerger from 'pdf-merger-js';

/**
 * Configuration constants
 */
const CONFIG = {
  /** Maximum timeout for merge operation (5 minutes) */
  MERGE_TIMEOUT: 5 * 60 * 1000,
  /** Maximum file size per PDF (10MB) */
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  /** Minimum number of files required for merging */
  MIN_FILES_REQUIRED: 2
} as const;

/**
 * Type definition for API error response
 */
type ErrorResponse = {
  error: string;
  status: number;
};

/**
 * Validates a single PDF file
 * @param file - The file to validate
 * @returns ErrorResponse if validation fails, null if validation passes
 */
function validatePDFFile(file: File): ErrorResponse | null {
  if (file.type !== 'application/pdf') {
    return {
      error: `File '${file.name}' is not a PDF file`,
      status: 400
    };
  }

  if (file.size > CONFIG.MAX_FILE_SIZE) {
    return {
      error: `File '${file.name}' exceeds the maximum size limit of 10MB`,
      status: 400
    };
  }

  return null;
}

/**
 * Handles POST requests for PDF merging
 * @param request - The incoming request containing PDF files
 * @returns NextResponse with either the merged PDF or an error message
 */
export async function POST(request: NextRequest) {
  // Create an AbortController for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.MERGE_TIMEOUT);
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    // Validate file presence
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No PDF files provided' },
        { status: 400 }
      );
    }

    // Validate minimum file requirement
    if (files.length < CONFIG.MIN_FILES_REQUIRED) {
      return NextResponse.json(
        { error: `At least ${CONFIG.MIN_FILES_REQUIRED} PDF files are required for merging` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      const validationError = validatePDFFile(file);
      if (validationError) {
        return NextResponse.json(
          { error: validationError.error },
          { status: validationError.status }
        );
      }
    }

    // Create a new PDF merger instance
    const merger = new PDFMerger();

    // Add each file to the merger with individual error handling
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const buffer = await file.arrayBuffer();
        await merger.add(buffer);
      } catch (error) {
    // Clear the timeout
    clearTimeout(timeoutId);

    // Handle timeout errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Operation timed out. Please try with fewer or smaller PDF files.' },
        { status: 408 }
      );
    }
        console.error(`Error processing file '${file.name}':`, error);
        return NextResponse.json(
          { error: `Failed to process file '${file.name}'. Please ensure it's a valid PDF file.` },
          { status: 400 }
        );
      }
    }

    // Merge the PDFs and get the result as a buffer
    const mergedPdfBuffer = await merger.saveAsBuffer();
    
    // Convert buffer to Uint8Array for proper response handling
    const uint8Array = new Uint8Array(mergedPdfBuffer);
    
    // Return the merged PDF as a response
    // Generate a timestamp-based filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `merged-${timestamp}.pdf`;

    // Clear the timeout
    clearTimeout(timeoutId);

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    // Handle unknown error types
    return NextResponse.json(
      { error: 'An unexpected error occurred while merging PDFs' },
      { status: 500 }
    );
  }
}