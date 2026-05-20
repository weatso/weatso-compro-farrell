import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import PreloaderWrapper from "@/components/ui/preloader-wrapper";
import FloatingLogo from "@/components/ui/floating-logo";

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
    default: "WEATSO — Rekayasa Solusi Digital Tanpa Kompromi",
    template: "%s | WEATSO",
  },
  description:
    "WEATSO adalah software house asal Semarang yang membangun ekosistem digital kelas enterprise. Zero Compromise. Absolute Execution. Kami merekayasa arsitektur sistem kustom yang menghentikan kebocoran operasional dan mengamankan dominasi digital bisnis Anda.",
  keywords: [
    "Software House Indonesia",
    "Software House Semarang",
    "Jasa Pembuatan Website",
    "Jasa Pembuatan Aplikasi",
    "Custom Software Development",
    "Digital Infrastructure",
    "Enterprise Software",
    "WEATSO",
    "Web Development Semarang",
    "Software Engineering Indonesia",
  ],
  authors: [{ name: "WEATSO", url: "https://weatso.com" }],
  creator: "WEATSO",
  publisher: "WEATSO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "WEATSO",
    title: "WEATSO — Rekayasa Solusi Digital Tanpa Kompromi",
    description:
      "Software house Semarang yang membangun ekosistem digital kelas enterprise. Managed Ecosystem & True Bespoke — arsitektur kustom, kepemilikan penuh.",
  },
  icons: {
    icon: [
      { url: "/logo/logo_weatso_biru.svg", type: "image/svg+xml" },
      { url: "/logo/logo_weatso_biru.png", type: "image/png" },
    ],
    shortcut: "/logo/logo_weatso_biru.svg",
    apple: "/logo/logo_weatso_biru.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="dark"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <FloatingLogo />
            <PreloaderWrapper />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
