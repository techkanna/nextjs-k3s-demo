'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { trackCTAClick } from '../services/analytics'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const toggleMobileMenu = () => {
    trackCTAClick({ctaName:'mobile-menu-toggle', ctaType: 'navigation', additionalData: {
      action: isMobileMenuOpen ? 'close' : 'open',
      location: 'mobile-nav'
    }})
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        if (isMobileMenuOpen) {
          closeMobileMenu()
        }
      }
    }

    if (isMobileMenuOpen) {
      // Add both mouse and touch events for better mobile compatibility
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              Senthilkannan
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => trackCTAClick({ctaName: `nav-${item.toLowerCase()}`, ctaType:'navigation', additionalData: {
                  section: item.toLowerCase(),
                  location: 'desktop-nav'
                }})}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-dark-800/95 backdrop-blur-md border-t border-dark-700"
            >
              <div className="px-4 py-4 space-y-4 mb-4">
                {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      trackCTAClick({ctaName: `nav-${item.toLowerCase()}`, ctaType: 'navigation', additionalData: {
                        section: item.toLowerCase(),
                        location: 'mobile-nav'
                      }});
                      closeMobileMenu();
                    }}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
