'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/lib/i18n'
import Link from 'next/link'

const WA_PHONE = '6281225837439'

export default function InitiatePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [complaint, setComplaint] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { t, locale } = useLanguage()
  const budgetOptions = (t('initiate', 'step3Options') as unknown as string[]) || []
  const timelineOptions = (t('initiate', 'step4Options') as unknown as string[]) || []

  useGSAP(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' })
    gsap.fromTo(containerRef.current?.querySelectorAll('.form-field') || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.3 })
  }, { scope: containerRef })

  const handleSubmit = () => {
    if (!name.trim() || !complaint.trim() || !budget || !timeline) return

    setSubmitted(true)

    // Animate confirmation
    setTimeout(() => {
      const message = locale === 'id'
        ? `*PERMINTAAN PROYEK BARU*%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Perusahaan:* ${encodeURIComponent(company || '-')}%0A%0A*Deskripsi Kebutuhan:*%0A${encodeURIComponent(complaint)}%0A%0A*Anggaran:* ${encodeURIComponent(budget)}%0A*Timeline:* ${encodeURIComponent(timeline)}`
        : `*NEW PROJECT REQUEST*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Company:* ${encodeURIComponent(company || '-')}%0A%0A*Requirement Description:*%0A${encodeURIComponent(complaint)}%0A%0A*Budget:* ${encodeURIComponent(budget)}%0A*Timeline:* ${encodeURIComponent(timeline)}`
      const waUrl = `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${message}&type=phone_number&app_absent=0`
      window.open(waUrl, '_blank')
    }, 1500)
  }

  const isValid = name.trim() && complaint.trim() && budget && timeline

  if (submitted) {
    return (
      <div ref={containerRef} className="min-h-screen relative overflow-x-hidden flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="bg-noise" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative z-10 text-center max-w-lg px-6">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center accent-glow" style={{ background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tighter mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('initiate', 'confirmation') as string}
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
            {t('initiate', 'confirmSub') as string}
          </p>
          <Link href="/" className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>← {t('initiate', 'back') as string}</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0 }}>
      <div className="bg-noise" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* 2-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch relative z-10 pt-16 lg:pt-0">
        {/* Left: Headline */}
        <div className="form-field lg:w-[40%] flex items-center px-6 lg:px-16 py-8 lg:py-0">
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[0.9] mb-4 whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>
              {t('initiate', 'headline') as string}
            </h1>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
              {locale === 'id' ? 'Isi formulir di samping untuk memulai konsultasi arsitektur.' : 'Fill the form to start your architecture consultation.'}
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-[60%] flex flex-col justify-center px-6 lg:px-16 py-6 lg:py-24" style={{ borderLeft: '1px solid var(--border-primary)' }}>
          {/* Identity */}
          <div className="form-field mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-accent">01 — {t('initiate', 'step1Label') as string}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest mb-1 block" style={{ color: 'var(--text-muted)' }}>{t('initiate', 'step1Name') as string} *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm py-2 font-sans transition-all duration-300 focus:border-b-2"
                  style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-primary)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-from)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)' }}
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest mb-1 block" style={{ color: 'var(--text-muted)' }}>{t('initiate', 'step1Company') as string}</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm py-2 font-sans transition-all duration-300"
                  style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-primary)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-from)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)' }}
                />
              </div>
            </div>
          </div>

          {/* Complaint */}
          <div className="form-field mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-accent">02 — {t('initiate', 'step2Label') as string}</p>
            <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)}
              placeholder={t('initiate', 'step2Placeholder') as string} rows={2}
              className="bg-transparent outline-none w-full text-sm p-3 resize-none font-sans transition-all duration-300"
              style={{ color: 'var(--text-primary)', border: '1px solid var(--border-primary)', borderRadius: 8 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-from)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)' }}
            />
          </div>

          {/* Budget */}
          <div className="form-field mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-accent">03 — {t('initiate', 'step3Label') as string}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {budgetOptions.map((option: string) => (
                <button key={option} onClick={() => setBudget(option)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: budget === option ? 'transparent' : 'transparent',
                    color: budget === option ? '#fff' : 'var(--text-secondary)',
                    border: budget === option ? 'none' : '1px solid var(--border-primary)',
                    background: budget === option ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' : 'transparent',
                  }}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="form-field mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-accent">04 — {t('initiate', 'step4Label') as string}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timelineOptions.map((option: string) => (
                <button key={option} onClick={() => setTimeline(option)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    color: timeline === option ? '#fff' : 'var(--text-secondary)',
                    border: timeline === option ? 'none' : '1px solid var(--border-primary)',
                    background: timeline === option ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))' : 'transparent',
                  }}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="form-field">
            <button onClick={handleSubmit} disabled={!isValid}
              className="btn-accent w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              <span>{t('initiate', 'submit') as string}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
