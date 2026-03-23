'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Code2, FlaskConical, Heart, ArrowUpRight, Zap, MoveUpRight } from 'lucide-react'

const venturesData = [
  {
    id: "v_01",
    name: "Weatso Dev",
    category: "DEVELOPER PLATFORM",
    description: "Platform dan tools presisi tinggi untuk developers membangun arsitektur aplikasi berskala enterprise dengan efisiensi maksimal.",
    icon: Code2,
    accent: "#3b82f6",
    mesh: "radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.05) 0px, transparent 50%)"
  },
  {
    id: "v_02",
    name: "CO-Labz",
    category: "INNOVATION LAB",
    description: "Laboratorium R&D untuk eksperimen produk digital mutakhir. Tempat di mana ide-ide disruptif diuji, divalidasi, dan direkayasa.",
    icon: FlaskConical,
    accent: "#a855f7",
    mesh: "radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(147, 51, 234, 0.05) 0px, transparent 50%)"
  },
  {
    id: "v_03",
    name: "Evory",
    category: "LIFESTYLE PLATFORM",
    description: "Ekosistem digital end-to-end yang dirancang eksklusif untuk meningkatkan produktivitas dan kualitas hidup pengguna modern.",
    icon: Heart,
    accent: "#f59e0b",
    mesh: "radial-gradient(at 50% 50%, rgba(245, 158, 11, 0.15) 0px, transparent 60%), radial-gradient(at 100% 100%, rgba(217, 119, 6, 0.05) 0px, transparent 50%)"
  }
]

const FluidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#030303]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[130px]"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50" />
    </div>
  )
}

const MagneticCard = ({ data, index }: { data: typeof venturesData[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(ySpring, [0, 1], [10, -10])
  const rotateY = useTransform(xSpring, [0, 1], [-10, 10])
  const glareX = useTransform(xSpring, [0, 1], [100, -100])
  const glareY = useTransform(ySpring, [0, 1], [100, -100])
  const glareOpacity = useTransform(ySpring, [0, 0.5, 1], [0.4, 0, 0.4])

  const transformTemplate = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width
    const yPct = mouseYPos / height
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0], delay: index * 0.15 }}
      style={{ transform: transformTemplate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      className="group relative w-full h-[480px] rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden cursor-crosshair transform-gpu"
    >
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-50 group-hover:opacity-100"
        style={{ background: data.mesh }}
      />

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-[2.5rem]"
        style={{
          background: useMotionTemplate`radial-gradient(circle at calc(50% + ${glareX}%) calc(50% + ${glareY}%), rgba(255,255,255,0.08), transparent 40%)`,
          opacity: glareOpacity
        }}
      />

      <div className="absolute -right-12 -bottom-12 z-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-12">
        <data.icon size={280} strokeWidth={0.5} />
      </div>

      <div className="relative z-20 h-full p-10 flex flex-col justify-between transform-gpu transition-transform duration-500 group-hover:translate-z-10">
        <div className="flex justify-between items-start">
          <motion.div 
            style={{ x: useTransform(xSpring, [0, 1], [-15, 15]), y: useTransform(ySpring, [0, 1], [-15, 15]) }}
            className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center backdrop-blur-md shadow-2xl"
          >
            <data.icon size={28} color={data.accent} strokeWidth={1.5} />
          </motion.div>
          
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
              {data.id}
            </span>
          </div>
        </div>

        <motion.div 
          style={{ x: useTransform(xSpring, [0, 1], [15, -15]), y: useTransform(ySpring, [0, 1], [15, -15]) }}
          className="flex flex-col gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: data.accent }}>
              {data.category}
            </span>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-4 font-heading group-hover:tracking-tight transition-all duration-500">
              {data.name}
            </h3>
            <p className="text-slate-400/80 font-light text-sm leading-relaxed max-w-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
              {data.description}
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-white/30 group-hover:text-white transition-colors duration-300" />
              <span className="text-xs font-medium tracking-wider text-white/30 group-hover:text-white transition-colors duration-300 uppercase">
                Initialize Sequence
              </span>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.1] flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <MoveUpRight size={18} className="text-white group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function VenturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0px", "100px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="ventures" className="relative pt-32 pb-64 md:py-48 bg-[#030303] overflow-hidden">
      <FluidBackground />

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
                Digital Ecosystem
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-heading tracking-tighter text-white leading-[1.1]">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "110%", rotate: 2 }}
                  whileInView={{ y: "0%", rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
                  className="block origin-bottom-left"
                >
                  Architecting The
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-4">
                <motion.span 
                  initial={{ y: "110%", rotate: 2 }}
                  whileInView={{ y: "0%", rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.1 }}
                  className="block origin-bottom-left text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500"
                >
                  Next Ventures.
                </motion.span>
              </span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-start md:items-end gap-6 max-w-sm"
          >
            <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed md:text-right">
              Inkubasi produk inovatif, platform berskala tinggi, dan solusi gaya hidup modern di bawah naungan Weatso Holding.
            </p>
            <a href="#" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white group">
              <span className="relative overflow-hidden pb-1">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">View All Entities</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-blue-400">View All Entities</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30 group-hover:bg-blue-400 transition-colors duration-300" />
              </span>
              <ArrowUpRight size={16} className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-[2000px]">
          {venturesData.map((venture, index) => (
            <MagneticCard key={venture.id} data={venture} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}