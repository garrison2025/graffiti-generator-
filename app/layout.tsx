import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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
        {/* Critical CSS and Performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload critical resources */}
        <link rel="preload" href="/android-chrome-192x192.png" as="image" type="image/png" />
        <link rel="preload" href="/android-chrome-512x512.png" as="image" type="image/png" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Brans Graffiti" />
        <meta name="application-name" content="Brans Graffiti Generator" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="theme-color" content="#1f2937" />

        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

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
      </body>
    </html>
  )
}
