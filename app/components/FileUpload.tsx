/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Calculate total size of all files
  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const formattedTotalSize = (totalSize / (1024 * 1024)).toFixed(2);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const pdfFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === 'application/pdf'
      );
      
      if (pdfFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
        if (onFilesSelected) {
          onFilesSelected([...files, ...pdfFiles]);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const pdfFiles = Array.from(e.target.files).filter(
        file => file.type === 'application/pdf'
      );
      
      if (pdfFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
        if (onFilesSelected) {
          onFilesSelected([...files, ...pdfFiles]);
        }
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // Create FormData to send files to the API
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      // Call the API endpoint
      const response = await fetch('/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to merge PDFs');
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show success message
      setSuccess(`Successfully merged ${files.length} PDF files!`);
      setTimeout(() => setSuccess(null), 5000);
      
      // Add a button to clear files after successful merge
      const shouldClear = window.confirm('Files merged successfully! Would you like to clear the file list?');
      if (shouldClear) {
        setFiles([]);
        if (onFilesSelected) {
          onFilesSelected([]);
        }
      }
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-[#FF5757] bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-float">
            <Image
              src="/pdf-icon.svg"
              alt="Upload PDF"
              width={80}
              height={80}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Drag & Drop PDF Files Here
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            or click to browse from your device
          </p>
          <label className="bg-[#FF5757] hover:bg-[#FF3A3A] text-white font-medium rounded-lg px-6 py-3 cursor-pointer transition-colors duration-200">
            Select PDF Files
            <input
              type="file"
              multiple
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Selected Files ({files.length})
              </h3>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all files?')) {
                    setFiles([]);
                    if (onFilesSelected) {
                      onFilesSelected([]);
                    }
                  }
                }}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Clear All
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total Size: {formattedTotalSize} MB
            </div>
          </div>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/pdf-icon.svg"
                    alt="PDF"
                    width={24}
                    height={24}
                  />
                  <span className="text-gray-900 dark:text-white truncate max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={mergePDFs}
              disabled={isLoading || files.length < 2}
              className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4A7AFF] hover:bg-blue-600'} text-white font-medium rounded-lg px-8 py-3 transition-colors duration-200 flex items-center gap-2`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Image
                    src="/merge-icon.svg"
                    alt="Merge"
                    width={24}
                    height={24}
                  />
                  Merge PDFs
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}