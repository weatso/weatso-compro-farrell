'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

function smoothScroll(href: string) {
  const el = document.querySelector(href)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export default function Footer() {
  const { t, locale } = useLanguage()
  const { isDark } = useTheme()

  const navLinks = [
    { label: t('nav', 'principle'), href: '#core' },
    { label: t('nav', 'models'), href: '#models' },
    { label: t('nav', 'verdict'), href: '#verdict' },
    { label: t('nav', 'portfolio'), href: '#portfolio' },
  ]

  return (
    <footer
      className="py-16 md:py-20"
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: Logo + Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <Link href="/" className="block mb-4">
              <img
                src="/logo/weatso_white_nobg.webp"
                alt="WEATSO"
                className="h-8"
                style={{ filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }}
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('footer', 'tagline')}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/initiate"
            className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            <span>{t('nav', 'initiate')}</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

        {/* Middle: 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--text-muted)' }}>
              {t('footer', 'nav')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); smoothScroll(link.href) }}
                    className="text-sm transition-colors duration-200 hover:text-[var(--accent-from)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--text-muted)' }}>
              {t('footer', 'contact')}
            </h3>
            <div className="flex flex-col gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <a href="mailto:weatso41@gmail.com" className="hover:text-[var(--accent-from)] transition-colors">weatso41@gmail.com</a>
              <span>Semarang, Indonesia</span>
              <a href="https://api.whatsapp.com/send/?phone=6281225837439" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-from)] transition-colors">
                +62 812-2583-7439
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--text-muted)' }}>
              {locale === 'id' ? 'Layanan Kami' : 'Our Services'}
            </h3>
            <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p className="mb-2">
                <span className="font-bold text-accent">Bespoke Engineering.</span>
              </p>
              <p>
                {locale === 'id'
                  ? 'Kami tidak menjual layanan template. Setiap arsitektur direkayasa secara eksklusif dan kustom untuk infrastruktur bisnis Anda.'
                  : 'We do not sell templated services. Every architecture is engineered exclusively and custom-built for your business infrastructure.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}
        >
          <p>© {new Date().getFullYear()} WEATSO. {t('footer', 'rights')}</p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4" style={{ background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))' }} />
            <span className="uppercase tracking-widest">Semarang, ID</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
