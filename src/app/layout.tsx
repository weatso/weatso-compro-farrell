import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

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
    default: "WEATSO — Engineering Definitive Solutions",
    template: "%s | WEATSO",
  },
  description:
    "Zero Compromise. Absolute Execution. We engineer custom software ecosystems that halt operational leaks and secure your digital dominance.",
  keywords: [
    "Software Engineering",
    "Custom Software",
    "Digital Infrastructure",
    "Enterprise Solutions",
    "WEATSO",
    "Software House Indonesia",
  ],
  authors: [{ name: "WEATSO" }],
  creator: "WEATSO",
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
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
