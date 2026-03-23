import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* COLUMN 1: BRAND */}
          <div className="space-y-4">
            <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-white block">
              WEATSO.
            </Link>
            <p className="text-slate-400 font-light max-w-xs leading-relaxed">
              Transforming ideas into digital reality. 
              Membangun masa depan digital dengan presisi dan inovasi.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-4">
            <h3 className="font-bold text-white tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="#ventures" className="hover:text-blue-400 transition-colors">Ventures</Link></li>
              <li><Link href="#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div className="space-y-4">
            <h3 className="font-bold text-white tracking-wide uppercase text-sm">Get in Touch</h3>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <a href="https://api.whatsapp.com/send/?phone=6281225837439&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Hubungi via WhatsApp</a>
            </div>
            
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Weatso Holding. Built with passion in Indonesia.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
