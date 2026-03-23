'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  return (
    <>
      <motion.div
        key={`curtain-${pathname}`}
        initial={{ left: 0, right: 0 }}
        animate={{ left: "100%", right: "-100%" }}
        transition={{ duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.2 }}
        className="fixed top-0 bottom-0 z-[100] bg-[#030303] flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          className="overflow-hidden flex items-center gap-2"
        >
          <img src="/weatso.svg" alt="Weatso" className="h-16 md:h-24 w-auto scale-[1.5] md:scale-[2] brightness-0 invert" />
        </motion.div>
      </motion.div>

      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  )
}