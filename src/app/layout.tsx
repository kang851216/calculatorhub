import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { homeMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL("https://calculator-hub.pages.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ⚡ Flash prevention: set data-theme before React hydrates */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })();
          `,
        }} />

        {/* 🌐 Set <html lang> from URL for static export */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var match = window.location.pathname.match(/^\\/(en|zh-TW|zh-CN|ko)(\\/|$)/);
                if (match) {
                  var langMap = { 'en': 'en', 'zh-TW': 'zh-Hant', 'zh-CN': 'zh-Hans', 'ko': 'ko' };
                  document.documentElement.lang = langMap[match[1]] || 'en';
                }
              } catch(e) {}
            })();
          `,
        }} />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CalculatorHub" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://calculator-hub.pages.dev" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
