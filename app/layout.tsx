import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { generateSEOMetadata } from "@/components/seo-optimized-content"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  ...generateSEOMetadata("home"),
  title: "Graffiti Schrift Generator | Online & Kostenlos",
  description:
    "Dein Text als cooles Graffiti. Online erstellen, anpassen und als PNG downloaden. Ohne Anmeldung.",
  applicationName: "Graffiti Schrift Generator",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Graffiti Generator",
  },
  openGraph: {
    siteName: "Graffiti Schrift Generator",
    title: "Graffiti Schrift Generator | Online & Kostenlos",
    description:
      "Dein Text als cooles Graffiti. Online erstellen, anpassen und als PNG downloaden. Ohne Anmeldung.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Graffiti Schrift Generator Logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        {/* ... (你已有的所有 link 和 meta 标签保持不变) ... */}

        {/* Brand structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Brans Graffiti Generator",
              alternateName: "Brans",
              url: "https://graffiti-generator.vercel.app",
              logo: {
                "@type": "ImageObject",
                url: "https://graffiti-generator.vercel.app/android-chrome-512x512.png",
                width: 512,
                height: 512,
              },
              description: "Kostenloser Online Graffiti Schrift Generator mit 25+ authentischen Stilen",
              sameAs: ["https://github.com/brans-graffiti-generator", "https://twitter.com/brans_graffiti"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@brans-graffiti.com",
                contactType: "customer service",
                availableLanguage: ["German", "English"],
              },
              foundingDate: "2024",
              founder: {
                "@type": "Organization",
                name: "Brans Design Team",
              },
            }),
          }}
        />

        {/* ================ Google AdSense 代码已添加在这里 ================ */}
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1528586776567779"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
        {/* ========================================================== */}

      </head>
      <body className={inter.className}>
        {children}

        {/* Service Worker Registration - Non-blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />

        {/* Adsterra Social Bar Script */}
        <Script
          id="adsterra-social-bar"
          src="//pl27526014.effectivecpmrate.com/96/01/3c/96013cadae263a64715af046a23e6ec7.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  )
}
