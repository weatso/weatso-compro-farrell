'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextBlockProps {
  text: string
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'span' | 'div'
  staggerAmount?: number
  triggerStart?: string
}

export default function SplitTextBlock({
  text,
  className = '',
  as: Tag = 'p',
  staggerAmount = 0.03,
  triggerStart = 'top 85%',
}: SplitTextBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll('.st-word')
    if (!words?.length) return

    gsap.from(words, {
      y: '100%',
      opacity: 0,
      stagger: staggerAmount,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: triggerStart,
        once: true,
      },
    })
  }, { scope: containerRef })

  const words = text.split(' ')

  return (
    <div ref={containerRef} className="relative">
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <span className="st-word inline-block" aria-hidden="true">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
