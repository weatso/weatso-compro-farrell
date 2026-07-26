import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import PreloaderWrapper from "@/components/ui/preloader-wrapper";
import FloatingLogo from "@/components/ui/floating-logo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WEATSO",
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
    title: "WEATSO",
    description:
      "Software house Semarang yang membangun ekosistem digital kelas enterprise. Managed Ecosystem & True Bespoke — arsitektur kustom, kepemilikan penuh.",
  },
  icons: {
    icon: [
      { url: "/logo/weatso_ico.ico", type: "image/x-icon" },
      { url: "/logo/weatso_ico.ico", type: "image/x-icon" },
    ],
    shortcut: "/logo/weatso_ico.ico",
    apple: "/logo/weatso_ico.ico",
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
      className={spaceGrotesk.variable}
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
