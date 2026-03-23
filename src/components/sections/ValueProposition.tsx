'use client'

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Users, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

// ==========================================
// 1. DATA
// ==========================================
const values = [
  {
    num: "01",
    icon: Star,
    title: 'Teknologi Terkini',
    description: 'Arsitektur modern yang terbukti reliable dan scalable. Kami membangun sistem yang dirancang untuk performa dan keamanan tingkat enterprise, siap menghadapi lonjakan trafik masa depan.',
    color: 'from-blue-600/40 to-cyan-600/10'
  },
  {
    num: "02",
    icon: Users,
    title: 'Kolaborasi Mendalam',
    description: 'Kami bekerja sebagai ekstensi organik dari tim Anda. Kesuksesan visi Anda adalah matriks utama keberhasilan kami. Transparansi penuh di setiap sprint.',
    color: 'from-purple-600/40 to-pink-600/10'
  },
  {
    num: "03",
    icon: TrendingUp,
    title: 'Solusi Terukur',
    description: 'Setiap baris kode dioptimalkan untuk tumbuh bersama bisnis Anda. Kami secara proaktif menghindari technical debt agar laju inovasi Anda tidak terhambat.',
    color: 'from-emerald-600/40 to-teal-600/10'
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: 'Dukungan Proaktif',
    description: 'Komitmen kami baru dimulai saat aplikasi diluncurkan. Kami memonitor, mengoptimasi, dan memelihara ekosistem digital Anda secara terus-menerus.',
    color: 'from-orange-600/40 to-amber-600/10'
  }
];

// ==========================================
// 2. CUSTOM CANVAS PARTICLE NETWORK
// ==========================================
const TechCanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      init();
    };

    window.addEventListener('resize', resize);
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas!.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(100, 150, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 - distance / 1200})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />;
};

// ==========================================
// 3. MAIN COMPONENT (ACCORDION)
// ==========================================
const customEase: [number, number, number, number] = [0.19, 1.0, 0.22, 1.0];

const ValueProposition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % values.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="py-24 md:py-32 bg-[#020202] text-white relative overflow-hidden" ref={containerRef}>
      
      <TechCanvasBackground />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        {/* PERUBAHAN DI SINI: items-start untuk mobile, md:items-end untuk desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl w-full">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: customEase }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-blue-500" />
              <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
                The Standard
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.1]">
              <div className="overflow-hidden pb-2">
                <motion.span 
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
                  className="block text-white"
                >
                  Eksekusi Tanpa
                </motion.span>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.span 
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, ease: customEase, delay: 0.2 }}
                  className="block text-slate-500"
                >
                  Kompromi.
                </motion.span>
              </div>
            </h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.3 }}
            className="text-slate-400 font-light max-w-sm md:text-right text-left"
          >
            Empat pilar utama yang menjadikan kami mitra strategis terbaik untuk inovasi digital Anda.
          </motion.p>
        </div>

        {/* --- INTERACTIVE ACCORDION PANELS --- */}
        <div 
          className="flex flex-col lg:flex-row w-full h-[600px] lg:h-[500px] gap-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {values.map((item, i) => {
            const isActive = active === i;

            return (
              <motion.div
                key={i}
                layout 
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className={`relative overflow-hidden rounded-[2rem] cursor-pointer border border-white/5 transition-colors duration-500 ${
                  isActive ? 'bg-[#0a0a0a]' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} z-0 pointer-events-none`}
                />

                <div className="relative z-10 w-full h-full">
                  
                  <motion.div
                    animate={{ 
                      opacity: isActive ? 0 : 1, 
                      filter: isActive ? "blur(10px)" : "blur(0px)",
                      pointerEvents: isActive ? "none" : "auto"
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-row lg:flex-col items-center justify-between lg:justify-center p-6 lg:gap-8"
                  >
                    <span className="text-2xl font-light text-white/20 font-heading">
                      {item.num}
                    </span>
                    <item.icon size={24} className="text-white/30" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      opacity: isActive ? 1 : 0, 
                      filter: isActive ? "blur(0px)" : "blur(10px)",
                      scale: isActive ? 1 : 0.95,
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                    transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
                    className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end"
                  >
                    <div className="absolute top-6 right-8 text-[80px] md:text-[120px] font-bold text-white/[0.03] font-heading leading-none pointer-events-none select-none">
                      {item.num}
                    </div>

                    <div className="mb-4 md:mb-6 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <item.icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 tracking-tight whitespace-nowrap">
                      {item.title}
                    </h3>

                    <div className="overflow-hidden max-w-lg">
                      <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-semibold text-blue-400 uppercase tracking-wider group w-max cursor-pointer">
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Value</span>
                        <span className="inline-block absolute left-0 top-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white">Explore Value</span>
                      </span>
                      <div className="w-8 h-8 rounded-full border border-blue-400/30 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all">
                        <ArrowRight size={14} className="group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                  
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ValueProposition;