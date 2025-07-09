import React from 'react'
import Image from "next/image"
const FeatureSection = () => {
  return (
    <div>
        {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-6">
              <Image
                src="/pdf-icon.svg"
                alt="Upload PDFs"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Upload Your PDFs</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Select multiple PDF files from your device or drag and drop them into the upload area.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-full mb-6">
              <Image
                src="/merge-icon.svg"
                alt="Merge PDFs"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Arrange & Merge</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Rearrange the order of your PDFs as needed, then click the merge button to combine them.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-full mb-6">
              <Image
                src="/download-icon.svg"
                alt="Download PDF"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Download Result</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Download your merged PDF file instantly. Your files remain private and are deleted after processing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeatureSection