'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'
import Navbar from '@/components/layout/navbar'

export type PortfolioProject = {
  _id: string
  title: string
  client?: string
  industry?: string
  slug: string | null
  imageUrl?: string | null
}

type ViewMode = 'list' | 'gallery'

const HOVER_GOLD = '#C9B896'

export default function PortfolioShowcase({ projects }: { projects: PortfolioProject[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement | null>(null)
  const previewMetaRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)
  const hasSwitchedView = useRef(false)

  const [view, setView] = useState<ViewMode>('list')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const activeProject = projects.find((p) => p._id === activeId) ?? null

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      toggleRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )

    if (listRef.current) {
      const links = listRef.current.querySelectorAll('.portfolio-link')
      tl.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
    }
  }, { scope: containerRef })

  // View switch animation (skip initial mount)
  useGSAP(() => {
    if (!hasSwitchedView.current) {
      hasSwitchedView.current = true
      if (galleryRef.current) gsap.set(galleryRef.current, { opacity: 0 })
      return
    }

    const outgoing = view === 'list' ? galleryRef.current : listRef.current
    const incoming = view === 'list' ? listRef.current : galleryRef.current

    if (outgoing) {
      gsap.to(outgoing, { opacity: 0, y: 20, duration: 0.35, ease: 'power2.in' })
    }
    if (incoming) {
      gsap.fromTo(
        incoming,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 }
      )

      if (view === 'gallery') {
        const cards = incoming.querySelectorAll('.gallery-card')
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.2 }
        )
      } else {
        const links = incoming.querySelectorAll('.portfolio-link')
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 0.6, ease: 'power3.out', delay: 0.2 }
        )
      }
    }
  }, { dependencies: [view] })

  const showPreview = useCallback((project: PortfolioProject) => {
    if (!isDesktop) return
    setActiveId(project._id)

    const preview = previewRef.current
    const img = previewImgRef.current
    const meta = previewMetaRef.current
    if (!preview) return

    gsap.to(preview, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })

    if (img && project.imageUrl) {
      gsap.fromTo(img, { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' })
      img.src = project.imageUrl
      img.alt = project.title
    } else if (img) {
      gsap.to(img, { opacity: 0, duration: 0.2 })
    }

    if (meta) {
      gsap.fromTo(meta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 })
    }
  }, [isDesktop])

  const hidePreview = useCallback(() => {
    setActiveId(null)
    const preview = previewRef.current
    if (!preview) return
    gsap.to(preview, { opacity: 0, scale: 0.92, duration: 0.35, ease: 'power2.in' })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDesktop || !previewRef.current || !activeId) return
    const y = e.clientY
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2

    gsap.to(previewRef.current, {
      y: y - window.innerHeight * 0.35,
      rotateY: xRatio * 4,
      rotateX: -xRatio * 2,
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [isDesktop, activeId])

  const switchView = (mode: ViewMode) => {
    if (mode === view) return
    hidePreview()
    setView(mode)
  }

  if (projects.length === 0) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="bg-noise" aria-hidden="true" />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-32">
          <p className="text-xs uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--text-muted)' }}>
            Belum ada portofolio
          </p>
          <Link href="/studio" className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
            Tambahkan via Sanity Studio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-noise" aria-hidden="true" />

      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: 'radial-gradient(circle, var(--accent-from), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-[30%] -left-[15%] w-[50vw] h-[50vw] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--accent-to), transparent 70%)' }}
        />
      </div>

      <Navbar />

      {/* View toggle — centered below nav */}
      <div className="relative z-10 flex justify-center pt-28 pb-8 md:pt-32 md:pb-12">
        <div
          ref={toggleRef}
          className="inline-flex items-center gap-1 p-1 rounded-full border"
          style={{ borderColor: 'var(--border-primary)', backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
          {(['list', 'gallery'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => switchView(mode)}
              className={cn(
                'relative px-6 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.25em] rounded-full transition-colors duration-300',
                view === mode ? 'text-black' : 'text-white/50 hover:text-white/80'
              )}
              style={view === mode ? { backgroundColor: '#ffffff' } : undefined}
            >
              {mode === 'list' ? 'List' : 'Gallery'}
            </button>
          ))}
        </div>
      </div>

      {/* ── LIST VIEW ─────────────────────────────────────────────── */}
      <div
        ref={listRef}
        className={cn(
          'relative z-10 px-6 md:px-16 lg:px-24 pb-24 transition-none',
          view !== 'list' && 'pointer-events-none absolute inset-x-0 top-40 opacity-0'
        )}
        aria-hidden={view !== 'list'}
      >
        <p
          className="text-center text-[clamp(1.8rem,4.5vw,4.2rem)] font-medium leading-[1.25] tracking-[-0.035em] max-w-[1200px] mx-auto lg:max-w-[900px] xl:max-w-[1100px]"
        >
          {projects.map((project, index) => {
            const href = project.slug ? `/portofolio/${project.slug}` : '#'
            const isActive = activeId === project._id
            const isDimmed = activeId !== null && !isActive

            return (
              <span key={project._id}>
                <Link
                  href={href}
                  className="portfolio-link inline transition-all duration-300"
                  style={{
                    color: isActive ? HOVER_GOLD : isDimmed ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)',
                    textDecoration: 'underline',
                    textDecorationColor: isActive ? HOVER_GOLD : 'rgba(255,255,255,0.15)',
                    textUnderlineOffset: '0.15em',
                    textDecorationThickness: '1px',
                  }}
                  onMouseEnter={() => showPreview(project)}
                  onMouseLeave={hidePreview}
                  onFocus={() => showPreview(project)}
                  onBlur={hidePreview}
                >
                  {project.title}
                  {project.industry && (
                    <sup className="text-[0.45em] ml-1 font-normal tracking-normal opacity-50">
                      ({project.industry})
                    </sup>
                  )}
                </Link>
                {index < projects.length - 1 && (
                  <span className="mx-[0.55em] select-none" style={{ color: 'rgba(255,255,255,0.12)' }} aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            )
          })}
        </p>

        {/* Footer meta */}
        <div
          className="mt-20 pt-8 flex items-center justify-center gap-6 border-t max-w-md mx-auto"
          style={{ borderColor: 'var(--border-primary)' }}
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            {projects.length} Project{projects.length !== 1 ? 's' : ''}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.08)' }}>·</span>
          <span className="text-[0.62rem] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            #BYWEATSO
          </span>
        </div>
      </div>

      {/* ── GALLERY VIEW ──────────────────────────────────────────── */}
      <div
        ref={galleryRef}
        className={cn(
          'relative z-10 px-6 md:px-12 lg:px-16 pb-24 transition-none',
          view !== 'gallery' && 'pointer-events-none absolute inset-x-0 top-40 opacity-0'
        )}
        aria-hidden={view !== 'gallery'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 max-w-[1400px] mx-auto">
          {projects.map((project, i) => {
            const href = project.slug ? `/portofolio/${project.slug}` : '#'
            const spanClass =
              i % 5 === 0 ? 'md:col-span-2 lg:col-span-7' :
              i % 5 === 1 ? 'md:col-span-1 lg:col-span-5' :
              i % 5 === 2 ? 'md:col-span-1 lg:col-span-4' :
              i % 5 === 3 ? 'md:col-span-1 lg:col-span-4' :
              'md:col-span-2 lg:col-span-4'

            const aspectClass =
              i % 5 === 0 ? 'aspect-[16/10]' :
              i % 5 === 1 ? 'aspect-[4/5]' :
              i % 5 === 2 ? 'aspect-[3/4]' :
              i % 5 === 3 ? 'aspect-square' :
              'aspect-[16/9]'

            return (
              <Link
                key={project._id}
                href={href}
                className={cn('gallery-card group relative overflow-hidden block', spanClass)}
              >
                <div className={cn('relative w-full overflow-hidden', aspectClass)}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))' }}
                    />
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {project.client && (
                        <p className="text-[0.6rem] uppercase tracking-[0.25em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ color: HOVER_GOLD }}>
                          {project.client}
                        </p>
                      )}
                      <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-white">
                        {project.title}
                      </h3>
                      {project.industry && (
                        <p className="text-xs mt-1 opacity-0 group-hover:opacity-60 transition-opacity duration-400 delay-75" style={{ color: 'var(--text-secondary)' }}>
                          {project.industry}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── HOVER PREVIEW (desktop list view) ─────────────────────── */}
      {isDesktop && (
        <div
          ref={previewRef}
          className="fixed right-[6vw] top-[35vh] z-20 pointer-events-none hidden lg:block"
          style={{ opacity: 0, transform: 'scale(0.92)', perspective: '800px' }}
          aria-hidden="true"
        >
          <div className="relative w-[280px] xl:w-[320px]">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                ref={previewImgRef}
                src={activeProject?.imageUrl ?? ''}
                alt={activeProject?.title ?? ''}
                className={cn(
                  'w-full h-full object-cover transition-opacity duration-300',
                  !activeProject?.imageUrl && 'opacity-0'
                )}
              />
              {!activeProject?.imageUrl && (
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, var(--bg-tertiary), var(--bg-secondary))' }}
                />
              )}
            </div>

            <div ref={previewMetaRef} className="mt-4 px-1">
              {activeProject?.client && (
                <p className="text-[0.6rem] uppercase tracking-[0.3em] mb-1" style={{ color: HOVER_GOLD }}>
                  {activeProject.client}
                </p>
              )}
              <p className="text-sm font-medium tracking-[-0.02em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {activeProject?.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
