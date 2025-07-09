'use client';

import React, { useState, useEffect } from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md' : 'bg-white/80 dark:bg-gray-900/80 shadow-sm'} ${scrolled ? 'border-gray-200 dark:border-gray-800' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 animate-fadeIn"
            >
              <Image
                src="/pdf-merge-logo.svg"
                alt="PDF Merger Logo"
                width={120}
                height={32}
                className="dark:invert"
                priority
              />
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-700 dark:text-gray-300 hover:text-[#FF5757] dark:hover:text-[#FF5757] font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-[#FF5757] hover:bg-[#FF3A3A] text-white font-medium rounded-lg text-sm sm:text-base px-4 sm:px-5 py-2 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "hover:scale-110 transition-transform duration-200"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar