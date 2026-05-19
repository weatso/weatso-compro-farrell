'use client'

import { useRef, useEffect, useState, useCallback, MouseEvent as RMouseEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import SplitTextBlock from '@/lib/split-text'
import TextScramble from '@/lib/text-scramble'
import { useMagnetic } from '@/lib/magnetic'

gsap.registerPlugin(ScrollTrigger, Flip)

/* ============================================================
   DATA
   ============================================================ */

const proprietaryProjects = [
  {
    name: 'Anugerah Ventures',
    tag: 'Corporate Investment Platform',
    tagId: 'Platform Investasi Korporat',
    image: '/images/thumbnail-anugerah.webp',
    url: 'https://anugerahventures.com',
  },
  {
    name: 'Laddify',
    tag: 'SaaS Growth Platform',
    tagId: 'Platform Pertumbuhan SaaS',
    image: '/images/thumbnail-laddify.webp',
    url: '#',
  },
  {
    name: 'Evory',
    tag: 'Digital Wedding Ecosystem',
    tagId: 'Ekosistem Pernikahan Digital',
    image: '/images/thumbnail-evory.png',
    url: 'https://evory.id',
  },
  {
    name: 'Lokal',
    tag: 'Local Commerce Platform',
    tagId: 'Platform Perdagangan Lokal',
    image: '/images/thumbnail-lokal.webp',
    url: 'https://pakalilokal.com',
  },
]

const clientProjects = [
  {
    name: 'Nugiartawidagdo',
    tag: 'Furniture & Interior Design',
    tagId: 'Furnitur & Desain Interior',
    image: '/images/thumbnail-nugi.webp',
    url: 'https://desain-interior.vercel.app/',
  },
  {
    name: 'Radeva',
    tag: 'Wedding Organizer',
    tagId: 'Wedding Organizer',
    image: '/images/thumbnail-radeva.webp',
    url: 'https://radeva-landing-page.vercel.app/',
  },
  {
    name: 'WeThinkParty',
    tag: 'Event Organizer',
    tagId: 'Event Organizer',
    image: '/images/thumbnail-wtp.png',
    url: 'https://wtp-landing-page-linktree-farrell.vercel.app/',
  },
  {
    name: 'UD Dokar',
    tag: 'Printing & Packaging',
    tagId: 'Percetakan & Kemasan',
    image: '/images/thumbnail-dokar.webp',
    url: 'https://uddokar.vercel.app/login',
  },
  {
    name: 'Tangwin Cut',
    tag: 'Barbershop',
    tagId: 'Barbershop',
    image: '/images/thumbnail-tangwin.png',
    url: '#',
  },
]

const allProjects = [...clientProjects, ...proprietaryProjects].map((p) => ({
  ...p,
  archDesc: 'Full-stack architecture built on Next.js, PostgreSQL, and Redis cache layer. Microservices deployed via Docker on managed Kubernetes cluster with auto-scaling policies.',
  techStack: 'Next.js · TypeScript · PostgreSQL · Redis · Docker · Kubernetes',
  link: p.url || '#',
}))

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
            className="btn-accent group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            <span>{t('cta', 'button') as string}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
  const textRef = useRef<HTMLHeadingElement>(null)
  const indexRef = useRef(0)
  const { t, locale } = useLanguage()

  const slides = (t('core', 'slides') as unknown as string[]) || []

  useGSAP(() => {
    gsap.fromTo(ref.current?.querySelectorAll('.ca-line') || [], { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
    })
  }, { scope: ref })

  useEffect(() => {
    if (!textRef.current || slides.length <= 1) return
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slides.length
      const el = textRef.current
      if (!el) return

      gsap.to(el, {
        opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          el.textContent = slides[indexRef.current]
          gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        },
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [slides, locale])

  return (
    <section ref={ref} id="core" className="py-24 md:py-32 scroll-mt-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="ca-line mb-8 flex items-center gap-3">
          <div className="h-[1px] w-8 accent-line" />
          <TextScramble
            text={t('core', 'line1') as string}
            as="span"
            className="text-sm md:text-base font-bold tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>
        <div className="ca-line max-w-5xl min-h-[4em] md:min-h-[3em]">
          <h2
            ref={textRef}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
          >
            {slides[0] || ''}
          </h2>
        </div>

        {/* Slide indicators */}
        <div className="ca-line flex gap-2 mt-6">
          {slides.map((_, i) => (
            <div key={i} className="w-8 h-[2px] rounded-full" style={{ backgroundColor: i === 0 ? 'var(--accent-from)' : 'var(--border-primary)' }} />
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

function PartnerMarquee() {
  const { t } = useLanguage()
  const logos = [...partnerLogos, ...partnerLogos]

  return (
    <section className="py-10 md:py-14 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)' }}>
      <div className="flex items-center gap-3 mb-8 px-6 max-w-7xl mx-auto">
        <div className="h-[1px] w-8 accent-line" />
        <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>{t('partners', 'tag') as string}</span>
      </div>
      <div className="marquee-track flex gap-16 md:gap-24 animate-marquee whitespace-nowrap">
        {logos.map((p, i) => (
          <span key={`${p.name}-${i}`} className="text-2xl md:text-3xl font-heading font-black tracking-tighter opacity-20 transition-all duration-500 cursor-default flex-shrink-0 marquee-accent" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   POE SECTION (Cinematic Flip Takeover)
   ============================================================ */

function POESection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const takeoverRef = useRef<HTMLDivElement>(null)
  const takeoverImgRef = useRef<HTMLImageElement>(null)
  const takeoverContentRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [activeProject, setActiveProject] = useState<typeof allProjects[0] | null>(null)
  const { t, locale } = useLanguage()

  const handleScrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = 360
    carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }, [])

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.poe-card')
    if (!cards) return
    gsap.fromTo(cards, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    })
  }, { scope: sectionRef })

  const handleCardClick = useCallback((project: typeof allProjects[0]) => {
    const cardEl = document.querySelector(`[data-project="${project.name}"]`) as HTMLElement
    if (!cardEl || !takeoverRef.current || !takeoverImgRef.current || !takeoverContentRef.current) return

    setActiveProject(project)
    const rect = cardEl.getBoundingClientRect()
    const img = takeoverImgRef.current
    const content = takeoverContentRef.current

    document.body.style.overflow = 'hidden'
    gsap.set(takeoverRef.current, { display: 'flex', pointerEvents: 'auto' })
    gsap.set(content, { opacity: 0, y: 40 })

    const tl = gsap.timeline()
    tl.fromTo(img,
      { position: 'fixed', left: rect.left, top: rect.top, width: rect.width, height: rect.height, borderRadius: 16, zIndex: 51 },
      { left: 0, top: 0, width: '100vw', height: '100vh', borderRadius: 0, duration: 0.8, ease: 'power4.inOut' }
    )
    tl.to(content, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    tlRef.current = tl
  }, [])

  const handleClose = useCallback(() => {
    if (!tlRef.current || !takeoverRef.current) return
    tlRef.current.reverse()
    tlRef.current.eventCallback('onReverseComplete', () => {
      gsap.set(takeoverRef.current!, { display: 'none', pointerEvents: 'none' })
      document.body.style.overflow = ''
      setActiveProject(null)
      tlRef.current = null
    })
  }, [])

  const handleNavigate = useCallback((direction: 'next' | 'prev') => {
    if (!activeProject || !takeoverContentRef.current || !takeoverImgRef.current) return
    const currentIndex = allProjects.findIndex(p => p.name === activeProject.name)
    if (currentIndex === -1) return

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (nextIndex >= allProjects.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = allProjects.length - 1

    const nextProj = allProjects[nextIndex]

    gsap.to([takeoverContentRef.current, takeoverImgRef.current], {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveProject(nextProj)
        gsap.to([takeoverContentRef.current, takeoverImgRef.current], { opacity: 1, duration: 0.4 })
      }
    })
  }, [activeProject])

  const renderCard = (project: typeof allProjects[0]) => (
    <div key={project.name} className="perspective-container">
      <div data-project={project.name}
        className="poe-card tilt-card card-gradient-border rounded-2xl overflow-hidden cursor-pointer group"
        style={{ border: '1px solid var(--border-primary)' }}
        onClick={() => handleCardClick(project)}
      >
        <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <img src={project.image} alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <div className="p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4 className="text-lg font-heading font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>{project.name}</h4>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {locale === 'id' ? project.tagId : project.tag}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <section ref={sectionRef} id="portfolio" className="py-24 md:py-32 scroll-mt-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 accent-line" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>{t('poe', 'sectionTag') as string}</span>
            </div>
          </div>
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{t('poe', 'clientTitle') as string}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => handleScrollCarousel('left')} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} aria-label="Slide left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={() => handleScrollCarousel('right')} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }} aria-label="Slide right">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            {/* Horizontal Carousel for Client Projects */}
            <div ref={carouselRef} className="flex overflow-x-auto gap-5 pb-8 snap-x snap-mandatory no-scrollbar" style={{ maskImage: 'linear-gradient(to right, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 90%, transparent 100%)' }}>
              {allProjects.slice(0, 5).map((project) => (
                <div key={project.name} className="w-[280px] md:w-[340px] flex-shrink-0 snap-start">
                  {renderCard(project)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[1px] mb-20" style={{ backgroundColor: 'var(--border-primary)' }} />
          <div>
            <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-3" style={{ color: 'var(--text-primary)' }}>{t('poe', 'propTitle') as string}</h3>
            <p className="text-sm leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('poe', 'propSubtext') as string}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {allProjects.slice(5).map(renderCard)}
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Takeover Overlay */}
      <div ref={takeoverRef} className="fixed inset-0 z-50" style={{ display: 'none', pointerEvents: 'none' }}>
        <img ref={takeoverImgRef} src={activeProject?.image || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} alt={activeProject?.name || ''} className="object-cover" style={{ position: 'fixed' }} />
        <div ref={takeoverContentRef} className="fixed inset-0 z-[52] flex flex-col justify-end p-6 pb-10 md:p-16" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }}>
          <button onClick={handleClose} className="absolute top-4 right-4 md:top-10 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white text-xl md:text-2xl font-light hover:bg-white/10 transition-colors" aria-label="Close">✕</button>
          <div className="max-w-3xl">
            <h3 className="text-3xl md:text-6xl font-heading font-black tracking-tighter text-white mb-3 md:mb-4">{activeProject?.name}</h3>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 md:mb-6">{t('poe', 'archLabel') as string}</p>
            <p className="text-white/70 text-xs md:text-base leading-relaxed mb-4 md:mb-6 max-w-2xl">{activeProject?.archDesc}</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-2">{t('poe', 'snapshotLabel') as string}</p>
            <p className="text-white/80 text-xs md:text-sm mb-6 md:mb-8">{activeProject?.techStack}</p>
            <div className="flex flex-wrap gap-3">
              <a href={activeProject?.link || '#'} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 text-white text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                {t('poe', 'linkLabel') as string} →
              </a>
              <button onClick={handleClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 text-white text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                ← {t('poe', 'close') as string}
              </button>
              
              <div className="ml-auto flex items-center gap-2">
                <button onClick={() => handleNavigate('prev')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Previous Project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={() => handleNavigate('next')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors" aria-label="Next Project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }} />
                {/* Fallback initials */}
                {!item.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-heading font-black text-white/30">{item.initials}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 pt-0 -mt-4 relative z-10 flex flex-col flex-grow">
                <div className="text-3xl font-heading font-black text-accent mb-2">"</div>
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
          <div className="w-2 h-2 rounded-full animate-pulse accent-glow" style={{ backgroundColor: 'var(--accent-from)' }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('cta', 'tag') as string}
          </span>
        </div>

        <h2
          className="cta-animate text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.9] mb-8 whitespace-pre-line"
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
            className="btn-accent group inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            <span>{t('cta', 'button') as string}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="bg-noise" />
      <Navbar />
      <HeroSection />
      <PartnerMarquee />
      <StatsSection />
      <CoreAdvantages />
      <IPModelsSection />
      <POESection />
      <VerdictSection />
      <CTASection />
      <Footer />
    </main>
  )
}