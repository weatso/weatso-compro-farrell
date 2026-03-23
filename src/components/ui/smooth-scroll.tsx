"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inisialisasi Lenis (Settingan Optima)
    const lenis = new Lenis({
      duration: 1.2, // Atur durasi scroll (1.2 = standar smooth)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    // Loop Animasi (Wajib untuk Lenis Vanilla)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup saat komponen di-unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}