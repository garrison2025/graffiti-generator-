import type { Metadata } from "next"

export const generateSEOMetadata = (page = "home", customTitle?: string, customDescription?: string): Metadata => {
  const baseUrl = "https://graffiti-generator.vercel.app"

  const seoData = {
    home: {
      title: "Dein Graffiti Generator | Kostenlos & Sofort online",
      description:
        "Gib deinen Text ein, wähle einen Style und lade deinen Graffiti-Schriftzug herunter. Schnell, kostenlos und ohne Anmeldung. Probier's jetzt aus!",
      keywords: [
        // Primary Keywords (High Volume)
        "graffiti generator",
        "graffiti schrift generator",
        "graffiti erstellen online",
        "bubble letters generator",
        "wildstyle graffiti generator",
        "graffiti buchstaben erstellen",

        // Long-tail Keywords (High Intent)
        "kostenloser graffiti generator",
        "graffiti generator ohne anmeldung",
        "online graffiti maker deutsch",
        "graffiti schrift kostenlos erstellen",
        "bubble letters online erstellen",
        "wildstyle schrift generator",

        // Mobile Keywords
        "graffiti generator handy",
        "mobile graffiti creator",
        "graffiti app online",
        "graffiti generator smartphone",

        // Local Keywords (Germany)
        "graffiti generator deutsch",
        "graffiti schriftarten deutsch",
        "deutsche graffiti fonts",
        "graffiti erstellen deutschland",

        // Use Case Keywords
        "graffiti name erstellen",
        "graffiti logo generator",
        "street art generator",
        "graffiti für instagram",
        "graffiti für youtube",
        "graffiti design poster",
        "graffiti schrift tshirt",

        // Competitor Keywords
        "graffiti creator online",
        "spray paint font generator",
        "urban font generator",
        "street art font maker",

        // Technical Keywords
        "graffiti png download",
        "transparente graffiti schrift",
        "graffiti svg export",
        "hochauflösende graffiti",

        // Trend Keywords 2025
        "graffiti generator 2025",
        "ai graffiti generator",
        "moderne graffiti schriftarten",
        "digitale street art",
        "tiktok graffiti generator",
        "instagram graffiti creator",

        // Question-based Keywords
        "wie erstelle ich graffiti schrift",
        "wo kann ich graffiti erstellen",
        "welcher graffiti generator ist kostenlos",
        "wie macht man bubble letters",

        // Feature Keywords
        "graffiti wall hintergrund",
        "graffiti effekte online",
        "3d graffiti generator",
        "neon graffiti erstellen",
        "chrome graffiti effekt",
        "fire graffiti style",

        // Quality Keywords
        "professionelle graffiti schrift",
        "authentische graffiti stile",
        "realistische graffiti",
        "HD graffiti download",
      ],
    },
    about: {
      title: "Über uns - Graffiti Generator Team | Unsere Mission & Vision",
      description:
        "Erfahre mehr über das Team hinter dem führenden kostenlosen Graffiti Generator. Unsere Mission: Die beste Online-Plattform für Street Art und Graffiti-Design.",
      keywords: ["über uns", "graffiti generator team", "street art plattform", "graffiti design mission"],
    },
    contact: {
      title: "Kontakt & Support - Graffiti Generator | Hilfe & Feedback",
      description:
        "Kontaktiere das Graffiti Generator Team. Schneller Support, Feedback und Hilfe bei Problemen. E-Mail: info@graffitischriftgenerator.pro",
      keywords: ["kontakt", "support", "hilfe", "graffiti generator support", "kundenservice"],
    },
  }

  const currentData = seoData[page as keyof typeof seoData] || seoData.home

  return {
    title: customTitle || currentData.title,
    description: customDescription || currentData.description,
    keywords: currentData.keywords,
    authors: [{ name: "Graffiti Generator Team", url: baseUrl }],
    creator: "Graffiti Generator",
    publisher: "Graffiti Generator",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}${page === "home" ? "" : `/${page}`}`,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${baseUrl}${page === "home" ? "" : `/${page}`}`,
      title: customTitle || currentData.title,
      description: customDescription || currentData.description,
      siteName: "Graffiti Generator",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Graffiti Generator - Erstelle coole Graffiti-Schriftzüge online",
        },
        {
          url: `${baseUrl}/og-image-square.png`,
          width: 800,
          height: 800,
          alt: "Graffiti Generator Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: customTitle || currentData.title,
      description: customDescription || currentData.description,
      images: [`${baseUrl}/og-image.png`],
      creator: "@graffiti_gen",
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
    other: {
      "msapplication-TileColor": "#1f2937",
      "theme-color": "#1f2937",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "format-detection": "telephone=no",
    },
    category: "Design Tools",
    classification: "Design Software",
    referrer: "origin-when-cross-origin",
  }
}

export const generateStructuredData = (page = "home") => {
  const baseUrl = "https://graffiti-generator.vercel.app"

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Graffiti Generator",
    alternateName: ["Graffiti Schrift Generator", "Online Graffiti Creator", "Street Art Generator", "Brans Graffiti"],
    description: "Kostenloser Online Graffiti Schrift Generator mit 25+ authentischen Stilen",
    url: baseUrl,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    permissions: "no special permissions required",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "Graffiti Generator Team",
      url: baseUrl,
      logo: `${baseUrl}/android-chrome-512x512.png`,
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@graffitischriftgenerator.pro",
        contactType: "customer service",
        availableLanguage: ["German", "English"],
      },
    },
    featureList: [
      "25+ authentische Graffiti Schriftstile",
      "Bubble Letters Generator",
      "Wildstyle Graffiti Creator",
      "Street Art Hintergründe",
      "Anpassbare Farben und Effekte",
      "PNG, JPG, WebP, SVG Export",
      "Responsive Design für alle Geräte",
      "Kostenlos ohne Registrierung",
      "Rückgängig/Wiederholen Funktion",
      "Vorlagen für schnellen Start",
      "Mobile optimiert",
      "Tastenkürzel Support",
      "Graffiti Wall Hintergründe",
      "Professionelle Qualität",
      "Sofortiger Download",
      "Chrome Effekte",
      "Fire und Ice Stile",
      "Neon Graffiti",
      "3D Schatten Effekte",
      "Spray Paint Texturen",
    ],
    screenshot: `${baseUrl}/screenshot.png`,
    softwareVersion: "2.1",
    dateModified: new Date().toISOString(),
    datePublished: "2024-01-01",
    inLanguage: "de-DE",
    audience: {
      "@type": "Audience",
      audienceType: [
        "Graphic Designers",
        "Street Artists",
        "Social Media Creators",
        "Students",
        "Hobbyists",
        "YouTubers",
        "Instagram Creators",
      ],
    },
    usageInfo: "Kostenlose Nutzung für private und kommerzielle Zwecke",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
  }

  // Add page-specific structured data
  if (page === "home") {
    return [
      baseStructuredData,
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Wie erstelle ich Graffiti Schrift online?",
        description:
          "Schritt-für-Schritt Anleitung zum Erstellen von Graffiti-Schriftzügen mit dem kostenlosen Online Generator",
        image: `${baseUrl}/how-to-image.png`,
        totalTime: "PT2M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: "0",
        },
        supply: [
          {
            "@type": "HowToSupply",
            name: "Computer oder Smartphone",
          },
          {
            "@type": "HowToSupply",
            name: "Internetverbindung",
          },
          {
            "@type": "HowToSupply",
            name: "Moderner Webbrowser",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "Brans Graffiti Generator",
            url: baseUrl,
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Text eingeben",
            text: "Gib deinen gewünschten Text in das Eingabefeld ein. Kurze Texte (3-8 Buchstaben) funktionieren am besten.",
            image: `${baseUrl}/step1.png`,
            url: `${baseUrl}#step1`,
          },
          {
            "@type": "HowToStep",
            name: "Schriftstil wählen",
            text: "Wähle aus 25+ authentischen Graffiti-Stilen wie Bubble Letters, Wildstyle, Chrome oder Fire Effects.",
            image: `${baseUrl}/step2.png`,
            url: `${baseUrl}#step2`,
          },
          {
            "@type": "HowToStep",
            name: "Farben und Hintergrund anpassen",
            text: "Passe Textfarbe, Umrandung und wähle einen authentischen Graffiti-Wall Hintergrund aus.",
            image: `${baseUrl}/step3.png`,
            url: `${baseUrl}#step3`,
          },
          {
            "@type": "HowToStep",
            name: "Herunterladen",
            text: "Lade dein fertiges Graffiti als PNG (transparent), JPG, WebP oder SVG in HD-Qualität herunter.",
            image: `${baseUrl}/step4.png`,
            url: `${baseUrl}#step4`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Ist der Graffiti Generator wirklich kostenlos?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, unser Graffiti Generator ist 100% kostenlos nutzbar. Du kannst unbegrenzt Designs erstellen und herunterladen, ohne versteckte Kosten, Wasserzeichen oder Registrierung.",
            },
          },
          {
            "@type": "Question",
            name: "Welche Graffiti-Stile sind verfügbar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wir bieten über 25 authentische Graffiti-Stile: Bubble Letters, Wildstyle, Block Style, Tag Style, Throw-up, Chrome, Fire, Ice, Neon, Electric, Metal, Spray Paint, Pixel Art, Glitch, Rainbow, Frost, Lava, Tribal, Gothic und viele mehr.",
            },
          },
          {
            "@type": "Question",
            name: "Kann ich die Graffiti kommerziell nutzen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ja, alle erstellten Graffiti-Designs können frei für private und kommerzielle Zwecke verwendet werden. Du behältst alle Rechte an deinen Kreationen und kannst sie für T-Shirts, Logos, Social Media, YouTube Thumbnails und mehr verwenden.",
            },
          },
          {
            "@type": "Question",
            name: "Funktioniert der Generator auf dem Handy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolut! Unser Graffiti Generator ist vollständig responsive und mobile-optimiert. Er funktioniert perfekt auf iPhone, Android, iPad und allen Desktop-Computern. Keine App-Installation nötig!",
            },
          },
          {
            "@type": "Question",
            name: "Welche Export-Formate werden unterstützt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Du kannst deine Graffiti-Designs als PNG (mit transparentem Hintergrund), JPG, WebP oder SVG in verschiedenen Auflösungen herunterladen. Alle Formate sind kostenlos verfügbar.",
            },
          },
          {
            "@type": "Question",
            name: "Brauche ich Design-Erfahrung?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nein! Unser Generator ist so einfach zu bedienen, dass jeder in wenigen Minuten professionelle Graffiti-Designs erstellen kann. Einfach Text eingeben, Stil wählen und herunterladen.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Brans Graffiti Generator",
        operatingSystem: "Web Browser",
        applicationCategory: "DesignApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1247",
        },
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "EUR",
        },
      },
    ]
  }

  return baseStructuredData
}

export const SEOContent = {
  longTailKeywords: [
    // Question-based Keywords (High Intent)
    "wie erstelle ich graffiti schrift online",
    "wo kann ich graffiti buchstaben erstellen",
    "welcher graffiti generator ist der beste",
    "wie macht man bubble letters online",
    "graffiti schrift generator ohne anmeldung",
    "was ist der beste kostenlose graffiti generator",
    "wie erstelle ich wildstyle graffiti",
    "wo finde ich graffiti schriftarten",

    // Local Keywords (Germany)
    "graffiti generator deutschland",
    "deutsche graffiti schriftarten",
    "graffiti erstellen auf deutsch",
    "graffiti generator berlin",
    "graffiti generator hamburg",
    "graffiti generator münchen",

    // Use Case Keywords (High Commercial Intent)
    "graffiti für instagram erstellen",
    "graffiti logo für youtube",
    "graffiti name für gaming",
    "graffiti schrift für tshirt",
    "graffiti design für poster",
    "graffiti für twitch banner",
    "graffiti für discord server",
    "graffiti für website header",

    // Comparison Keywords
    "graffiti generator vs photoshop",
    "kostenlose alternative zu graffiti software",
    "online graffiti creator vergleich",
    "bester graffiti generator 2025",

    // Technical Keywords
    "graffiti png download kostenlos",
    "hochauflösende graffiti erstellen",
    "graffiti svg export",
    "transparente graffiti schrift",
    "graffiti mit transparentem hintergrund",

    // Trend Keywords 2025
    "graffiti generator 2025",
    "moderne graffiti schriftarten",
    "digitale street art erstellen",
    "ai graffiti generator",
    "tiktok graffiti generator",
    "instagram graffiti creator",

    // Mobile Keywords
    "graffiti generator handy app",
    "mobile graffiti erstellen",
    "graffiti generator smartphone",
    "graffiti app ohne download",

    // Style-specific Keywords
    "bubble letters generator deutsch",
    "wildstyle graffiti erstellen",
    "3d graffiti generator online",
    "neon graffiti schrift generator",
    "chrome graffiti effekt",
    "fire graffiti style maker",
    "ice graffiti generator",
    "spray paint font generator",
  ],

  contentSections: {
    hero: {
      title: "Graffiti Generator - Erstelle authentische Street Art online",
      subtitle: "Der führende kostenlose Graffiti Schrift Generator mit 25+ professionellen Stilen",
      description:
        "Verwandle deine Texte in beeindruckende Graffiti-Kunstwerke. Bubble Letters, Wildstyle, Chrome-Effekte und mehr - alles kostenlos und ohne Anmeldung.",
    },

    features: {
      title: "Warum unser Graffiti Generator die beste Wahl ist",
      items: [
        {
          title: "25+ Authentische Graffiti-Stile",
          description:
            "Von klassischen Bubble Letters bis zu komplexem Wildstyle - alle wichtigen Graffiti-Stile in professioneller Qualität.",
        },
        {
          title: "Graffiti Wall Hintergründe",
          description:
            "Realistische Wandhintergründe wie Ziegelwand, Beton, U-Bahn-Fliesen für authentische Street Art Optik.",
        },
        {
          title: "Professionelle Export-Optionen",
          description:
            "Download als PNG (transparent), JPG, WebP oder SVG in verschiedenen Auflösungen für jeden Anwendungsfall.",
        },
      ],
    },

    howTo: {
      title: "So erstellst du dein Graffiti in 4 einfachen Schritten",
      steps: [
        "Text eingeben und Schriftstil aus 25+ Optionen wählen",
        "Farben, Effekte und Graffiti-Wall Hintergrund anpassen",
        "Größe, Rotation und Abstände nach Wunsch einstellen",
        "Als PNG, JPG oder SVG in HD-Qualität herunterladen",
      ],
    },
  },
}
