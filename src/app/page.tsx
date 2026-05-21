'use client'

import { useRef, useEffect, useState, useCallback, MouseEvent as RMouseEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SplitTextBlock from '@/lib/split-text'
import TextScramble from '@/lib/text-scramble'
import { useMagnetic } from '@/lib/magnetic'

gsap.registerPlugin(ScrollTrigger)

/* ============================================================
   DATA
   ============================================================ */

import { allProjects, clientProjects, proprietaryProjects } from '@/lib/data'

const partnerLogos = [
  { name: 'Anugerah Ventures', abbr: 'AV' },
  { name: 'WeThinkParty', abbr: 'WTP' },
  { name: 'Radeva', abbr: 'RDV' },
  { name: 'UD Dokar', abbr: 'UDD' },
  { name: 'Nugiartawidagdo', abbr: 'NAW' },
  { name: 'Evory', abbr: 'EVR' },
]

/* ============================================================
   HERO SECTION
   ============================================================ */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(eyebrowRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })

    // Split headline into words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word')
      tl.fromTo(words, { y: '110%', rotate: 3 }, { y: '0%', rotate: 0, stagger: 0.08, duration: 1, ease: 'power3.out' }, '-=0.4')
    }

    tl.fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')

    // Parallax on scroll — headline
    gsap.to(headlineRef.current, {
      y: '30%',
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Parallax depth — grid moves slower
    const grid = sectionRef.current?.querySelector('.bg-grid-pattern')
    if (grid) {
      gsap.to(grid, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, { scope: sectionRef })

  const headlineText = t('hero', 'headline') as string
  const words = headlineText.split(' ')

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Corner glow */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'rgba(59, 130, 246, 0.06)' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'rgba(139, 92, 246, 0.04)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-20">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-8" style={{ opacity: 0 }}>
          <span
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero', 'eyebrow') as string}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] font-heading font-black tracking-tighter leading-[0.85] mb-8 md:mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span className="word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-xl max-w-2xl leading-relaxed mb-10 md:mb-14 font-light"
          style={{ color: 'var(--text-secondary)', opacity: 0 }}
        >
          {t('hero', 'desc') as string}
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <Link
            href="/initiate"
            id="hero-cta-btn"
            className="btn-accent group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider"
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector('.hero-arrow') as HTMLElement
              if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.25, ease: 'power2.out' })
            }}
            onMouseLeave={(e) => {
              const arrow = e.currentTarget.querySelector('.hero-arrow') as HTMLElement
              if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: 'power2.out' })
            }}
          >
            <span>{t('cta', 'button') as string}</span>
            <svg
              className="hero-arrow w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
      >
        <div className="w-[1px] h-10 relative overflow-hidden">
          <div
            className="w-full h-full animate-pulse"
            style={{ backgroundColor: 'var(--text-muted)' }}
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  )
}

/* ============================================================
   IP MODELS SECTION (Bento Grid)
   ============================================================ */

function IPModelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, locale } = useLanguage()

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.model-card')
    if (!cards) return

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  const renderModelCard = (
    model: 'managed' | 'bespoke',
    index: string
  ) => {
    const title = (locale === 'id'
      ? (model === 'managed' ? 'Managed Ecosystem' : 'True Bespoke')
      : (model === 'managed' ? 'Managed Ecosystem' : 'True Bespoke'))
    const subtitle = locale === 'id'
      ? (model === 'managed' ? 'Infrastruktur Berkelanjutan / Licensing' : 'Akuisisi Arsitektur & Source Code Absolut')
      : (model === 'managed' ? 'Sustainable Infrastructure / Licensing' : 'Architecture & Absolute Source Code Acquisition')
    const desc = locale === 'id'
      ? (model === 'managed'
        ? 'Kami membangun, mengelola, dan memelihara seluruh ekosistem digital Anda secara berkelanjutan. Anda mendapatkan infrastruktur kelas enterprise tanpa beban teknis operasional — cukup fokus pada pertumbuhan bisnis.'
        : 'Kepemilikan penuh. Kami merancang arsitektur sistem dari nol sesuai spesifikasi absolut Anda, lalu menyerahkan seluruh source code dan dokumentasi teknis. Infrastruktur Anda, kendali Anda.')
      : (model === 'managed'
        ? 'We build, manage, and maintain your entire digital ecosystem continuously. You get enterprise-class infrastructure without operational technical burden — just focus on business growth.'
        : 'Full ownership. We engineer system architecture from scratch to your absolute specifications, then hand over all source code and technical documentation. Your infrastructure, your control.')
    const pts = locale === 'id'
      ? (model === 'managed'
        ? ['Pemeliharaan & pembaruan berkelanjutan', 'Skalabilitas otomatis', 'Dukungan teknis prioritas 24/7', 'Model biaya yang dapat diprediksi']
        : ['Kepemilikan source code 100%', 'Dokumentasi arsitektur lengkap', 'Transfer pengetahuan ke tim internal', 'Tanpa ketergantungan vendor'])
      : (model === 'managed'
        ? ['Continuous maintenance & updates', 'Automatic scalability', 'Priority 24/7 technical support', 'Predictable cost model']
        : ['100% source code ownership', 'Complete architecture documentation', 'Knowledge transfer to internal team', 'Zero vendor lock-in'])

    return (
      <div
        className="model-card card-gradient-border rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col h-full transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--text-muted)' }}
          >
            {index}
          </span>
        </div>

        <h3
          className="text-2xl md:text-3xl font-heading font-black tracking-tighter mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        <p
          className="text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </p>

        <p
          className="text-sm leading-relaxed mb-8 flex-grow"
          style={{ color: 'var(--text-secondary)' }}
        >
          {desc}
        </p>

        <ul className="space-y-3">
          {pts.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: 'var(--text-muted)' }}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="models"
      className="py-24 md:py-32 scroll-mt-24"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 accent-line" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
              {t('models', 'sectionTag') as string}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('models', 'sectionTitle') as string}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderModelCard('managed', '01')}
          {renderModelCard('bespoke', '02')}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CORE ADVANTAGES (Authority Injection)
   ============================================================ */

function CoreAdvantages() {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const indicatorsRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  const slides = (t('core', 'slides') as unknown as string[]) || []

  useGSAP(() => {
    if (!ref.current || !textRef.current || slides.length <= 1) return

    const textContainer = textRef.current
    const slideEls = textContainer.querySelectorAll('.ca-slide')
    const indicatorEls = indicatorsRef.current?.querySelectorAll('.ca-indicator')

    // Entrance animation
    gsap.fromTo(ref.current.querySelectorAll('.ca-line'), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    })

    // Setup auto-swapping timeline
    const tl = gsap.timeline({ repeat: -1 })

    // Initialize all slides to hidden, first to visible
    gsap.set(slideEls, { opacity: 0, y: 20 })
    gsap.set(slideEls[0], { opacity: 1, y: 0 })

    slides.forEach((_, i) => {
      const nextI = (i + 1) % slides.length
      const currentSlide = slideEls[i]
      const nextSlide = slideEls[nextI]

      // Hold slide for 3 seconds
      tl.to({}, { duration: 3 })

      // Animate out current slide
      tl.to(currentSlide, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })

      // Update indicators
      tl.call(() => {
        if (indicatorEls) {
          indicatorEls.forEach((ind, idx) => {
            gsap.to(ind, {
              backgroundColor: idx === nextI ? 'var(--accent-from)' : 'var(--border-primary)',
              duration: 0.3,
            })
          })
        }
      })

      // Set next slide position before animating in
      tl.set(nextSlide, { y: 20, opacity: 0 })
      
      // Animate in next slide
      tl.to(nextSlide, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    })

    return () => { tl.kill() }
  }, { scope: ref, dependencies: [slides, locale] })

  return (
    <section ref={ref} id="core" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="ca-line mb-8">
          <TextScramble
            text={t('core', 'line1') as string}
            as="span"
            className="text-sm md:text-base font-bold tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>
        {/* Stacked slides — grid ensures container height matches the tallest slide automatically */}
        <div ref={textRef} className="ca-line max-w-5xl grid relative">
          {slides.map((slide, i) => (
            <h2
              key={`${locale}-${i}`}
              className="ca-slide text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[1.1]"
              style={{
                gridArea: '1 / 1',
                color: 'var(--text-primary)',
                opacity: i === 0 ? 1 : 0,
              }}
            >
              {slide}
            </h2>
          ))}
        </div>

        {/* Slide indicators */}
        <div ref={indicatorsRef} className="ca-line flex gap-2 mt-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className="ca-indicator w-8 h-[2px] rounded-full"
              style={{ backgroundColor: i === 0 ? 'var(--accent-from)' : 'var(--border-primary)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   STATS COUNTER SECTION
   ============================================================ */

function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useGSAP(() => {
    const counters = ref.current?.querySelectorAll('.stat-number')
    if (!counters) return

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10)
      if (isNaN(target) || target === 0) return

      gsap.fromTo(el, { textContent: '0' }, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    })

    gsap.fromTo(ref.current?.querySelectorAll('.stat-item') || [], { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    })
  }, { scope: ref })

  const stats = [
    { value: '2026', label: t('stats', 'est') as string, suffix: '' },
    { value: '10', label: t('stats', 'projects') as string, suffix: '+' },
    { value: '5', label: t('stats', 'ecosystems') as string, suffix: '' },
    { value: '24/7', label: t('stats', 'support') as string, suffix: '' },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center md:text-left" style={{ opacity: 0 }}>
              <div className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-accent mb-2">
                {s.value === '24/7' ? (
                  <span>24/7</span>
                ) : (
                  <><span className="stat-number" data-target={s.value}>0</span>{s.suffix}</>
                )}
              </div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PARTNER GRID (Strategic Engagements)
   ============================================================ */

function PartnerGrid() {
  const { t } = useLanguage()

  const handleLogoEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      opacity: 1,
      filter: 'grayscale(0%) brightness(1)',
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleLogoLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      opacity: 0.2,
      filter: 'grayscale(100%) brightness(0.6)',
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-primary)',
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-[1px] w-8 accent-line" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            {t('partners', 'tag') as string}
          </span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 border-l border-t" style={{ borderColor: 'var(--border-primary)' }}>
          {partnerLogos.map((p) => (
            <div
              key={p.name}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
              className="partner-logo-item border-r border-b px-6 py-8 flex items-center justify-center cursor-default"
              style={{
                borderColor: 'var(--border-primary)',
                opacity: 0.2,
                filter: 'grayscale(100%) brightness(0.6)',
                willChange: 'opacity, filter',
              }}
            >
              <span
                className="text-base md:text-xl font-heading font-black tracking-tighter text-center select-none"
                style={{ color: 'var(--text-primary)' }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function POESection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  useGSAP(() => {
    // GSAP MatchMedia for responsive animations
    const mm = gsap.matchMedia()

    // Desktop: Pinned Horizontal Scroll
    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      
      // If the track is wider than the viewport, calculate distance to scroll
      const distance = trackWidth > viewportWidth ? trackWidth - viewportWidth + 64 : 0

      if (distance > 0) {
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${distance}`,
            pin: true,
            scrub: 0.5,
          }
        })
      }
    })

    // Mobile: Simple Entrance Fade
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(trackRef.current?.querySelectorAll('.poe-card') || [], { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  const renderCard = (project: typeof allProjects[0]) => (
    <a key={project.name} href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="perspective-container block w-full h-full">
      <div data-project={project.name}
        className="poe-card tilt-card card-gradient-border rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        style={{ border: '1px solid var(--border-primary)' }}
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <img src={project.image} alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <div className="p-3 md:p-5 flex-1 flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4 className="text-sm md:text-lg font-heading font-bold tracking-tight md:mb-1 line-clamp-1" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
          <p className="text-[9px] md:text-xs font-medium uppercase tracking-widest line-clamp-1" style={{ color: 'var(--text-muted)' }}>
            {locale === 'id' ? project.tagId : project.tag}
          </p>
        </div>
      </div>
    </a>
  )

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-[1px] w-8 accent-line" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>{t('poe', 'sectionTag') as string}</span>
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{t('poe', 'clientTitle') as string}</h3>
          </div>
          <Link href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity" style={{ color: 'var(--accent-from)' }}>
            View All Portfolios →
          </Link>
        </div>
      </div>

      {/* Track: Grid on mobile (cols-2), Flex row on desktop */}
      <div className="max-w-7xl mx-auto md:pl-6">
        <div ref={trackRef} className="grid grid-cols-2 gap-3 px-6 md:px-0 md:flex md:flex-row md:gap-6 md:w-max">
          {allProjects.slice(0, 5).map((project) => (
            <div key={project.name} className="w-full md:w-[400px] lg:w-[480px] md:flex-shrink-0">
              {renderCard(project)}
            </div>
          ))}
          {/* Desktop 'View All' spacer/card at the end of scroll */}
          <div className="hidden md:flex items-center justify-center w-[200px] lg:w-[280px] flex-shrink-0 pr-6">
            <Link href="/portfolio" className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-dashed transition-colors" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
              <div className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors group-hover:bg-white/5" style={{ borderColor: 'var(--border-primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-center">See All</span>
            </Link>
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 px-6 flex justify-center md:hidden">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full border transition-colors" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}>
            View All Portfolios →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   THE VERDICT (Testimonials)
   ============================================================ */

const testimonials = [
  {
    name: 'Affan',
    role: 'Tangwin Cut',
    initials: 'AF',
    ownerImage: '', // Placeholder for actual owner PNG
    quote: {
      id: 'Sistem kustom dari WEATSO merevolusi operasional barbershop kami. Jadwal dan antrean pelanggan kini tertata secara otomatis tanpa hambatan.',
      en: 'The custom system from WEATSO revolutionized our barbershop operations. Schedules and customer queues are now neatly organized automatically without a hitch.',
    },
  },
  {
    name: 'Raharjo',
    role: 'UD Dokar',
    initials: 'RH',
    ownerImage: '', // Placeholder for actual owner PNG
    quote: {
      id: 'Otomatisasi sistem manajemen order percetakan ini menghemat puluhan jam kerja manual kami setiap minggu. Arsitektur yang sangat presisi.',
      en: 'This printing order management automation saves us dozens of manual labor hours every week. Highly precise architecture.',
    },
  },
  {
    name: 'Rosita',
    role: 'Radeva WO',
    initials: 'RS',
    ownerImage: '', // Placeholder for actual owner PNG
    quote: {
      id: 'Dari konsep hingga deployment, prosesnya sangat profesional. Ekosistem digital kami sekarang mengkonversi 3x lipat lebih baik dari sebelumnya.',
      en: 'From concept to deployment, the process was incredibly professional. Our digital ecosystem now converts 3x better than before.',
    },
  },
]

function VerdictSection() {
  const ref = useRef<HTMLElement>(null)
  const { t, locale } = useLanguage()

  useGSAP(() => {
    gsap.fromTo(ref.current?.querySelectorAll('.verdict-card') || [], { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
    })
  }, { scope: ref })

  return (
    <section ref={ref} id="verdict" className="py-24 md:py-32 scroll-mt-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 accent-line" />
            <TextScramble text={t('verdict', 'sectionTag') as string} as="span" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            {t('verdict', 'sectionTitle') as string}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="verdict-card card-gradient-border rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)', opacity: 0 }}
            >
              {/* Large Photo Area */}
              <div className="relative h-52 md:h-56 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' }}>
                {item.ownerImage && (
                  <img
                    src={item.ownerImage}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }} />
                {/* Fallback initials */}
                {!item.ownerImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-heading font-black text-white/30">{item.initials}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 pt-4 relative z-10 flex flex-col flex-grow">
                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                  {locale === 'id' ? item.quote.id : item.quote.en}
                </p>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CTA SECTION
   ============================================================ */

function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll('.cta-animate'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  // Cursor-following blob
  useEffect(() => {
    const section = sectionRef.current
    const blob = blobRef.current
    if (!section || !blob) return

    const handleMove = (e: globalThis.MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(blob, {
        x: x - 150,
        y: y - 150,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    const handleEnter = () => {
      gsap.to(blob, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
    }

    const handleLeave = () => {
      gsap.to(blob, { opacity: 0, scale: 0.5, duration: 0.5, ease: 'power2.in' })
    }

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseenter', handleEnter)
    section.addEventListener('mouseleave', handleLeave)

    return () => {
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseenter', handleEnter)
      section.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Cursor-following blob */}
      <div
        ref={blobRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0,
          transform: 'scale(0.5)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="cta-animate flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-6 accent-line" />
          <span
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('cta', 'tag') as string}
          </span>
          <div className="h-[1px] w-6 accent-line" />
        </div>

        <h2
          className="cta-animate text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.9] mb-8 whitespace-pre-line break-words w-full px-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('cta', 'headline') as string}
        </h2>

        <p
          className="cta-animate text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('cta', 'desc') as string}
        </p>

        <div className="cta-animate">
          <Link
            href="/initiate"
            id="cta-section-btn"
            className="btn-accent group inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-wider"
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement
              if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.25, ease: 'power2.out' })
            }}
            onMouseLeave={(e) => {
              const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement
              if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: 'power2.out' })
            }}
          >
            <span>{t('cta', 'button') as string}</span>
            <svg
              className="cta-arrow w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function EcosystemSection() {
  const { t, locale } = useLanguage()

  const renderCard = (project: typeof proprietaryProjects[0] & { archDesc?: string, techStack?: string }) => (
    <a key={project.name} href={project.url || '#'} target="_blank" rel="noopener noreferrer" className="perspective-container block w-full h-full">
      <div data-project={project.name}
        className="poe-card tilt-card card-gradient-border rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        style={{ border: '1px solid var(--border-primary)' }}
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <img src={project.image} alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <div className="p-3 md:p-5 flex-1 flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4 className="text-sm md:text-lg font-heading font-bold tracking-tight md:mb-1 line-clamp-1" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
          <p className="text-[9px] md:text-xs font-medium uppercase tracking-widest line-clamp-1" style={{ color: 'var(--text-muted)' }}>
            {locale === 'id' ? project.tagId : project.tag}
          </p>
        </div>
      </div>
    </a>
  )

  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="w-full h-[1px] mb-20" style={{ backgroundColor: 'var(--border-primary)' }} />
        <div>
          <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-3" style={{ color: 'var(--text-primary)' }}>{t('poe', 'propTitle') as string}</h3>
          <p className="text-sm leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('poe', 'propSubtext') as string}</p>
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-6">
            {allProjects.slice(5).map((project) => (
              <div key={project.name} className="w-full md:w-[400px] lg:w-[480px]">
                {renderCard(project)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden w-full">
      <div className="bg-noise" />
      <Navbar />
      <HeroSection />
      <PartnerGrid />
      <StatsSection />
      <CoreAdvantages />
      <IPModelsSection />
      <POESection />
      <EcosystemSection />
      <VerdictSection />
      <CTASection />
      <Footer />
    </main>
  )
}