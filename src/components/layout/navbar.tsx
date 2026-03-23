'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

const navLinks = [
  { name: "Expertise", href: "/expertise" },
  { name: "Methodology", href: "/methodology" },
  { name: "Ventures", href: "/ventures" }
]

const MenuToggle = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => (
  <button 
    onClick={toggle}
    className="relative z-50 w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center focus:outline-none"
  >
    <div className="w-5 h-5 flex flex-col justify-between items-center relative">
      <motion.span 
        animate={{ 
          rotate: isOpen ? 45 : 0, 
          y: isOpen ? 9 : 0,
          backgroundColor: isOpen ? '#ffffff' : '#94a3b8' 
        }}
        transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="w-full h-[2px] block origin-center"
      />
      <motion.span 
        animate={{ 
          opacity: isOpen ? 0 : 1,
          width: isOpen ? 0 : "100%",
          backgroundColor: '#94a3b8'
        }}
        transition={{ duration: 0.3, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="h-[2px] block"
      />
      <motion.span 
        animate={{ 
          rotate: isOpen ? -45 : 0, 
          y: isOpen ? -9 : 0,
          backgroundColor: isOpen ? '#ffffff' : '#94a3b8'
        }}
        transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="w-full h-[2px] block origin-center"
      />
    </div>
  </button>
)

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
    },
    open: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    }
  }

  const linkVariants: Variants = {
    closed: { y: "120%", rotate: 5, opacity: 0 },
    open: (i: number) => ({
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.2 + (i * 0.1) }
    })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "pt-4 px-4 md:pt-6 md:px-8" : "pt-8 px-6 md:px-12"
        }`}
      >
        <div 
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? "max-w-4xl bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] -mb-[1px]" 
              : "max-w-7xl bg-transparent px-0 py-0"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="/weatso.svg" 
              alt="Weatso" 
              className={`h-10 md:h-12 w-auto scale-[2] md:scale-[2.5] origin-left transition-all duration-300 ${
                isScrolled || isHomePage 
                  ? "brightness-0 invert" 
                  : "brightness-0"
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1 relative" onMouseLeave={() => setHoveredIndex(null)}>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href
              const isDarkBg = isScrolled || isHomePage
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    hoveredIndex === index || isActive
                      ? (isDarkBg ? "text-white" : "text-black")
                      : (isDarkBg ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-slate-900")
                  }`}
                >
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && hoveredIndex !== index && (
                     <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 border border-white/20 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:block">
            <a 
              href="https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0" 
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-full px-6 py-2.5 flex items-center gap-2 transition-all duration-300 ${
                isScrolled || isHomePage
                  ? "bg-white text-black hover:bg-slate-200" 
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl"
              }`}
            >
              <span className="relative z-10 text-sm font-bold">Initiate</span>
              <div className="relative z-10 w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
            </a>
          </div>

          <div className="md:hidden">
            <MenuToggle isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-30 bg-[#030303] flex flex-col justify-center px-8"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 flex flex-col gap-6 mt-16">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-baseline gap-4 text-5xl sm:text-7xl font-black text-white font-heading tracking-tighter"
                    >
                      <span className="text-sm font-mono text-blue-500 tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-2 left-0 w-full h-2 bg-blue-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.19,1.0,0.22,1.0]" />
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-6"
            >
              <div className="flex flex-col gap-2 text-white/50 text-xs tracking-widest uppercase">
                <span>hello@weatso.com</span>
                <span>Semarang, Indonesia</span>
              </div>
              <a 
                href="https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black"
              >
                <ArrowUpRight size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}