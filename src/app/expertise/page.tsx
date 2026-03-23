'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion'
import { ArrowRight, CheckCircle2, Code2, Smartphone, Server, PenTool, Zap, Activity, Box, Command } from 'lucide-react'
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const expertiseList = [
  {
    id: "exp_01",
    title: "Web & Platforms Engineering",
    subtitle: "Arsitektur frontend modern dengan performa dan skalabilitas tingkat enterprise.",
    description: "Kami membangun aplikasi web yang melampaui ekspektasi tradisional. Menggunakan kerangka kerja React dan Next.js terbaru, kami menciptakan pengalaman pengguna yang instan, SEO-friendly, dan siap menangani lonjakan trafik global. Fokus kami pada Core Web Vitals memastikan setiap interaksi terasa fluid.",
    technologies: ["React 19", "Next.js 14 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Edge Functions"],
    features: ["Server-Side Rendering (SSR)", "Static Site Generation (SSG)", "Incremental Static Regeneration", "Edge Computing Integration", "Advanced State Management"],
    icon: Code2,
    demoId: "frontend"
  },
  {
    id: "exp_02",
    title: "Mobile Ecosystems",
    subtitle: "Aplikasi native dan cross-platform yang menyatu dengan perangkat pengguna.",
    description: "Menghadirkan pengalaman mobile kelas dunia di iOS dan Android. Kami memanfaatkan React Native dan Expo untuk basis kode tunggal yang efisien tanpa mengorbankan performa native, atau menggunakan Swift dan Kotlin untuk kebutuhan spesifik platform yang mendalam.",
    technologies: ["React Native", "Expo SDK", "Swift (iOS)", "Kotlin (Android)", "Mobile DevOps (CI/CD)"],
    features: ["Native Module Bridging", "Over-the-Air (OTA) Updates", "Offline-First Architecture", "Biometric Authentication", "Advanced Gesture Handling"],
    icon: Smartphone,
    demoId: "mobile"
  },
  {
    id: "exp_03",
    title: "Distributed Backend & Cloud",
    subtitle: "Infrastruktur serverless dan microservices yang tangguh dan elastis.",
    description: "Tulang punggung operasi digital Anda. Kami merancang sistem backend yang aman, dapat diaudit, dan dapat diskalakan secara horizontal. Dari API gateway berkinerja tinggi hingga manajemen database yang kompleks, kami memastikan data Anda mengalir tanpa hambatan.",
    technologies: ["Node.js", "Go (Golang)", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS Lambda"],
    features: ["Microservices Architecture", "Event-Driven Systems", "Real-time WebSockets", "Database Sharding & Replication", "Automated Scaling"],
    icon: Server,
    demoId: "backend"
  },
  {
    id: "exp_04",
    title: "Technical UI/UX Strategy",
    subtitle: "Desain berbasis data yang menjembatani estetika dan implementasi teknis.",
    description: "Kami tidak hanya menggambar layar; kami merancang sistem. Pendekatan kami memastikan bahwa setiap keputusan desain dapat diimplementasikan secara efisien dalam kode, menciptakan konsistensi antara visi produk dan hasil akhir di tangan pengguna.",
    technologies: ["Figma", "Design Tokens", "Storybook", "Component Driven Development", "Usability Testing"],
    features: ["Atomic Design Systems", "Interactive Prototyping", "Design-to-Code Workflows", "Accessibility (a11y) Compliance", "Performance-Centric Design"],
    icon: PenTool,
    demoId: "uiux"
  }
]

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })
  const { x, y } = position
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="relative z-10">
      <motion.button 
        onClick={() => window.open('https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0', '_blank')}
        style={{ x: springX, y: springY }} 
        className="relative flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm overflow-hidden group"
      >
        <span className="relative z-10">Start Consultation</span>
        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
      </motion.button>
    </motion.div>
  )
}

const FrontendDemo = () => {
  const [isOn, setIsOn] = useState(false)
  return (
    <div className="h-full w-full bg-slate-50 rounded-xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="relative z-10 text-center mb-4">
        <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2"><Code2 size={18} className="text-blue-500"/> Interactive UI Component</h4>
        <p className="text-sm text-slate-500">Fluid animations & state management.</p>
      </div>
      <div className="relative z-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 cursor-pointer" onClick={() => setIsOn(!isOn)}>
        <motion.div className="w-24 h-12 bg-slate-200 rounded-full p-1 flex items-center" animate={{ backgroundColor: isOn ? "#3b82f6" : "#e2e8f0" }}>
          <motion.div className="w-10 h-10 bg-white rounded-full shadow-sm" layout transition={{ type: "spring", stiffness: 700, damping: 30 }} animate={{ x: isOn ? 48 : 0 }} />
        </motion.div>
        <p className="text-xs font-medium text-slate-500 mt-4 text-center">{isOn ? "State: Active" : "State: Inactive"}</p>
      </div>
    </div>
  )
}

const MobileDemo = () => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start(i => ({
      y: [0, -10, 0], transition: { delay: i * 0.2, duration: 2, repeat: Infinity, ease: "easeInOut" }
    }))
  }, [controls])
  return (
    <div className="h-full w-full bg-slate-50 rounded-xl border border-slate-200 p-8 flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="relative z-10 w-[180px] h-[320px] bg-white rounded-[2rem] border-4 border-slate-900 shadow-xl overflow-hidden flex flex-col">
        <div className="h-8 bg-slate-100 flex items-center justify-center border-b border-slate-100"><div className="w-16 h-1.5 bg-slate-300 rounded-full" /></div>
        <div className="flex-1 p-4 space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} custom={i} animate={controls} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-blue-100 text-blue-600' : i === 1 ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {i === 0 ? <Box size={16}/> : i === 1 ? <Activity size={16}/> : <Zap size={16}/>}
              </div>
              <div className="h-2 w-20 bg-slate-200 rounded-full" />
            </motion.div>
          ))}
        </div>
        <div className="h-12 bg-slate-50 border-t border-slate-100 flex items-center justify-around px-4 text-slate-400"><Box size={18}/><Activity size={18} className="text-blue-500"/><Command size={18}/></div>
      </div>
    </div>
  )
}

const BackendDemo = () => {
  return (
    <div className="h-full w-full bg-[#0F172A] rounded-xl border border-slate-800 p-8 flex flex-col items-center justify-center overflow-hidden relative text-slate-300">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      <div className="relative z-10 flex items-center gap-8 mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-400"><Server size={24} /></div>
          <span className="text-xs font-mono">API Gateway</span>
        </div>
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-500" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
        ))}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400"><Box size={24} /></div>
          <span className="text-xs font-mono">Microservice A</span>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-xs bg-slate-900/50 rounded-lg border border-slate-800 p-4 font-mono text-xs">
        <p className="text-emerald-400">$ status check --watch</p>
        <div className="mt-2 space-y-1 text-slate-400">
          <p>[info] gateway: healthy (2ms)</p>
          <p>[info] service_a: processing events...</p>
          <motion.p animate={{ opacity: [1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8 }}>[data] stream: <span className="text-blue-400">Creating connections...</span></motion.p>
        </div>
      </div>
    </div>
  )
}

const UiUxDemo = () => {
  const [hue, setHue] = useState(210)
  return (
    <div className="h-full w-full bg-white rounded-xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white z-0" />
      <div className="relative z-10 text-center">
        <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2"><PenTool size={18} className="text-purple-500"/> Design System Tokens</h4>
        <p className="text-sm text-slate-500">Interactive variable manipulation.</p>
      </div>
      <div className="relative z-10 w-full max-w-xs space-y-4">
        <div className="p-6 rounded-2xl shadow-sm border border-slate-100 transition-colors duration-300" style={{ backgroundColor: `hsl(${hue}, 80%, 96%)` }}>
          <div className="w-16 h-16 rounded-xl mb-4 shadow-sm transition-colors duration-300" style={{ backgroundColor: `hsl(${hue}, 90%, 50%)` }} />
          <h5 className="text-lg font-bold transition-colors duration-300" style={{ color: `hsl(${hue}, 90%, 20%)` }}>Primary Color</h5>
          <p className="text-sm transition-colors duration-300" style={{ color: `hsl(${hue}, 80%, 40%)` }}>Semantic token usage example.</p>
        </div>
        <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" />
        <div className="flex justify-between text-xs font-mono text-slate-500">
          <span>Hue: {hue}°</span>
          <span>hsl({hue}, 90%, 50%)</span>
        </div>
      </div>
    </div>
  )
}

const ExpertiseAccordionItem = ({ item, isOpen, onClick }: any) => {
  return (
    <motion.div initial={false} className="border-b border-slate-200 bg-white overflow-hidden group">
      <motion.button
        onClick={onClick}
        className={`w-full flex items-start text-left py-8 px-6 md:px-12 transition-colors duration-300 ${isOpen ? 'bg-slate-50/80' : 'hover:bg-slate-50'}`}
      >
        <div className={`p-3 rounded-xl mr-6 transition-colors duration-300 ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
          <item.icon size={24} />
        </div>
        <div className="flex-1 pr-8">
          <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${isOpen ? 'text-blue-900' : 'text-slate-900'}`}>
            {item.title}
          </h3>
          <p className="text-slate-500 font-medium max-w-2xl">
            {item.subtitle}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 ${isOpen ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:bg-white'}`}
        >
          <ArrowRight size={18} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 md:px-12 pb-12 pt-4 border-t border-slate-100 bg-slate-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech: string) => (
                        <span key={tech} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-700 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Key Capabilities</h4>
                    <ul className="space-y-3">
                      {item.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                          <CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="h-[400px] lg:h-auto min-h-[400px] relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                  {item.demoId === 'frontend' && <FrontendDemo />}
                  {item.demoId === 'mobile' && <MobileDemo />}
                  {item.demoId === 'backend' && <BackendDemo />}
                  {item.demoId === 'uiux' && <UiUxDemo />}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ExpertisePage() {
  const [openId, setOpenId] = useState<string | null>("exp_01")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-blue-600" />
              <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">Our Domain Expertise</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Excellence.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              Kami memadukan rekayasa perangkat lunak yang disiplin dengan pemikiran desain strategis untuk membangun fondasi digital yang siap menghadapi masa depan.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="border-t border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden mb-20">
            {expertiseList.map((item) => (
              <ExpertiseAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to define your architecture?</h3>
              <p className="text-slate-500 font-medium">Jadwalkan sesi konsultasi teknis mendalam dengan prinsipal engineer kami.</p>
            </div>
            <MagneticButton>Start Consultation</MagneticButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}