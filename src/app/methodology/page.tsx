'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Terminal, Database, Activity, GitCommit, Search, ShieldCheck, Server, Workflow } from 'lucide-react'
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const methodologyData = [
  {
    id: "01",
    phase: "Discovery & Audit",
    title: "System Mapping & Requirement Analysis",
    description: "Dekonstruksi arsitektur legacy Anda. Kami memetakan bottleneck performa dan struktur data sebelum fase engineering dimulai.",
    details: ["Architecture Audit", "Stakeholder Interviews", "Feasibility Study", "Risk Mitigation Plan"],
    mockupType: "audit"
  },
  {
    id: "02",
    phase: "Architecture Strategy",
    title: "Enterprise Blueprint Design",
    description: "Pemilihan tech-stack, desain topologi cloud, skema database, dan pemodelan API gateway untuk skalabilitas global.",
    details: ["System Design", "Cloud Topology", "Database Schema", "API Contracts"],
    mockupType: "architecture"
  },
  {
    id: "03",
    phase: "Agile Execution",
    title: "Test-Driven Development",
    description: "Eksekusi dengan standar CI/CD ketat. Fitur dibangun melalui iterasi terukur dengan unit testing otomatis.",
    details: ["Sprint Planning", "Microservices Implementation", "Automated Testing", "Code Review"],
    mockupType: "code"
  },
  {
    id: "04",
    phase: "QA & Security",
    title: "Vulnerability & Load Stressing",
    description: "Simulasi lonjakan trafik ekstrem dan pemindaian kerentanan keamanan untuk memastikan ketahanan sistem.",
    details: ["Penetration Test", "Load Stressing", "Latency Audit", "Accessibility Check"],
    mockupType: "terminal"
  },
  {
    id: "05",
    phase: "Launch & Scale",
    title: "Deployment & Monitoring",
    description: "Transisi ke environment production dengan zero-downtime, didukung monitoring real-time dan auto-scaling.",
    details: ["Zero-Downtime Deployment", "Auto-Scaling Setup", "24/7 Monitoring", "Disaster Recovery"],
    mockupType: "monitoring"
  }
]

const AuditMockup = () => (
  <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col font-mono text-xs">
    <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between text-slate-500">
      <span className="flex items-center gap-2"><Search size={14} /> system_audit_report.json</span>
      <span>100%</span>
    </div>
    <div className="p-4 flex flex-col gap-3">
      {[
        { label: "Legacy Codebase Parsing", status: "Complete", time: "1.2s", color: "text-emerald-500" },
        { label: "Database Schema Extraction", status: "Complete", time: "0.8s", color: "text-emerald-500" },
        { label: "Vulnerability Scanning", status: "Found 3", time: "2.4s", color: "text-amber-500" },
        { label: "Dependency Tree Analysis", status: "Complete", time: "1.5s", color: "text-emerald-500" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'text-emerald-500' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="text-slate-700">{item.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={item.color}>{item.status}</span>
            <span className="text-slate-400 w-8 text-right">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ArchitectureMockup = () => (
  <div className="w-full h-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col items-center justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs">
    <div className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 flex items-center gap-1 sm:gap-2">
      <Search size={12} className="text-slate-400" /> Client Application
    </div>
    <div className="w-px h-6 sm:h-8 bg-slate-200 relative">
      <motion.div className="absolute top-0 left-[-1px] w-[3px] h-3 bg-blue-500" animate={{ y: [0, 24, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    </div>
    <div className="px-4 py-2 sm:px-6 sm:py-3 border border-blue-200 rounded-xl bg-blue-50 text-blue-700 flex items-center gap-1 sm:gap-2 font-bold shadow-sm">
      <Server size={12} /> API Gateway
    </div>
    <div className="flex gap-4 sm:gap-8">
      <div className="flex flex-col items-center">
        <div className="w-px h-6 sm:h-8 bg-slate-200" />
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-lg bg-white text-slate-600 flex items-center gap-1 sm:gap-2">
          <Workflow size={12} className="text-slate-400" /> Auth Node
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-px h-6 sm:h-8 bg-slate-200" />
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-lg bg-white text-slate-600 flex items-center gap-1 sm:gap-2">
          <Database size={12} className="text-slate-400" /> Main DB
        </div>
      </div>
    </div>
  </div>
)

const CodeMockup = () => (
  <div className="w-full bg-[#0F172A] rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs leading-relaxed">
    <div className="border-b border-slate-800 bg-[#1E293B] px-4 py-3 flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
      <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
      <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
      <span className="ml-4 text-slate-400">core.ts</span>
    </div>
    <div className="p-4 overflow-x-auto text-slate-300">
      <p><span className="text-purple-400">import</span> {'{'} <span className="text-blue-400">Database</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@infrastructure'</span>;</p>
      <p className="mt-2"><span className="text-purple-400">export async function</span> <span className="text-blue-400">initializeSystem</span>() {'{'}</p>
      <p>  <span className="text-purple-400">try</span> {'{'}</p>
      <p>    <span className="text-purple-400">const</span> db <span className="text-blue-400">= new</span> Database();</p>
      <p>    <span className="text-purple-400">await</span> db.connect({'{'} <span className="text-amber-400">poolSize</span>: <span className="text-orange-400">100</span> {'}'});</p>
      <p>    <span className="text-slate-500">{'// Initialize microservices'}</span></p>
      <p>    <span className="text-purple-400">return</span> {'{'} <span className="text-amber-400">status</span>: <span className="text-emerald-400">'operational'</span> {'}'};</p>
      <p>  {'}'} <span className="text-purple-400">catch</span> (error) {'{'}</p>
      <p>    <span className="text-blue-400">console</span>.<span className="text-blue-400">error</span>(error);</p>
      <p>  {'}'}</p>
      <p>{'}'}</p>
    </div>
  </div>
)

const TerminalMockup = () => (
  <div className="w-full bg-[#0F172A] rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs leading-relaxed text-slate-400">
    <div className="border-b border-slate-800 bg-[#1E293B] px-4 py-3 flex items-center gap-2">
      <Terminal size={14} className="text-slate-500" />
      <span>bash — qa-runner</span>
    </div>
    <div className="p-4">
      <p><span className="text-emerald-400">➜</span> <span className="text-blue-400">weatso-core</span> <span className="text-slate-300">npm run test:stress</span></p>
      <p className="mt-2">&gt; Initiating load testing protocol...</p>
      <p>&gt; Target: api.production.cluster</p>
      <div className="my-2 border-l-2 border-slate-700 pl-3">
        <p className="text-emerald-400">✓ Auth Service (2000 req/s) - 45ms</p>
        <p className="text-emerald-400">✓ Payment Gateway (500 req/s) - 120ms</p>
        <p className="text-emerald-400">✓ Data Sync (1500 req/s) - 85ms</p>
      </div>
      <p className="text-emerald-400 mt-2">✨ All 142 security & load tests passed.</p>
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-3 bg-slate-400 mt-1" />
    </div>
  </div>
)

const MonitoringMockup = () => (
  <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 font-mono text-xs flex flex-col gap-4">
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2">
        <Activity size={14} className="text-blue-500" />
        <span className="text-slate-700 font-bold">Live Metrics</span>
      </div>
      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">HEALTHY</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
        <span className="block text-slate-500 mb-1">CPU Load</span>
        <span className="text-lg font-bold text-slate-800">24.5%</span>
      </div>
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
        <span className="block text-slate-500 mb-1">Active Pods</span>
        <span className="text-lg font-bold text-slate-800">12 / 12</span>
      </div>
    </div>
    <div className="h-20 w-full flex items-end gap-1 pt-4 border-t border-slate-100">
      {[40, 35, 45, 30, 50, 45, 60, 55, 65, 50, 40, 45].map((h, i) => (
        <motion.div key={i} className="flex-1 bg-blue-100 rounded-t-sm" initial={{ height: `${h}%` }} animate={{ height: [`${h}%`, `${h + (Math.random() * 20 - 10)}%`, `${h}%`] }} transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-full h-1 bg-blue-500 rounded-t-sm" />
        </motion.div>
      ))}
    </div>
  </div>
)

const PhaseSection = ({ item, index, activeIndex, setActiveIndex }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" })

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index)
    }
  }, [isInView, index, setActiveIndex])

  return (
    <div ref={ref} id={`phase-${index}`} className="py-24 md:py-32 min-h-[80vh] flex flex-col justify-center">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-sm font-bold text-blue-600">{item.id}</span>
        <div className="h-px w-8 bg-slate-200" />
        <span className="font-mono text-xs font-bold tracking-widest text-slate-500 uppercase">{item.phase}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-slate-900 mb-6 leading-[1.1]">
        {item.title}
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl">
        {item.description}
      </p>
      
      <div className="w-full max-w-md mb-12 lg:hidden">
        {item.mockupType === 'audit' && <AuditMockup />}
        {item.mockupType === 'architecture' && <ArchitectureMockup />}
        {item.mockupType === 'code' && <CodeMockup />}
        {item.mockupType === 'terminal' && <TerminalMockup />}
        {item.mockupType === 'monitoring' && <MonitoringMockup />}
      </div>

      <div className="flex flex-col gap-4 border-l border-slate-200 pl-6">
        {item.details.map((detail: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={16} className="text-slate-300" />
            <span className="font-mono text-sm text-slate-700">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MethodologyPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const scrollTo = (index: number) => {
    const element = document.getElementById(`phase-${index}`)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
        
        <section className="pt-48 pb-24 px-6 md:px-12 border-b border-slate-100 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <GitCommit size={16} className="text-slate-400" />
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Process Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black font-heading tracking-tighter text-slate-900 leading-[0.95] max-w-4xl mb-8">
              Engineering <br />
              <span className="text-slate-400">By Design.</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              Sebuah protokol presisi yang diuji secara ketat. Kami menghilangkan ambiguitas teknis untuk memastikan pengiriman sistem berskala enterprise yang dapat diprediksi.
            </p>
          </div>
        </section>

        <section ref={containerRef} className="relative bg-white">
          <div className="container mx-auto max-w-6xl px-6 md:px-12 flex items-start gap-12 lg:gap-24 relative">
            
            <div className="hidden lg:flex w-1/3 sticky top-0 h-screen flex-col justify-center py-24">
              <div className="flex flex-col gap-8 relative">
                <div className="absolute left-[7px] top-4 bottom-4 w-px bg-slate-100 z-0" />
                <motion.div 
                  className="absolute left-[7px] top-4 w-px bg-slate-900 z-10 transition-all duration-500 ease-out"
                  style={{ height: `${(activeIndex / (methodologyData.length - 1)) * 100}%` }}
                />

                {methodologyData.map((item, index) => {
                  const isActive = activeIndex === index
                  return (
                    <button 
                      key={item.id}
                      onClick={() => scrollTo(index)}
                      className="group relative z-20 flex items-start gap-6 text-left"
                    >
                      <div className={`w-4 h-4 rounded-full border-2 bg-white mt-1 shrink-0 transition-colors duration-300 ${isActive ? 'border-slate-900' : 'border-slate-200 group-hover:border-slate-400'}`} />
                      <div>
                        <span className={`block font-mono text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                          {item.id} — {item.phase}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-20 w-full min-h-[400px] h-auto bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {methodologyData[activeIndex].mockupType === 'audit' && <AuditMockup />}
                      {methodologyData[activeIndex].mockupType === 'architecture' && <ArchitectureMockup />}
                      {methodologyData[activeIndex].mockupType === 'code' && <CodeMockup />}
                      {methodologyData[activeIndex].mockupType === 'terminal' && <TerminalMockup />}
                      {methodologyData[activeIndex].mockupType === 'monitoring' && <MonitoringMockup />}
                    </motion.div>
                 </AnimatePresence>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              {methodologyData.map((item, index) => (
                <PhaseSection key={item.id} item={item} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
              ))}
            </div>

          </div>
        </section>

        <section className="py-32 bg-slate-50 border-t border-slate-200 text-center px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-slate-900 mb-6">
              Mulai Inisiasi Sistem.
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl">
              Tinggalkan trial-and-error. Mari diskusikan arsitektur teknis Anda bersama tim engineer kami.
            </p>
            <a 
              href="https://api.whatsapp.com/send/?phone=081225837439&text&type=phone_number&app_absent=0" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-blue-600 transition-colors duration-300"
            >
              Jadwalkan Konsultasi <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}