'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Locale = 'id' | 'en'

const dict = {
  nav: {
    principle: { id: 'Prinsip', en: 'Principle' },
    models: { id: 'Model', en: 'Models' },
    verdict: { id: 'Testimoni', en: 'Verdict' },
    portfolio: { id: 'Portofolio', en: 'Portfolio' },
    initiate: { id: 'Mulai Proyek', en: 'Initiate' },
  },
  hero: {
    eyebrow: { id: 'ZERO COMPROMISE. ABSOLUTE EXECUTION.', en: 'ZERO COMPROMISE. ABSOLUTE EXECUTION.' },
    headline: { id: 'ENGINEERING DEFINITIVE SOLUTIONS.', en: 'ENGINEERING DEFINITIVE SOLUTIONS.' },
    desc: {
      id: 'Bisnis Anda tidak membutuhkan sekadar aplikasi; Anda membutuhkan infrastruktur yang menyelesaikan masalah dari akarnya. Kami merancang ekosistem perangkat lunak kustom yang menghentikan kebocoran operasional dan mengamankan dominasi digital Anda. Titik.',
      en: 'Your business does not need mere applications; you require infrastructure that solves problems at their root. We engineer custom software ecosystems that halt operational leaks and secure your digital dominance. Period.',
    },
  },
  models: {
    sectionTag: { id: 'Model Kemitraan', en: 'Partnership Models' },
    sectionTitle: { id: 'Diferensiasi Kemitraan', en: 'Partnership Differentiation' },
    managed: {
      title: { id: 'Managed Ecosystem', en: 'Managed Ecosystem' },
      subtitle: { id: 'Infrastruktur Berkelanjutan / Licensing', en: 'Sustainable Infrastructure / Licensing' },
      desc: {
        id: 'Kami membangun, mengelola, dan memelihara seluruh ekosistem digital Anda secara berkelanjutan. Anda mendapatkan infrastruktur kelas enterprise tanpa beban teknis operasional — cukup fokus pada pertumbuhan bisnis.',
        en: 'We build, manage, and maintain your entire digital ecosystem continuously. You get enterprise-class infrastructure without operational technical burden — just focus on business growth.',
      },
      points: {
        id: ['Pemeliharaan & pembaruan berkelanjutan', 'Skalabilitas otomatis', 'Dukungan teknis prioritas 24/7', 'Model biaya yang dapat diprediksi'],
        en: ['Continuous maintenance & updates', 'Automatic scalability', 'Priority 24/7 technical support', 'Predictable cost model'],
      },
    },
    bespoke: {
      title: { id: 'True Bespoke', en: 'True Bespoke' },
      subtitle: { id: 'Akuisisi Arsitektur & Source Code Absolut', en: 'Architecture & Absolute Source Code Acquisition' },
      desc: {
        id: 'Kepemilikan penuh. Kami merancang arsitektur sistem dari nol sesuai spesifikasi absolut Anda, lalu menyerahkan seluruh source code dan dokumentasi teknis. Infrastruktur Anda, kendali Anda.',
        en: 'Full ownership. We engineer system architecture from scratch to your absolute specifications, then hand over all source code and technical documentation. Your infrastructure, your control.',
      },
      points: {
        id: ['Kepemilikan source code 100%', 'Dokumentasi arsitektur lengkap', 'Transfer pengetahuan ke tim internal', 'Tanpa ketergantungan vendor'],
        en: ['100% source code ownership', 'Complete architecture documentation', 'Knowledge transfer to internal team', 'Zero vendor lock-in'],
      },
    },
  },
  poe: {
    sectionTag: { id: 'Bukti Eksekusi', en: 'Proof of Execution' },
    clientTitle: { id: 'Arsitektur Klien', en: 'Client Architectures' },
    propTitle: { id: 'Ekosistem Proprietary', en: 'Proprietary Ecosystems' },
    propSubtext: {
      id: 'Produk internal hasil rekayasa tim mandiri WEATSO — dibangun, dimiliki, dan dioperasikan sepenuhnya oleh kami.',
      en: 'Internal products engineered by WEATSO\'s in-house team — built, owned, and fully operated by us.',
    },
    close: { id: 'Tutup', en: 'Close' },
    archLabel: { id: 'Deskripsi Arsitektur', en: 'Architecture Description' },
    snapshotLabel: { id: 'Snapshot Sistem', en: 'System Snapshot' },
    linkLabel: { id: 'Tautan Eksternal', en: 'External Link' },
  },
  core: {
    line1: {
      id: 'PRINSIP KAMI',
      en: 'OUR PRINCIPLE',
    },
    slides: {
      id: [
        'Kami tidak melayani standar menengah. Presisi absolut, tanpa kompromi.',
        'Setiap baris kode adalah keputusan arsitektur. Kami tidak menulis kode — kami merekayasa fondasi.',
        'Infrastruktur yang benar tidak perlu dirombak. Sekali bangun, selamanya berdiri.',
      ],
      en: [
        'We do not serve mediocre standards. Absolute precision, zero compromise.',
        'Every line of code is an architectural decision. We don\'t write code — we engineer foundations.',
        'Infrastructure built right never needs rebuilding. Built once, stands forever.',
      ],
    },
  },
  stats: {
    est: { id: 'Didirikan', en: 'Established' },
    projects: { id: 'Proyek Terkirim', en: 'Projects Delivered' },
    ecosystems: { id: 'Ekosistem Produk', en: 'Product Ecosystems' },
    support: { id: 'Dukungan Teknis', en: 'Technical Support' },
  },
  partners: {
    tag: { id: 'Kolaborasi Strategis', en: 'Strategic Engagements' },
  },
  cta: {
    tag: { id: 'Siap Memulai?', en: 'Ready to Begin?' },
    headline: { id: 'MARI BICARA\nINFRASTRUKTUR.', en: 'LET\'S TALK\nINFRASTRUCTURE.' },
    desc: {
      id: 'Ekosistem digital Anda berikutnya dimulai dari sini. Tanpa basa-basi, langsung ke arsitektur.',
      en: 'Your next digital ecosystem starts here. No fluff, straight to architecture.',
    },
    button: { id: 'Mulai Proyek', en: 'Initiate Project' },
  },
  footer: {
    tagline: {
      id: 'Merekayasa solusi definitif untuk dominasi digital.',
      en: 'Engineering definitive solutions for digital dominance.',
    },
    nav: { id: 'Navigasi', en: 'Navigation' },
    contact: { id: 'Kontak', en: 'Contact' },
    rights: { id: 'Seluruh hak dilindungi.', en: 'All rights reserved.' },
  },
  initiate: {
    headline: { id: 'MULAI INTEROGASI\nPROYEK.', en: 'INITIATE PROJECT\nINTERROGATION.' },
    step1Label: { id: 'Siapa Anda?', en: 'Who are you?' },
    step1Name: { id: 'Nama Lengkap', en: 'Full Name' },
    step1Company: { id: 'Nama Perusahaan', en: 'Company Name' },
    step2Label: { id: 'Apa masalah sistem Anda?', en: 'What is your system problem?' },
    step2Placeholder: { id: 'Deskripsikan keluhan atau kebutuhan sistem Anda secara detail...', en: 'Describe your system complaints or needs in detail...' },
    step3Label: { id: 'Berapa anggaran Anda?', en: 'What is your budget?' },
    step3Options: {
      id: ['< Rp 10 Juta', 'Rp 10 - 50 Juta', 'Rp 50 - 150 Juta', 'Rp 150 - 500 Juta', '> Rp 500 Juta'],
      en: ['< $700', '$700 - $3,500', '$3,500 - $10,000', '$10,000 - $35,000', '> $35,000'],
    },
    step4Label: { id: 'Estimasi waktu pengerjaan?', en: 'Estimated project timeline?' },
    step4Options: {
      id: ['< 2 Minggu', '1 Bulan', '2-3 Bulan', '3-6 Bulan', '> 6 Bulan', 'Fleksibel'],
      en: ['< 2 Weeks', '1 Month', '2-3 Months', '3-6 Months', '> 6 Months', 'Flexible'],
    },
    next: { id: 'Lanjut', en: 'Next' },
    submit: { id: 'Kirim Spesifikasi', en: 'Submit Specification' },
    confirmation: {
      id: 'Terima kasih. Spesifikasi Anda telah kami terima.',
      en: 'Thank you. Your specification has been received.',
    },
    confirmSub: {
      id: 'Tim arsitektur kami akan menganalisis kebutuhan Anda dan menghubungi dalam 24 jam kerja.',
      en: 'Our architecture team will analyze your requirements and reach out within 24 business hours.',
    },
    back: { id: 'Kembali', en: 'Go Back' },
  },
  verdict: {
    sectionTag: { id: 'The Verdict', en: 'The Verdict' },
    sectionTitle: { id: 'Apa Kata Mereka', en: 'What They Say' },
  },
} as const

type Dict = typeof dict

interface I18nContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: <K1 extends keyof Dict, K2 extends keyof Dict[K1]>(
    section: K1,
    key: K2
  ) => Dict[K1][K2] extends Record<Locale, infer V> ? V : Dict[K1][K2]
}

const I18nContext = createContext<I18nContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const t = useCallback(
    <K1 extends keyof Dict, K2 extends keyof Dict[K1]>(section: K1, key: K2) => {
      const entry = dict[section][key]
      if (entry && typeof entry === 'object' && locale in entry) {
        return (entry as unknown as Record<Locale, unknown>)[locale]
      }
      return entry
    },
    [locale]
  ) as I18nContextType['t']

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
