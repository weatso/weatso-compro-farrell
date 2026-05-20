'use client'

import Link from 'next/link'
import { useTheme } from '@/lib/theme'

export default function FloatingLogo() {
  const { isDark } = useTheme()

  return (
    <div
      className="fixed top-4 left-5 z-[99] pointer-events-auto"
      style={{ mixBlendMode: 'normal' }}
    >
      <Link href="/" aria-label="WEATSO Home">
        <img
          src="/weatso.svg"
          alt="WEATSO"
          className="select-none"
          style={{
            height: 48,
            width: 'auto',
            filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.75'
            e.currentTarget.style.transform = 'scale(0.96)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          draggable={false}
        />
      </Link>
    </div>
  )
}
