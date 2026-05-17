'use client'

import { useState } from 'react'
import Preloader from './preloader'

export default function PreloaderWrapper() {
  const [show, setShow] = useState(true)
  if (!show) return null
  return <Preloader onComplete={() => setShow(false)} />
}
