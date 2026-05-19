'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

interface TextScrambleProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  style?: React.CSSProperties
  speed?: number
}

export default function TextScramble({ text, className = '', as: Tag = 'span', style, speed = 30 }: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(text)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (hasRun.current) return
        hasRun.current = true

        let iteration = 0
        const maxIterations = text.length * 3

        const interval = setInterval(() => {
          setDisplay(
            text
              .split('')
              .map((char, i) => {
                if (char === ' ') return ' '
                if (i < iteration / 3) return text[i]
                return CHARS[Math.floor(Math.random() * CHARS.length)]
              })
              .join('')
          )
          iteration++
          if (iteration >= maxIterations) {
            clearInterval(interval)
            setDisplay(text)
          }
        }, speed)
      },
    })

    return () => trigger.kill()
  }, [text, speed])

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {display}
    </Tag>
  )
}
