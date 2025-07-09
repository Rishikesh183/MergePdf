import React from 'react'
import FileUpload from './FileUpload'
const UploadSection = () => {
  return (
    <div>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Upload Your PDF Files</h2>
        <FileUpload />
      </section>
    </div>
  )
}

export default UploadSection