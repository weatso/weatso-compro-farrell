'use client'

import Link from 'next/link'
import { useTheme } from '@/lib/theme'
import { usePathname } from 'next/navigation'

export default function FloatingLogo() {
  const { isDark } = useTheme()
  const pathname = usePathname()

  const isSubPage = pathname === '/initiate' || pathname === '/portfolio'

  return (
    <div
      className="fixed top-4 left-5 z-[99] pointer-events-auto flex items-center gap-4"
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

      {isSubPage && (
        <>
          <div className="h-6 w-[1px]" style={{ backgroundColor: 'var(--border-primary)' }} />
          <Link href="/#portfolio" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70 mt-0.5" style={{ color: 'var(--text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </Link>
        </>
      )}
    </div>
  )
}
