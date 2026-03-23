"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code2, Monitor, Cuboid, HeartHandshake, ArrowUpRight
} from "lucide-react";

// Ganti color dengan className text color yang sesuai
const ventures = [
  {
    id: "weatso-service",
    name: "Weatso Service",
    category: "IT Consultant",
    desc: "Transformasi digital presisi. Web App, Software, & Sistem Informasi.",
    icon: Code2,
    gradient: "from-blue-600 to-indigo-600",
    textColor: "text-blue-600"
  },
  {
    id: "weatso-developer",
    name: "Weatso Developer",
    category: "SaaS Product",
    desc: "Produk digital B2B siap pakai dengan model lisensi & langganan.",
    icon: Monitor,
    gradient: "from-purple-600 to-fuchsia-600",
    textColor: "text-purple-600"
  },
  {
    id: "co-labz",
    name: "CO-Labz",
    category: "Virtual Studio",
    desc: "Pengembang aset Roblox, peta virtual, dan pengalaman 3D interaktif.",
    icon: Cuboid,
    gradient: "from-pink-500 to-rose-500",
    textColor: "text-pink-600"
  },
  {
    id: "invitin",
    name: "Invitin",
    category: "Lifestyle",
    desc: "Platform undangan pernikahan digital dengan estetika premium.",
    icon: HeartHandshake,
    gradient: "from-orange-500 to-amber-500",
    textColor: "text-orange-600"
  }
];

const VenturesGrid = () => {
  return (
    <section id="ventures" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our Ventures</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          </div>
          <p className="text-gray-500 max-w-md text-right md:text-left">
            Empat pilar utama yang menggerakkan ekosistem inovasi Weatso.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col h-[420px] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
            >
              {/* IMAGE AREA (60% Height) */}
              <div className={`h-[60%] w-full bg-gradient-to-br ${venture.gradient} relative overflow-hidden`}>
                {/* Mockup Image Placeholder - Ganti <div/> ini dengan <Image src="..." /> nanti */}
                // GANTI DENGAN INI (Hapus request network, pakai CSS native):
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                {/* LOGO DI KIRI BAWAH GAMBAR (Menggantikan Icon standar) */}
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <venture.icon size={24} className={venture.textColor} />
                  </div>
                </div>

                {/* Arrow Button (Hover Only) */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${venture.textColor}`}>
                  {venture.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {venture.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {venture.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VenturesGrid;