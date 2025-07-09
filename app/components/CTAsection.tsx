import React from 'react'

const CTAsection = () => {
  return (
    <div>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#FF5757] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Merge Your PDFs?</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
              Join thousands of users who trust our tool for their PDF merging needs. No sign-up required to get started!
            </p>
            <button className="bg-white text-[#FF5757] hover:bg-gray-100 font-medium rounded-lg text-lg px-8 py-4 transition-colors duration-200">
              Try It Now — It&apos;s Free!
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CTAsection