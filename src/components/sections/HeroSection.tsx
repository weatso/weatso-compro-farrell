'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { ArrowRight, Mouse } from 'lucide-react';



// ==========================================
// ==========================================
// 1. HERO VISUAL (CSS-based)
// ==========================================
const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: customEase }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  </motion.div>
);

const HeroVisual = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none mt-10 lg:mt-0">
      {/* Background glow for the visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px]" />
      
      {/* Main Code Card */}
      <FloatingCard className="top-10 lg:top-8 right-4 lg:-right-4 w-[280px] z-20" delay={0.5}>
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <p className="text-xs text-slate-400 font-mono ml-2">system_architecture.ts</p>
        </div>
        <div className="space-y-2 font-mono text-[10px] sm:text-xs">
          <p className="text-blue-400"><span className="text-purple-400">import</span> {`{ Core }`} <span className="text-purple-400">from</span> '@weatso/engine';</p>
          <p className="text-slate-300 mt-2"><span className="text-purple-400">const</span> system = <span className="text-blue-400">new</span> Core({`{`}</p>
          <p className="text-slate-400 pl-4">scale: <span className="text-amber-300">'enterprise'</span>,</p>
          <p className="text-slate-400 pl-4">availability: <span className="text-amber-300">99.999</span>,</p>
          <p className="text-slate-400 pl-4">security: <span className="text-amber-300">'zero-trust'</span>,</p>
          <p className="text-slate-400 pl-4">analytics: <span className="text-purple-400">true</span></p>
          <p className="text-slate-300">{`});`}</p>
          <p className="text-blue-400 mt-2">system.<span className="text-emerald-400">deploy</span>();</p>
        </div>
      </FloatingCard>

      {/* Metric Card */}
      <FloatingCard className="bottom-10 lg:bottom-16 -left-4 lg:-left-12 w-[220px] z-30" delay={0.7}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-slate-200">Global Latency</h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">LIVE</span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-4xl font-bold text-white tracking-tighter">12</span>
          <span className="text-sm text-slate-500 mb-1 font-mono">ms</span>
        </div>
        {/* Fake chart line */}
        <div className="w-full h-10 flex items-end gap-1.5">
          {[40, 25, 45, 30, 60, 20, 35, 80, 40, 60].map((h, i) => (
            <div key={i} className="w-full bg-emerald-500/20 rounded-t-sm relative overflow-hidden group" style={{ height: `${h}%` }}>
              <div className="absolute bottom-0 w-full bg-emerald-400 transition-all duration-300 left-0" style={{ height: '30%' }} />
            </div>
          ))}
        </div>
      </FloatingCard>

      {/* Security/Status Card */}
      <FloatingCard className="top-1/2 lg:top-[60%] -right-2 lg:-right-8 w-[200px] z-10" delay={0.9}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping opacity-20" />
            <svg className="w-5 h-5 text-blue-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">System Status</p>
            <p className="text-sm font-semibold text-white">Encrypted</p>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
};

// ==========================================
// 2. MAIN UI COMPONENT
// ==========================================
const customEase: [number, number, number, number] = [0.19, 1.0, 0.22, 1.0];

const rotatingWords = [
  "Architecting",
  "Engineering",
  "Scaling",
  "Securing"
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen min-h-[800px] bg-[#030303] overflow-hidden flex items-center"
    >


      {/* --- GLOW EFFECTS --- */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* --- FOREGROUND CONTENT --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="container mx-auto px-6 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col justify-center pt-20 lg:pt-0 pointer-events-none">
            


            <h1 className="text-[12vw] sm:text-7xl lg:text-[7.5rem] font-heading font-extrabold tracking-tighter text-white leading-[0.9]">
              <div className="overflow-hidden pb-4 md:pb-6">
                <motion.span 
                  initial={{ y: "110%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.3 }}
                  className="block origin-bottom-left"
                >
                  Building
                </motion.span>
              </div>
              <div className="overflow-hidden pb-4 md:pb-6 mt-[-1%] md:mt-[-2%]">
                <motion.span 
                  initial={{ y: "110%", rotate: -2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1.2, ease: customEase, delay: 0.4 }}
                  className="block origin-bottom-left"
                >
                  Scalable
                </motion.span>
              </div>

              {/* Animasi Kata Berganti (Rotating words) */}
              <div className="relative h-[1.1em] overflow-hidden mt-[-1%] md:mt-[-2%]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: customEase }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 pb-2 md:pb-4"
                  >
                    {rotatingWords[index]}<span className="text-white">.</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase, delay: 0.6 }}
              className="text-slate-400 font-light text-base md:text-xl max-w-2xl leading-relaxed mb-8 md:mb-12 px-4 md:px-0"
            >
              Weatso adalah agensi rekayasa perangkat lunak berskala enterprise. Kami merancang arsitektur sistem dengan presisi tinggi, mengintegrasikan teknologi cloud, AI, dan platform digital yang tangguh untuk masa depan.
            </motion.p>



          </div>
          
          <div className="hidden lg:block lg:col-span-4 relative z-20">
            <HeroVisual />
          </div>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-6 lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-3 text-slate-500 z-10"
      >
        <Mouse size={18} className="animate-bounce" />
        <span className="text-xs font-semibold uppercase tracking-widest">
          Scroll to discover
        </span>
      </motion.div>
    </section>
  );
}