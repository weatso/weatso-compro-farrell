'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, PartyPopper, Gamepad2, Scissors, ArrowUpRight } from 'lucide-react'

const portfolioData = [
  {
    id: "01",
    label: "WEDDING ORGANIZER",
    title: "Evory",
    desc: "Platform wedding organizer digital yang menghadirkan pengalaman perencanaan pernikahan modern, elegan, dan terorganisir secara end-to-end.",
    icon: Heart,
    color: "#f43f5e",
    gradient: "from-rose-500/20 to-pink-500/20",
    url: "https://www.evory.id/",
    image: "/images/thumbnail-evory.png"
  },
  {
    id: "02",
    label: "EVENT ORGANIZER",
    title: "WTP",
    desc: "Web event organizer profesional untuk mengelola dan mempromosikan berbagai acara dengan tampilan yang menarik dan informatif.",
    icon: PartyPopper,
    color: "#a855f7",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    url: "https://wtp-landing-page-linktree-farrell.vercel.app/",
    image: "/images/thumbnail-wtp.png"
  },
  {
    id: "03",
    label: "GAME DEVELOPMENT",
    title: "CO-Labz",
    desc: "Studio pengembangan game yang menghadirkan pengalaman bermain interaktif dan imersif dengan teknologi terkini.",
    icon: Gamepad2,
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-indigo-500/20",
    url: "https://co-labz-landing-page.vercel.app/",
    image: "/images/thumbnail-colabz.png"
  },
  {
    id: "04",
    label: "BARBERSHOP RESERVATION",
    title: "Reservasi Tangwin",
    desc: "Sistem reservasi potong rambut online yang memudahkan pelanggan untuk memesan jadwal dengan cepat dan praktis.",
    icon: Scissors,
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-500/20",
    url: "https://reservasitangwin.weatso.id/",
    image: "/images/thumbnail-tangwin.png"
  }
]

/* ─── Desktop: scroll-linked horizontal cards ─── */
function DesktopScroll() {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = React.useState(0)
  const { scrollYProgress } = useScroll({ target: targetRef })

  React.useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth)
      }
    }
    updateRange()
    window.addEventListener('resize', updateRange)
    return () => window.removeEventListener('resize', updateRange)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])

  return (
    <div ref={targetRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-white">

        {/* Header - positioned properly at top */}
        <div className="pt-24 pb-8 px-12 lg:px-24 flex-shrink-0">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[2px] w-10 bg-slate-300" />
                <span className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">
                  Portfolio Showcase
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black font-heading tracking-tighter text-slate-900 leading-[1.1]">
                Our <span className="text-slate-400">Portfolio.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-light text-base max-w-xs leading-relaxed text-right hidden lg:block">
              Koleksi project digital yang telah kami kerjakan — dari wedding organizer hingga sistem reservasi.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 pl-12 lg:pl-24 pr-12 lg:pr-24 w-max"
          >
            {portfolioData.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="px-12 lg:px-24 pb-10 flex-shrink-0">
          <div className="h-[2px] bg-slate-100 w-full">
            <motion.div
              className="h-full bg-slate-900 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile: simple vertical stack ─── */
function MobileStack() {
  return (
    <div className="py-20 px-6 bg-white">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-[2px] w-10 bg-slate-300" />
          <span className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">
            Portfolio Showcase
          </span>
        </div>
        <h2 className="text-4xl font-black font-heading tracking-tighter text-slate-900 leading-[1.1] mb-4">
          Our <span className="text-slate-400">Portfolio.</span>
        </h2>
        <p className="text-slate-500 font-light text-sm leading-relaxed">
          Koleksi project digital yang telah kami kerjakan.
        </p>
      </div>

      {/* Vertical cards */}
      <div className="flex flex-col gap-5">
        {portfolioData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <PortfolioCard item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Shared card component ─── */
function PortfolioCard({ item }: { item: typeof portfolioData[0] }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-full md:w-[38vw] lg:w-[30vw] flex flex-col rounded-3xl border border-slate-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Visual Area */}
      <div className="relative h-56 md:h-64 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        
        {/* Overlay gradient for hover state readability */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 z-10 shadow-sm">
          <ArrowUpRight size={18} className="text-slate-700" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col gap-3 flex-grow bg-white relative z-10">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: item.color }}>
          {item.label}
        </span>
        <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-slate-500 font-light text-sm leading-relaxed line-clamp-3">
          {item.desc}
        </p>
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
            Visit Project
          </span>
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300">
            <ArrowUpRight size={16} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </a>
  )
}

/* ─── Main export: responsive switch ─── */
export default function ProcessSection() {
  return (
    <section className="bg-white">
      {/* Desktop: scroll-linked horizontal */}
      <div className="hidden md:block">
        <DesktopScroll />
      </div>
      {/* Mobile: vertical stack */}
      <div className="block md:hidden">
        <MobileStack />
      </div>
    </section>
  )
}