"use client";
import React from "react";
import { motion,Transition } from "framer-motion";
import { 
  MailOpen, 
  QrCode, 
  Images, 
  Gift, 
  Armchair, 
  LucideIcon 
} from "lucide-react";

// --- Types ---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon; // Type khusus untuk component Icon
  className?: string;
  delay?: number;
}

const LUXURY_TRANSITION: Transition = {
  type: "spring", // Gunakan mesin fisika Framer Motion
  stiffness: 70, // Kontrol seberapa 'kaku' (semakin rendah, semakin lambat)
  damping: 30,  // Kontrol seberapa cepat ia berhenti memantul
  mass: 1,      // Berat objek
  // Hapus properti 'ease'
};

// --- Components ---
const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, // Rename prop agar bisa dipakai sebagai Component (<Icon />)
  className = "", 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...LUXURY_TRANSITION, delay }}
      className={`relative p-8 rounded-3xl bg-white border border-stone-100 shadow-sm hover:shadow-md transition-shadow duration-500 overflow-hidden group flex flex-col justify-between h-full ${className}`}
    >
      {/* Background Hover Effect - Halus sekali */}
      <div className="absolute inset-0 bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* ICON CONTAINER */}
        <div className="w-12 h-12 rounded-2xl bg-stone-100 mb-6 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-500">
            {/* Stroke Width 1.25 adalah kunci kemewahan (tidak tebal, tidak terlalu tipis) */}
            <Icon size={24} strokeWidth={1.25} />
        </div>

        <h3 className="text-2xl font-serif text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 font-light leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-[#F9F9F7]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={LUXURY_TRANSITION}
                className="text-4xl md:text-5xl font-serif text-gray-900 mb-6"
            >
                Curated Features
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...LUXURY_TRANSITION, delay: 0.2 }}
                className="text-gray-500 max-w-lg mx-auto font-light"
            >
                Teknologi yang dirancang tidak hanya untuk bekerja, tetapi untuk memukau.
            </motion.p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: RSVP (Lebar) */}
          <FeatureCard 
            title="Smart RSVP System"
            description="Pelacakan kehadiran real-time. Tamu scan, isi data, dan sistem kami mengurus sisanya. Ucapkan selamat tinggal pada spreadsheet manual."
            icon={MailOpen}
            className="md:col-span-2"
            delay={0.1}
          />

          {/* Card 2: QR Check-in */}
          <FeatureCard 
            title="QR Access"
            description="Verifikasi tamu VIP dalam hitungan detik dengan sistem pemindaian ultra-cepat."
            icon={QrCode}
            delay={0.2}
          />

          {/* Card 3: Gallery (Tinggi) */}
          <FeatureCard 
            title="Immersive Gallery"
            description="Tampilkan foto pre-wedding dalam resolusi penuh tanpa kompresi yang merusak kualitas. Biarkan tamu merasakan emosinya."
            icon={Images}
            className="md:row-span-2"
            delay={0.3}
          />

           {/* Card 4: Gift */}
           <FeatureCard 
            title="Digital Envelope"
            description="Integrasi pembayaran aman untuk hadiah non-tunai langsung ke rekening Anda."
            icon={Gift}
            delay={0.4}
          />

           {/* Card 5: Seating */}
           <FeatureCard 
            title="Seat Arranger"
            description="Drag-and-drop tamu ke meja mereka. Pastikan setiap orang duduk di tempat yang tepat."
            icon={Armchair}
            delay={0.5}
          />

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;