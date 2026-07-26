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
  { id: 'principle', href: '/#core' },
  { id: 'models', href: '/#models' },
  { id: 'portfolio', href: '/portofolio' },
  { id: 'verdict', href: '/#verdict' },
]

function smoothScroll(href: string) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return
  const hash = href.substring(hashIndex)
  const el = document.querySelector(hash)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const extrasRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileLinksRef = useRef<HTMLDivElement>(null)

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isCompactRef = useRef(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { locale, setLocale, t } = useLanguage()
  const { toggleTheme, isDark } = useTheme()

  // GSAP entrance
  useGSAP(() => {
    gsap.fromTo(
      pillRef.current,
      { y: -40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)', delay: 2.8 }
    )
  }, { scope: navRef })

  // Shrink: hide extras (logo, lang, theme, CTA)
  const shrink = useCallback(() => {
    if (isCompactRef.current || !extrasRef.current) return
    isCompactRef.current = true
    gsap.to(extrasRef.current, {
      width: 0,
      opacity: 0,
      marginLeft: 0,
      marginRight: 0,
      duration: 0.35,
      ease: 'power3.inOut',
      onComplete: () => {
        if (extrasRef.current) extrasRef.current.style.overflow = 'hidden'
      }
    })
  }, [])

  // Expand: show extras again
  const expand = useCallback(() => {
    if (!isCompactRef.current || !extrasRef.current) return
    isCompactRef.current = false
    extrasRef.current.style.overflow = 'visible'
    gsap.to(extrasRef.current, {
      width: 'auto',
      opacity: 1,
      marginLeft: '',
      marginRight: '',
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Scrolling down with velocity
      if (velocity > 2 && currentScrollY > 60) {
        shrink()
      }

      // Debounce: scroll stops → expand back
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        expand()
      }, 250)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [shrink, expand])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(mobileMenuRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' })
      gsap.fromTo(mobileLinksRef.current.children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.3 })
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileMenuRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power3.in' })
    }
  }, [isMobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex justify-center pt-3"
      >
        {/* Single pill — always centered */}
        <div
          ref={pillRef}
          className="pointer-events-auto flex items-center gap-1 px-5 py-2.5 rounded-full"
          style={{
            opacity: 0,
            width: 'fit-content',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            backgroundColor: 'var(--capsule-bg)',
            border: '1px solid var(--border-primary)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
          }}
        >

          {/* ── Extras group: desktop logo + lang + theme (hidden when scrolling) ── */}
          <div
            ref={extrasRef}
            className="flex items-center gap-1 overflow-visible"
            style={{ width: 'auto', opacity: 1 }}
          >

            {/* Language */}
            <button onClick={() => setLocale('id')} className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200"
              style={{ color: locale === 'id' ? 'var(--text-primary)' : 'var(--text-muted)', backgroundColor: locale === 'id' ? 'var(--border-primary)' : 'transparent' }}>ID</button>
            <span style={{ color: 'var(--text-muted)' }} className="text-[9px]">|</span>
            <button onClick={() => setLocale('en')} className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-200"
              style={{ color: locale === 'en' ? 'var(--text-primary)' : 'var(--text-muted)', backgroundColor: locale === 'en' ? 'var(--border-primary)' : 'transparent' }}>EN</button>

            {/* Theme */}
            <button onClick={toggleTheme} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle theme">
              {isDark
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>

            {/* Divider */}
            <span className="w-[1px] h-4 mx-1 flex-shrink-0" style={{ backgroundColor: 'var(--border-primary)' }} />
          </div>

          {/* ── Nav links (always visible) ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => { 
                  if (window.location.pathname === '/' && link.href.includes('#')) {
                    e.preventDefault(); 
                    smoothScroll(link.href) 
                  }
                }}
                className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest whitespace-nowrap rounded-full transition-colors duration-150"
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
                {t('nav', link.id as any)}
              </Link>
            ))}
          </div>

          {/* ── CTA (in extras group visually, but placed here for always-visible on desktop) ── */}
          <div className="hidden md:flex items-center ml-1">
            <span className="w-[1px] h-4 mr-2 flex-shrink-0" style={{ backgroundColor: 'var(--border-primary)' }} />
            <Link
              href="/initiate"
              className="btn-accent flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
              onMouseEnter={(e) => {
                const a = e.currentTarget.querySelector('.nav-arr') as HTMLElement
                if (a) gsap.to(a, { x: 3, duration: 0.22, ease: 'power2.out' })
              }}
              onMouseLeave={(e) => {
                const a = e.currentTarget.querySelector('.nav-arr') as HTMLElement
                if (a) gsap.to(a, { x: 0, duration: 0.22, ease: 'power2.out' })
              }}
            >
              <span>{t('nav', 'initiate')}</span>
              <svg className="nav-arr w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden ml-1 w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1.5 flex-shrink-0"
            style={{ border: '1px solid var(--border-primary)' }}
            aria-label="Toggle menu"
          >
            <span className="w-3.5 h-[1.5px] block transition-all duration-300 origin-center" style={{ backgroundColor: 'var(--text-secondary)', transform: isMobileOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
            <span className="w-3.5 h-[1.5px] block transition-all duration-300 origin-center" style={{ backgroundColor: 'var(--text-secondary)', transform: isMobileOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="fixed inset-0 z-[90] md:hidden flex flex-col justify-center px-8" style={{ backgroundColor: 'var(--bg-primary)', clipPath: 'inset(0% 0% 100% 0%)' }}>
        <div ref={mobileLinksRef} className="flex flex-col gap-6 mt-8">
          {navLinks.map((link, i) => (
            <div key={link.id} style={{ opacity: 0 }}>
              <Link href={link.href} onClick={(e) => { 
                  if (window.location.pathname === '/' && link.href.includes('#')) {
                    e.preventDefault(); 
                    setIsMobileOpen(false); 
                    setTimeout(() => smoothScroll(link.href), 500) 
                  } else {
                    setIsMobileOpen(false);
                  }
                }}
                className="flex items-baseline gap-4 text-5xl font-black font-heading tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>0{i + 1}</span>
                {t('nav', link.id as any)}
              </Link>
            </div>
          ))}
          <div style={{ opacity: 0 }}>
            <Link href="/initiate" onClick={() => setIsMobileOpen(false)} className="flex items-baseline gap-4 text-5xl font-black font-heading tracking-tighter" style={{ color: 'var(--text-primary)' }}>
              <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>05</span>
              {t('nav', 'initiate')}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end pt-6" style={{ borderTop: '1px solid var(--border-primary)' }}>
          <div className="flex flex-col gap-2 text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            <span>Semarang, Indonesia</span>
          </div>
        </div>
      </div>
    </>
  )
}