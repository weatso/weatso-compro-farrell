'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
import Link from 'next/link'

const WA_PHONE = '6281225837439'

export default function InitiatePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [complaint, setComplaint] = useState('')
  const [budget, setBudget] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { t, locale } = useLanguage()
  const { isDark } = useTheme()

  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  const budgetOptions = locale === 'id'
    ? ['< Rp 10 Juta', 'Rp 10 - 50 Juta', 'Rp 50 - 150 Juta', 'Rp 150 - 500 Juta', '> Rp 500 Juta', 'Belum ditentukan']
    : ['< $700', '$700 - $3,500', '$3,500 - $10,000', '$10,000 - $35,000', '> $35,000', 'Not yet determined']

  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )

    // Animate headline
    const headline = containerRef.current?.querySelector('.init-headline')
    if (headline) {
      tl.fromTo(
        headline,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
    }

    // Animate first step
    if (stepRefs[0].current) {
      tl.fromTo(
        stepRefs[0].current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
    }
  }, { scope: containerRef })

  // Animate step transitions
  const animateToStep = (nextStep: number) => {
    const currentRef = stepRefs[step]?.current
    const nextRef = stepRefs[nextStep]?.current

    if (currentRef) {
      gsap.to(currentRef, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setStep(nextStep)
          if (nextRef) {
            gsap.fromTo(
              nextRef,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            )
          }
        },
      })
    } else {
      setStep(nextStep)
    }
  }

  const handleNext = () => {
    if (step === 0 && name.trim()) {
      animateToStep(1)
    } else if (step === 1 && complaint.trim()) {
      animateToStep(2)
    }
  }

  const handleSubmit = () => {
    if (!budget) return

    const message = locale === 'id'
      ? `*PERMINTAAN PROYEK BARU*%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Perusahaan:* ${encodeURIComponent(company || '-')}%0A%0A*Deskripsi Kebutuhan:*%0A${encodeURIComponent(complaint)}%0A%0A*Anggaran:* ${encodeURIComponent(budget)}`
      : `*NEW PROJECT REQUEST*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Company:* ${encodeURIComponent(company || '-')}%0A%0A*Requirement Description:*%0A${encodeURIComponent(complaint)}%0A%0A*Budget:* ${encodeURIComponent(budget)}`

    const waUrl = `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${message}&type=phone_number&app_absent=0`
    window.open(waUrl, '_blank')
    setSubmitted(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (step < 2) handleNext()
      else handleSubmit()
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    borderBottom: '1px solid var(--border-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
    padding: '12px 0',
    width: '100%',
    fontSize: '1.125rem',
    fontFamily: 'inherit',
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)', opacity: 0 }}
    >
      <div className="bg-noise" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
        style={{ color: 'var(--text-muted)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t('initiate', 'back') as string}
      </Link>

      {/* Step indicator */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-8 h-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= step ? 'var(--text-primary)' : 'var(--border-primary)',
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full px-6 relative z-10">
        {/* Headline */}
        <h1
          className="init-headline text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[0.9] mb-16 whitespace-pre-line"
          style={{ color: 'var(--text-primary)', opacity: 0 }}
        >
          {t('initiate', 'headline') as string}
        </h1>

        {/* Step 0: Name / Company */}
        {step === 0 && (
          <div ref={stepRefs[0]} style={{ opacity: 0 }}>
            <p
              className="text-sm font-bold uppercase tracking-[0.2em] mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              01 — {t('initiate', 'step1Label') as string}
            </p>
            <div className="space-y-6">
              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('initiate', 'step1Name') as string} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                  autoFocus
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold uppercase tracking-widest mb-2 block"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t('initiate', 'step1Company') as string}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                />
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={!name.trim()}
              className="mt-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              {t('initiate', 'next') as string} →
            </button>
          </div>
        )}

        {/* Step 1: Complaint Description */}
        {step === 1 && (
          <div ref={stepRefs[1]} style={{ opacity: 0 }}>
            <p
              className="text-sm font-bold uppercase tracking-[0.2em] mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              02 — {t('initiate', 'step2Label') as string}
            </p>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('initiate', 'step2Placeholder') as string}
              rows={5}
              autoFocus
              className="resize-none"
              style={{
                ...inputStyle,
                borderBottom: 'none',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '1rem',
              }}
            />
            <button
              onClick={handleNext}
              disabled={!complaint.trim()}
              className="mt-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              {t('initiate', 'next') as string} →
            </button>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && !submitted && (
          <div ref={stepRefs[2]} style={{ opacity: 0 }}>
            <p
              className="text-sm font-bold uppercase tracking-[0.2em] mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              03 — {t('initiate', 'step3Label') as string}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setBudget(option)}
                  className="px-5 py-4 rounded-xl text-sm font-medium text-left transition-all duration-200"
                  style={{
                    backgroundColor: budget === option ? 'var(--text-primary)' : 'transparent',
                    color: budget === option ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    border: `1px solid ${budget === option ? 'var(--text-primary)' : 'var(--border-primary)'}`,
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!budget}
              className="mt-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              {t('initiate', 'submit') as string} →
            </button>
          </div>
        )}

        {/* Confirmation */}
        {submitted && (
          <div className="text-center py-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ border: '2px solid var(--text-primary)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2
              className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {locale === 'id' ? 'Data Terkirim.' : 'Data Submitted.'}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'id'
                ? 'Personal Assistant kami akan merespons dalam waktu kurang dari 24 jam.'
                : 'Our Personal Assistant will respond within 24 hours.'}
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
              }}
            >
              ← {locale === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
