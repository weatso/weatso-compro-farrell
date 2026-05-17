'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: 'transparent',
    })

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete()
      },
    })

    // Phase 1: Draw the W path (line-drawing effect)
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
    })

    // Phase 2: Fill the logo
    tl.to(path, {
      fill: 'var(--text-primary)',
      stroke: 'transparent',
      duration: 0.5,
      ease: 'power2.out',
    })

    // Phase 3: Hold briefly
    tl.to({}, { duration: 0.3 })

    // Phase 4: Lift preloader up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
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
      <svg
        viewBox="0 0 120 80"
        className="w-32 md:w-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M 10,15 L 25,65 L 40,30 L 55,65 L 70,30 L 85,65 L 100,15"
          fill="transparent"
          stroke="var(--text-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
