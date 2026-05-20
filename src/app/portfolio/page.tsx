'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { allProjects } from '@/lib/data'

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.poe-card-anim')
    if (!cards) return

    gsap.fromTo(cards, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2, // Wait for navbar entrance slightly
    })
  }, { scope: containerRef })

  return (
    <main className="min-h-screen pt-32 pb-20 selection:bg-accent selection:text-black font-sans" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 accent-line" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
              {t('poe', 'sectionTag') as string} / All
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>
            Ecosystem <br className="hidden md:block" /> Architectures.
          </h1>
          <p className="text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A comprehensive index of our digital engineering works. From enterprise commerce platforms to internal operational systems.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allProjects.map((project) => (
            <a key={project.name} href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="poe-card-anim perspective-container block w-full h-full" style={{ opacity: 0 }}>
              <div
                className="poe-card tilt-card card-gradient-border rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
                style={{ border: '1px solid var(--border-primary)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <img src={project.image} alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <h4 className="text-xl font-heading font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
                  <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                    {locale === 'id' ? project.tagId : project.tag}
                  </p>
                  <p className="text-xs leading-relaxed mt-auto" style={{ color: 'var(--text-secondary)' }}>
                    {project.techStack}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Back Button */}
        <div className="mt-20 flex justify-center">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full border transition-colors hover:bg-white/5" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
      
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  )
}
