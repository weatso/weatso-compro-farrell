'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame } from 'framer-motion'
import { Layers } from 'lucide-react'

const technologies = [
  { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', color: '#06B6D4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'AWS', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Framer Motion', color: '#0055FF', icon: 'https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png' },
]

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const TechPill = ({ tech }: { tech: typeof technologies[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3 px-6 py-3 shrink-0 transition-opacity duration-300 cursor-default"
    >
      <div className="w-10 h-10 flex items-center justify-center relative">
        <img 
          src={tech.icon} 
          alt={tech.name} 
          className="w-full h-full object-contain transition-all duration-500"
          style={{ 
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%) opacity(40%)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      </div>
      <span 
        className="text-xl font-bold font-heading tracking-tight transition-colors duration-500"
        style={{ color: isHovered ? tech.color : '#cbd5e1' }}
      >
        {tech.name}
      </span>
    </div>
  )
}

const VelocityMarquee = ({ items, baseVelocity = 100 }: { items: typeof technologies, baseVelocity: number }) => {
  const baseX = useRef(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  
  const [x, setX] = useState(0)

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000)
    moveBy += moveBy * velocityFactor.get()
    baseX.current += moveBy
    setX(wrap(-50, 0, baseX.current))
  })

  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex flex-nowrap py-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div className="flex gap-6 whitespace-nowrap" style={{ x: `${x}%` }}>
        {[...items, ...items, ...items, ...items].map((tech, idx) => (
          <TechPill key={`${tech.name}-${idx}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  )
}

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [4, -4])

  return (
    <section ref={containerRef} id="tech" className="relative py-32 bg-white overflow-hidden border-t border-slate-100">
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-slate-300" />
            <span className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
              Technology Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-slate-900 leading-[1.1]">
            Standardisasi <br />
            <span className="text-slate-300">Skala Global.</span>
          </h2>
        </div>
        <p className="text-slate-500 font-light max-w-sm md:text-right leading-relaxed">
          Arsitektur modern yang dibangun di atas protokol open-source teruji untuk menjamin stabilitas dan kecepatan maksimal.
        </p>
      </div>

      <motion.div style={{ skewX }} className="relative z-10 w-[110%] -ml-[5%] flex flex-col gap-4">
        <VelocityMarquee items={technologies} baseVelocity={-3} />
        <VelocityMarquee items={[...technologies].reverse()} baseVelocity={3} />
      </motion.div>

    </section>
  )
}