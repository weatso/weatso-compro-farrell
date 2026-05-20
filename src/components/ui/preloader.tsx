'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const curtainLeftRef = useRef<HTMLDivElement>(null)
  const curtainRightRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete()
      },
    })

    // Phase 1: Logo scale from 0 to 1 with slight overshoot (1.0s)
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0, rotate: -5 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.0,
        ease: 'back.out(1.6)',
      }
    )

    // Phase 2: Hold — let user see the logo (0.6s)
    tl.to({}, { duration: 0.6 })

    // Phase 3: Curtain split — both halves slide away simultaneously (0.9s)
    tl.to(curtainLeftRef.current, {
      xPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    }, '+=0')
    tl.to(curtainRightRef.current, {
      xPercent: 100,
      duration: 0.9,
      ease: 'power4.inOut',
    }, '<') // '<' = same time as previous

    // Logo fades out as curtains open
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.7')

  }, { scope: containerRef })

  if (done) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Left curtain */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ backgroundColor: '#050505' }}
      />
      {/* Right curtain */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ backgroundColor: '#050505' }}
      />
      {/* Centered logo on top of curtains */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          ref={logoRef}
          src="/weatso.svg"
          alt="WEATSO"
          className="w-40 md:w-56 select-none pointer-events-none"
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}
