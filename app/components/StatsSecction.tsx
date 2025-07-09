import React from 'react'

const StatsSecction = () => {
  return (
    <div>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-[#FF5757] to-[#FF8A8A] rounded-xl text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Join our growing community of satisfied users who trust our PDF merger tool for their document needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">500K+</div>
            <div className="text-white/80">PDFs Merged</div>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">100K+</div>
            <div className="text-white/80">Happy Users</div>
          </div>
          
          {/* Stat 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-white/80">Uptime</div>
          </div>
          
          {/* Stat 4 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <div className="text-white/80">User Rating</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatsSecction