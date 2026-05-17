'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

export default function Footer() {
  const { t } = useLanguage()
  const { isDark } = useTheme()

  return (
    <footer
      className="py-16 md:py-20"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-heading font-black text-2xl tracking-tighter block"
              style={{ color: 'var(--text-primary)' }}
            >
              WEATSO.
            </Link>
            <p
              className="font-light max-w-xs leading-relaxed text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('footer', 'tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3
              className="font-bold tracking-wide uppercase text-xs"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer', 'nav')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#models"
                  className="text-sm transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('nav', 'models')}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-sm transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('nav', 'portfolio')}
                </a>
              </li>
              <li>
                <Link
                  href="/initiate"
                  className="text-sm transition-colors duration-200 hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('nav', 'initiate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3
              className="font-bold tracking-wide uppercase text-xs"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer', 'contact')}
            </h3>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>hello@weatso.com</span>
              <span>Semarang, Indonesia</span>
            </div>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderTop: '1px solid var(--border-primary)',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {new Date().getFullYear()} WEATSO. {t('footer', 'rights')}</p>
        </div>
      </div>
    </footer>
  )
}
