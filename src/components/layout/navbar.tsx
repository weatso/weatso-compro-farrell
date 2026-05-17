'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { id: 'models', href: '#models' },
  { id: 'portfolio', href: '#portfolio' },
]

export default function Navbar() {
  const capsuleRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isCollapsed = useRef(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileLinksRef = useRef<HTMLDivElement>(null)

  const { locale, setLocale, t } = useLanguage()
  const { toggleTheme, isDark } = useTheme()

  // Collapse: hide text links, shrink capsule
  const collapse = useCallback(() => {
    if (isCollapsed.current || !linksRef.current || !ctaRef.current || !capsuleRef.current) return
    isCollapsed.current = true

    // 1. Fade out text FIRST
    gsap.to([linksRef.current, ctaRef.current], {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set([linksRef.current!, ctaRef.current!], { display: 'none', width: 0 })
      },
    })

    // 2. Then shrink capsule
    gsap.to(capsuleRef.current, {
      maxWidth: 200,
      paddingLeft: 16,
      paddingRight: 16,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, [])

  // Expand: show text links, grow capsule
  const expand = useCallback(() => {
    if (!isCollapsed.current || !linksRef.current || !ctaRef.current || !capsuleRef.current) return
    isCollapsed.current = false

    // 1. Grow capsule first
    gsap.to(capsuleRef.current, {
      maxWidth: 700,
      paddingLeft: 24,
      paddingRight: 24,
      duration: 0.4,
      ease: 'power3.out',
    })

    // 2. Then reveal text
    gsap.set([linksRef.current, ctaRef.current], { display: 'flex', width: 'auto' })
    gsap.to([linksRef.current, ctaRef.current], {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      delay: 0.2,
    })
  }, [])

  // GSAP entrance
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
    )
  }, { scope: navRef })

  // Scroll velocity + debounce logic
  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        const velocity = self.getVelocity()

        // Scrolling down with velocity
        if (Math.abs(velocity) > 100) {
          collapse()

          // Reset debounce timer
          if (debounceRef.current) clearTimeout(debounceRef.current)
          debounceRef.current = setTimeout(() => {
            expand()
          }, 250)
        }
      },
      onLeaveBack: () => {
        // Back at top — always expand
        if (debounceRef.current) clearTimeout(debounceRef.current)
        expand()
      },
    })

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  })

  // Mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(mobileMenuRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.7,
        ease: 'power4.inOut',
      })
      gsap.fromTo(
        mobileLinksRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileMenuRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'power3.in',
      })
    }
  }, [isMobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-5 px-4 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          ref={capsuleRef}
          className="capsule pointer-events-auto flex items-center gap-1 py-3 backdrop-blur-xl border transition-colors duration-300"
          style={{
            backgroundColor: 'var(--capsule-bg)',
            borderColor: 'var(--border-primary)',
            maxWidth: 700,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/weatso.svg"
              alt="WEATSO"
              className="h-7 w-auto transition-all duration-300"
              style={{
                filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)',
                transform: 'scale(1.8)',
                transformOrigin: 'left center',
              }}
            />
          </Link>

          {/* Nav Links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1 ml-4 overflow-hidden">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap rounded-full transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.backgroundColor = 'var(--border-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {t('nav', link.id as 'models' | 'portfolio')}
              </a>
            ))}
          </div>

          <div className="flex-1" />

          {/* Language Switcher */}
          <div className="flex items-center gap-0.5 mr-1 flex-shrink-0">
            <button
              onClick={() => setLocale('id')}
              className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200"
              style={{
                color: locale === 'id' ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: locale === 'id' ? 'var(--border-primary)' : 'transparent',
              }}
            >
              ID
            </button>
            <span style={{ color: 'var(--text-muted)' }} className="text-[10px]">|</span>
            <button
              onClick={() => setLocale('en')}
              className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200"
              style={{
                color: locale === 'en' ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: locale === 'en' ? 'var(--border-primary)' : 'transparent',
              }}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          {/* CTA (desktop) */}
          <div ref={ctaRef} className="hidden md:flex flex-shrink-0 ml-2">
            <Link
              href="/initiate"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                backgroundColor: isDark ? '#FFFFFF' : '#000000',
                color: isDark ? '#000000' : '#FFFFFF',
              }}
            >
              {t('nav', 'initiate')}
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#3B82F6' }} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden ml-1 w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            style={{ border: '1px solid var(--border-primary)' }}
            aria-label="Toggle menu"
          >
            <span className="w-4 h-[1.5px] block transition-all duration-300 origin-center" style={{ backgroundColor: 'var(--text-secondary)', transform: isMobileOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
            <span className="w-4 h-[1.5px] block transition-all duration-300 origin-center" style={{ backgroundColor: 'var(--text-secondary)', transform: isMobileOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[90] md:hidden flex flex-col justify-center px-8"
        style={{ backgroundColor: 'var(--bg-primary)', clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <div ref={mobileLinksRef} className="flex flex-col gap-6 mt-8">
          {navLinks.map((link, i) => (
            <div key={link.id} style={{ opacity: 0 }}>
              <a href={link.href} onClick={() => setIsMobileOpen(false)}
                className="flex items-baseline gap-4 text-5xl font-black font-heading tracking-tighter"
                style={{ color: 'var(--text-primary)' }}>
                <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>0{i + 1}</span>
                {t('nav', link.id as 'models' | 'portfolio')}
              </a>
            </div>
          ))}
          <div style={{ opacity: 0 }}>
            <Link href="/initiate" onClick={() => setIsMobileOpen(false)}
              className="flex items-baseline gap-4 text-5xl font-black font-heading tracking-tighter"
              style={{ color: 'var(--text-primary)' }}>
              <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>03</span>
              {t('nav', 'initiate')}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end pt-6" style={{ borderTop: '1px solid var(--border-primary)' }}>
          <div className="flex flex-col gap-2 text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            <span>hello@weatso.com</span>
            <span>Semarang, Indonesia</span>
          </div>
        </div>
      </div>
    </>
  )
}