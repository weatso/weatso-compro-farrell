'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Cloud, Network, ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Kami membangun aplikasi web modern, sangat cepat, dan scalable menggunakan tumpukan teknologi mutakhir. Dirancang khusus untuk performa tinggi.',
    icon: Monitor,
  },
  {
    id: '02',
    title: 'Cloud Solutions',
    description: 'Infrastruktur cloud yang efisien dan aman. Mulai dari migrasi hingga manajemen arsitektur untuk memastikan bisnis Anda berjalan tanpa henti.',
    icon: Cloud,
  },
  {
    id: '03',
    title: 'Digital Ecosystem',
    description: 'Bukan sekadar aplikasi, kami merancang ekosistem digital komprehensif yang menghubungkan seluruh operasional bisnis Anda dengan masa depan.',
    icon: Network,
  },
];

const customEase: [number, number, number, number] = [0.19, 1.0, 0.22, 1.0];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6 relative" ref={containerRef}>
        
        {/* --- HEADER ASIMETRIS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-24 items-end">
          <div className="md:col-span-7">
            {/* Tagline Kecil */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: customEase }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
                Expertise
              </span>
            </motion.div>

            {/* Judul Utama dengan Reveal */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-heading tracking-tight leading-[1.1]">
              <div className="overflow-hidden pb-2">
                <motion.span 
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
                  className="block"
                >
                  Solusi Komprehensif
                </motion.span>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.span 
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.8, ease: customEase, delay: 0.2 }}
                  className="block text-slate-400"
                >
                  Untuk Skala Enterprise.
                </motion.span>
              </div>
            </h2>
          </div>

          <div className="md:col-span-5 md:pl-10 border-l border-slate-200">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: customEase, delay: 0.3 }}
              className="text-lg text-slate-500 font-light leading-relaxed"
            >
              Kami tidak hanya menulis kode, kami merancang arsitektur masa depan. 
              Menghadirkan layanan digital end-to-end untuk mempercepat transisi bisnis Anda.
            </motion.p>
          </div>
        </div>

        {/* --- SERVICE CARDS (PREMIUM GRID) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: customEase, delay: 0.2 + (index * 0.15) }}
              className="group relative bg-[#F8FAFC] rounded-[2.5rem] p-10 lg:p-12 overflow-hidden hover:bg-slate-900 transition-colors duration-500"
            >
              {/* Background Numbering Watermark */}
              <div className="absolute -top-6 -right-6 text-[120px] font-heading font-black text-slate-200/50 group-hover:text-white/5 transition-colors duration-500 pointer-events-none select-none">
                {service.id}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 mb-10 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 mb-12 leading-relaxed font-light group-hover:text-slate-400 transition-colors duration-500 flex-grow">
                  {service.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;