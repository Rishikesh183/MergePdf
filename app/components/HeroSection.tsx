import React from 'react'
import Image from "next/image";
const HeroSection = () => {
    return (
        <div>

            <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center">
                    <Image
                        src="/pdf-merge-logo.svg"
                        alt="PDF Merger Logo"
                        width={220}
                        height={48}
                        priority
                        className="dark:invert mb-6"
                    />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                        Merge PDF Files <span className="text-[#FF5757]">Effortlessly</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
                        Combine multiple PDF documents into a single file in seconds.
                        No installation required, completely free, and secure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button className="bg-[#FF5757] hover:bg-[#FF3A3A] text-white font-medium rounded-lg text-lg px-8 py-4 transition-colors duration-200 flex-1 flex items-center justify-center gap-2">
                            <span>Get Started</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4L8.9375 5.0625L13.125 9.25H4V10.75H13.125L8.9375 14.9375L10 16L16 10L10 4Z" fill="white" />
                            </svg>
                        </button>
                        <button className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg text-lg px-8 py-4 transition-colors duration-200 flex-1">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection