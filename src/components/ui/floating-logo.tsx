'use client'

import Link from 'next/link'
import { useTheme } from '@/lib/theme'
import { usePathname } from 'next/navigation'

export default function FloatingLogo() {
  const { isDark } = useTheme()
  const pathname = usePathname()

  const isSubPage =
    pathname === '/initiate' ||
    pathname === '/portofolio' ||
    pathname.startsWith('/portofolio/')

  return (
    <div
      className="fixed top-6 left-6 z-[99] pointer-events-auto flex items-center"
      style={{ mixBlendMode: 'normal' }}
    >
      <Link href="/" aria-label="WEATSO Home">
        <img
          src="/logo/weatso_white_nobg.webp" 
          alt="WEATSO"
          className="select-none"
          style={{
            height: 40,
            width: 'auto',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
