'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('weatso-theme') as Theme | null
    if (stored) setTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('weatso-theme', theme)
  }, [theme, mounted])

  const toggleTheme = useCallback(() => {
    // Create a flash overlay for smooth transition
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: ${theme === 'dark' ? '#F9F9F9' : '#050505'};
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(overlay)

    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '0.6'
    })

    // Switch theme while overlay covers the page
    setTimeout(() => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

      // Fade out overlay
      setTimeout(() => {
        overlay.style.opacity = '0'
        setTimeout(() => overlay.remove(), 350)
      }, 100)
    }, 250)
  }, [theme])

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme, isDark: true }}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
