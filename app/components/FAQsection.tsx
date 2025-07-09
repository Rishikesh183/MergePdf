import React from 'react'

const FAQsection = () => {
  return (
    <div>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FAQ Item 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Is this service really free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, our PDF merger is completely free to use with no hidden fees. We believe in providing essential tools that everyone can access without cost barriers.
            </p>
          </div>
          
          {/* FAQ Item 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Is my data secure?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutely. Your files are processed in your browser and are never stored on our servers. After processing, all data is automatically deleted for your privacy.
            </p>
          </div>
          
          {/* FAQ Item 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Is there a file size limit?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our free version allows merging PDFs up to 100MB in total size. For larger files, we recommend using our desktop application or premium web version.
            </p>
          </div>
          
          {/* FAQ Item 4 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Can I rearrange pages before merging?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can drag and drop your files to rearrange them in the order you want before merging. You can also remove files from the queue if needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQsection