'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete()
      },
    })

    // Phase 1: Show "Loading..." with progress bar
    tl.fromTo(loadingRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.1')

    // Phase 2: Hide loading, show welcome
    tl.to(loadingRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' })
    tl.fromTo(welcomeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )

    // Phase 3: Hold
    tl.to({}, { duration: 0.6 })

    // Phase 4: Slide up to reveal page
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
    })
  }, { scope: containerRef })

  if (done) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Loading state */}
      <div ref={loadingRef} className="absolute flex flex-col items-center gap-4" style={{ opacity: 0 }}>
        <p className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
          Loading
        </p>
        <div className="w-32 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-primary)' }}>
          <div ref={barRef} className="h-full accent-line origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      {/* Welcome state */}
      <div ref={welcomeRef} className="absolute flex flex-col items-center gap-3" style={{ opacity: 0 }}>
        <p className="text-xs font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
          Welcome to
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-accent">
          WEATSO.
        </h1>
      </div>
    </div>
  )
}
