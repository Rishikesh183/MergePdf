import React from 'react'
import Image from "next/image";
const Footer = () => {
  return (
    <div>
         <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/pdf-merge-logo.svg"
              alt="PDF Merger Logo"
              width={120}
              height={32}
              className="dark:invert"
            />
          </div>
            <span className="text-gray-600 dark:text-gray-400">© 2023 PDF Merger. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer