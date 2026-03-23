import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Switch to Inter & Outfit (modern tech feel)
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Weatso Holding - Transformasi Digital & Solusi Teknologi",
    template: "%s | Weatso Holding"
  },
  description: "IT Consultant dan Web Development profesional. Spesialisasi dalam Cloud Solutions, System Integration, dan Digital Product Development.",
  keywords: ["Web Development", "IT Consultant", "Cloud Solutions", "System Integration", "Software House Indonesia", "Weatso"],
  authors: [{ name: "Weatso Team" }],
  creator: "Weatso Holding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="antialiased font-sans bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
