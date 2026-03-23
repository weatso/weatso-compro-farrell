'use client'

import React, { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight, Copy, CheckCircle2 } from 'lucide-react'

const PhysicsGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let mouse = { x: -1000, y: -1000, radius: 150 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
      }
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    class Point {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      density: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = 1.5
        this.density = (Math.random() * 30) + 1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }
    }

    let particleArray: Point[] = []
    const init = () => {
      particleArray = []
      const spacing = 35
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const columns = Math.floor(rect.width / spacing)
      const rows = Math.floor(rect.height / spacing)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          particleArray.push(new Point(x * spacing + (spacing / 2), y * spacing + (spacing / 2)))
        }
      }
    }

    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}

const MagneticButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: ReactMouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-20 cursor-pointer p-4 md:p-8"
      onClick={onClick}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative flex items-center justify-center bg-white text-slate-900 px-8 py-5 md:px-12 md:py-6 rounded-full overflow-hidden group"
      >
        <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[cubic-bezier(0.19,1.0,0.22,1.0)] rounded-full" />
        <motion.span 
          style={{ x: useSpring(x * 0.2, springConfig), y: useSpring(y * 0.2, springConfig) }}
          className="relative z-10 flex items-center gap-3 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300"
        >
          {children}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"])
  const titleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(20px)", "blur(0px)"])

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@weatso.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={containerRef} id="contact" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
      
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <PhysicsGrid />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center justify-center flex-1">
        
        <motion.div 
          style={{ y: titleY, scale: titleScale, opacity, filter: blur }}
          className="text-center w-full max-w-6xl mx-auto flex flex-col items-center justify-center"
        >
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-white/70 text-xs md:text-sm font-bold tracking-widest uppercase">
                Initiate New Project
              </span>
            </motion.div>
          </div>

          <h2 className="text-[15vw] md:text-[12vw] lg:text-[10rem] font-black text-white font-heading tracking-tighter leading-[0.85] uppercase mb-4 w-full flex flex-col items-center">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Let&apos;s Build
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 pb-4">
              Legendary.
            </span>
          </h2>
          
          <p className="text-slate-400 font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed mt-6 mb-16 px-4">
            Ekosistem digital Anda berikutnya dimulai dari sini. Mari diskusikan arsitektur, skala, dan visi masa depan tanpa batasan teknis.
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="flex flex-col sm:flex-row items-center gap-6 relative z-30"
        >
          <MagneticButton onClick={() => window.open('https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0', '_blank')}>
            Mulai Diskusi Proyek
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <ArrowUpRight size={16} />
            </div>
          </MagneticButton>

          <a 
            href="https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-transparent text-white hover:bg-white/5 transition-colors duration-300"
          >
            <CheckCircle2 size={18} className="text-white/50 group-hover:text-white transition-colors" />
            <span className="text-sm font-semibold tracking-wide">
              Hubungi Kami via WA
            </span>
          </a>
        </motion.div>

      </div>


    </section>
  )
}