'use client'

import { useRef, useEffect, useCallback, MouseEvent as RMouseEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

gsap.registerPlugin(ScrollTrigger)

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
  },
  {
    name: 'Evory',
    tag: 'Digital Wedding Ecosystem',
    tagId: 'Ekosistem Pernikahan Digital',
    image: '/images/thumbnail-evory.png',
  },
  {
    name: 'Lokal',
    tag: 'Local Commerce Platform',
    tagId: 'Platform Perdagangan Lokal',
    image: '/images/thumbnail-lokal.webp',
  },
]

const clientProjects = [
  {
    name: 'Nugiartawidagdo',
    tag: 'Furniture & Interior Design',
    tagId: 'Furnitur & Desain Interior',
    image: '/images/thumbnail-nugi.webp',
  },
  {
    name: 'Radeva',
    tag: 'Wedding Organizer',
    tagId: 'Wedding Organizer',
    image: '/images/thumbnail-radeva.webp',
  },
  {
    name: 'WeThinkParty',
    tag: 'Event Organizer',
    tagId: 'Event Organizer',
    image: '/images/thumbnail-wtp.png',
  },
  {
    name: 'UD Dokar',
    tag: 'Printing & Packaging',
    tagId: 'Percetakan & Kemasan',
    image: '/images/thumbnail-dokar.webp',
  },
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

    // Parallax on scroll
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
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300"
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
            }}
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
        className="model-card rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col h-full transition-colors duration-300"
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
            <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--text-muted)' }} />
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
   POE SECTION (3D Tilt + Magnetic Hover)
   ============================================================ */

function TiltCard({
  project,
  locale,
}: {
  project: (typeof proprietaryProjects)[0]
  locale: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: RMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    })

    // Magnetic image shift
    gsap.to(image, {
      x: ((x - centerX) / centerX) * 15,
      y: ((y - centerY) / centerY) * 15,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !imageRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [])

  return (
    <div className="perspective-container">
      <div
        ref={cardRef}
        className="tilt-card poe-card rounded-2xl overflow-hidden cursor-pointer group"
        style={{ border: '1px solid var(--border-primary)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div ref={imageRef} className="w-full h-full">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-5" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4
            className="text-lg font-heading font-bold tracking-tight mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.name}
          </h4>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            {locale === 'id' ? project.tagId : project.tag}
          </p>
        </div>
      </div>
    </div>
  )
}

function POESection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, locale } = useLanguage()

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.poe-card')
    if (!cards) return

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, rotateX: 5 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 md:py-32 scroll-mt-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--text-muted)' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
              {t('poe', 'sectionTag') as string}
            </span>
          </div>
        </div>

        {/* Section A: Client Architectures */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-10"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('poe', 'clientTitle') as string}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clientProjects.map((project) => (
              <TiltCard key={project.name} project={project} locale={locale} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mb-20" style={{ backgroundColor: 'var(--border-primary)' }} />

        {/* Section B: Proprietary Ecosystems */}
        <div>
          <h3
            className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('poe', 'propTitle') as string}
          </h3>
          <p
            className="text-sm leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('poe', 'propSubtext') as string}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {proprietaryProjects.map((project) => (
              <TiltCard key={project.name} project={project} locale={locale} />
            ))}
          </div>
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

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="cta-animate flex items-center justify-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#3B82F6' }} />
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
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {t('cta', 'button') as string}
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
      <IPModelsSection />
      <POESection />
      <CTASection />
      <Footer />
    </main>
  )
}