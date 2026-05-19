'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const radius = Math.max(rect.width, rect.height) * 1.5

    if (dist < radius) {
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    }
  }, [strength])

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMove, handleLeave])

  return ref
}
