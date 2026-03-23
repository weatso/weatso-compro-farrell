'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useAnimationFrame, useScroll, useVelocity, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Zap, Database, TerminalSquare } from 'lucide-react'
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const venturesData = [
  {
    id: "01",
    name: "WEATSO DEV",
    type: "INFRASTRUCTURE",
    desc: "Membangun ekosistem yang memungkinkan tim teknis untuk melakukan pengiriman perangkat lunak dengan kecepatan dan keandalan tingkat enterprise.",
    color: "#2563eb",
    icon: Database,
    stats: [
      { label: "Deployment", value: "Zero-Downtime" },
      { label: "Architecture", value: "Serverless Edge" }
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    name: "CO-LABZ",
    type: "INNOVATION LAB",
    desc: "Laboratorium inkubasi tempat ide-ide radikal diuji dan divalidasi. Berfokus pada eksplorasi teknologi baru dan disrupsi pasar.",
    color: "#c026d3",
    icon: Zap,
    stats: [
      { label: "Focus", value: "R&D Disruption" },
      { label: "Output", value: "Rapid Prototypes" }
    ],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    name: "EVORY",
    type: "LIFESTYLE OS",
    desc: "Platform gaya hidup end-to-end. Menggabungkan utilitas sehari-hari dengan desain antarmuka yang mulus untuk pengalaman digital yang adiktif.",
    color: "#ea580c",
    icon: TerminalSquare,
    stats: [
      { label: "Ecosystem", value: "End-to-End" },
      { label: "Metric", value: "High Retention" }
    ],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop"
  }
]

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"

const ScrambleText = ({ text, trigger }: { text: string, trigger: boolean }) => {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    let iteration = 0
    let interval: NodeJS.Timeout

    if (trigger) {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index]
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )
        if (iteration >= text.length) {
          clearInterval(interval)
        }
        iteration += 1 / 3
      }, 30)
    }

    return () => clearInterval(interval)
  }, [text, trigger])

  return <span>{displayText}</span>
}

const Crosshair = () => {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden md:block mix-blend-difference">
      <motion.div className="absolute top-0 bottom-0 w-[1px] bg-white/30" style={{ x: smoothX }} />
      <motion.div className="absolute left-0 right-0 h-[1px] bg-white/30" style={{ y: smoothY }} />
      <motion.div className="absolute w-4 h-4 border border-white/50 rounded-full" style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }} />
    </div>
  )
}

const VelocityTicker = () => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  
  const baseX = useRef(0)
  const [x, setX] = useState(0)

  const wrapVal = (min: number, max: number, v: number) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
  }

  useAnimationFrame((t, delta) => {
    let moveBy = -0.1 * (delta / 16)
    moveBy += moveBy * velocityFactor.get()
    baseX.current += moveBy
    setX(wrapVal(-50, 0, baseX.current))
  })

  return (
    <div className="w-full border-y-4 border-black bg-white py-6 overflow-hidden flex whitespace-nowrap">
      <motion.div className="flex gap-12 font-mono font-black text-3xl md:text-5xl uppercase tracking-widest text-black" style={{ x: `${x}%` }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span>OPERATIONAL SYSTEMS</span>
            <div className="w-4 h-4 bg-black" />
            <span>HOLDING ENTITIES</span>
            <div className="w-4 h-4 bg-black" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const ExpandableGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="w-full h-[150vh] lg:h-[85vh] flex flex-col lg:flex-row border-y-4 border-black bg-black">
      {venturesData.map((item, index) => {
        const isHovered = hoveredIndex === index
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ flex: isHovered ? 3 : 1 }}
            transition={{ duration: 0.7, ease: [0.19, 1.0, 0.22, 1.0] }}
            className={`relative overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-black last:border-0 bg-white group ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
          >
            <div className="absolute inset-0 z-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale contrast-125 opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: isHovered ? 0.9 : 0 }} 
                transition={{ duration: 0.5 }} 
                className="absolute inset-0 mix-blend-multiply" 
                style={{ backgroundColor: item.color }} 
              />
            </div>

            <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className={`font-mono text-2xl md:text-4xl font-black transition-colors duration-500 ${isHovered ? 'text-white' : 'text-black'}`}>
                  {item.id}
                </span>
                <motion.div 
                  animate={{ rotate: isHovered ? 45 : 0, backgroundColor: isHovered ? '#fff' : '#000', color: isHovered ? '#000' : '#fff' }}
                  className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-none shadow-[4px_4px_0px_#000]"
                >
                  <ArrowUpRight size={24} />
                </motion.div>
              </div>

              <div className="w-full">
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 text-white overflow-hidden"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <item.icon size={20} />
                        <span className="font-mono font-bold tracking-widest text-sm uppercase">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-8">
                        {item.desc}
                      </p>
                      <div className="flex gap-6 border-l-4 border-white pl-6">
                        {item.stats.map((stat, i) => (
                          <div key={i}>
                            <span className="block font-mono text-xs uppercase opacity-70 mb-1">{stat.label}</span>
                            <span className="block font-heading font-black text-2xl uppercase">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7vw] font-black font-heading tracking-tighter uppercase whitespace-nowrap leading-none transition-colors duration-500" style={{ color: isHovered ? '#fff' : '#000' }}>
                  <ScrambleText text={item.name} trigger={isHovered} />
                </h2>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function VenturesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Navbar />
      <Crosshair />
      <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-32">
        
        <section className="container mx-auto px-6 md:px-12 mb-20 relative z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 bg-blue-600 rounded-none animate-pulse" />
              <span className="font-mono text-xs font-black tracking-[0.2em] uppercase border-b-2 border-black pb-1">
                SYSTEM_ENTITIES
              </span>
            </div>
            
            <h1 className="text-[14vw] md:text-[10vw] leading-[0.85] font-black font-heading tracking-tighter uppercase text-black">
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }} className="block"><ScrambleText text="DIGITAL" trigger={isLoaded} /></motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1.0, 0.22, 1.0] }} className="block"><ScrambleText text="PARTNERSHIP." trigger={isLoaded} /></motion.span></span>
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 border-black pt-8">
              <p className="md:col-span-2 text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
                Ekosistem produk dan layanan inovatif yang diinkubasi, direkayasa, dan diskalakan secara independen di bawah arsitektur Weatso Holding.
              </p>
              <div className="flex flex-col gap-2 font-mono text-xs font-bold uppercase tracking-widest">
                <div className="flex justify-between border-b border-black pb-2"><span>Status</span><span className="text-blue-600">Active</span></div>
                <div className="flex justify-between border-b border-black pb-2"><span>Nodes</span><span>03 Entities</span></div>
                <div className="flex justify-between border-b border-black pb-2"><span>Protocol</span><span>Strict</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <VelocityTicker />
        
        <ExpandableGrid />

        <section className="py-32 px-6 md:px-12 bg-white flex flex-col items-center justify-center text-center relative z-10 border-b-4 border-black">
          <div className="w-full max-w-5xl border-4 border-black p-12 md:p-24 shadow-[20px_20px_0px_#2563eb] relative overflow-hidden group bg-white">
            <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.19,1.0,0.22,1.0] z-0" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading uppercase tracking-tighter mb-8 group-hover:text-white transition-colors duration-500">
                INITIATE PARTNERSHIP
              </h2>
              <a 
                href="https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300"
              >
                Connect To Node <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}