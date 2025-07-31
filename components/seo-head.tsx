import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  structuredData?: object
}

export function SEOHead({
  title = "Graffiti Generator - Kostenloser Online Graffiti Schrift Generator",
  description = "✨ Erstelle coole Graffiti-Schriftzüge online und kostenlos! 🎨 25+ Graffiti-Stile, anpassbare Farben, Effekte und sofortiger PNG-Download.",
  keywords = [],
  canonicalUrl,
  ogImage = "/og-image.png",
  structuredData,
}: SEOHeadProps) {
  const defaultKeywords = [
    "graffiti generator",
    "graffiti schrift",
    "graffiti erstellen",
    "online graffiti",
    "graffiti font",
    "street art generator",
  ]

  const allKeywords = [...defaultKeywords, ...keywords].join(", ")

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}
    </Head>
  )
}
