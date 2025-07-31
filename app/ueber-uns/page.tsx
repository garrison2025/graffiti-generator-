import { Card } from "@/components/ui/card"
import { Type, Users, Target, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Über uns - Graffiti Schrift Generator | Unser Team & Mission",
  description:
    "Erfahre mehr über das Team hinter dem Graffiti Schrift Generator. Unsere Mission: Die beste kostenlose Online-Plattform für Graffiti-Design und Street Art Kreationen.",
  keywords: [
    "über uns",
    "graffiti generator team",
    "street art plattform",
    "graffiti design mission",
    "kostenlose design tools",
  ],
  openGraph: {
    title: "Über uns - Graffiti Schrift Generator",
    description:
      "Das Team hinter dem führenden kostenlosen Graffiti Generator. Erfahre mehr über unsere Mission und Vision.",
    url: "https://graffitischriftgenerator.pro/ueber-uns",
  },
}

export default function UeberUnsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Über uns - Graffiti Schrift Generator",
    description: "Informationen über das Team und die Mission des Graffiti Schrift Generators",
    url: "https://graffitischriftgenerator.pro/ueber-uns",
    mainEntity: {
      "@type": "Organization",
      name: "Graffiti Schrift Generator",
      url: "https://graffitischriftgenerator.pro",
      description: "Kostenloser Online Graffiti Schrift Generator",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@graffitischriftgenerator.pro",
        contactType: "customer service",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Über uns
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Wir sind das Team hinter dem führenden kostenlosen Graffiti Schrift Generator im deutschsprachigen Raum.
              Unsere Leidenschaft für Street Art und Design treibt uns an, die beste Online-Plattform für
              Graffiti-Kreationen zu schaffen.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">Unsere Mission</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Wir glauben, dass jeder die Möglichkeit haben sollte, seine Kreativität durch Graffiti und Street Art
              auszudrücken - unabhängig von technischen Fähigkeiten oder finanziellen Mitteln. Deshalb haben wir den
              Graffiti Schrift Generator entwickelt: Ein kostenloses, benutzerfreundliches Tool, das es jedem
              ermöglicht, professionelle Graffiti-Designs zu erstellen.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Unsere Werte</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✨ Kostenloser Zugang für alle</li>
                  <li>🎨 Förderung der Kreativität</li>
                  <li>🚀 Kontinuierliche Innovation</li>
                  <li>🤝 Community-orientiert</li>
                  <li>📱 Benutzerfreundlichkeit</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Unsere Vision</h3>
                <p className="text-gray-300">
                  Wir möchten die erste Anlaufstelle für alle sein, die sich für Graffiti und Street Art interessieren.
                  Durch unsere Tools und Inhalte inspirieren wir eine neue Generation von digitalen Street Artists.
                </p>
              </div>
            </div>
          </Card>

          {/* Team Section */}
          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">Unser Team</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Hinter dem Graffiti Schrift Generator steht ein leidenschaftliches Team aus Entwicklern, Designern und
              Street Art Enthusiasten. Wir kombinieren technische Expertise mit kreativer Vision, um die bestmögliche
              Benutzererfahrung zu schaffen.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Type className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Entwicklung</h3>
                <p className="text-gray-400 text-sm">
                  Modernste Web-Technologien für optimale Performance und Benutzerfreundlichkeit
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Authentische Graffiti-Stile und intuitive Benutzeroberflächen</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-400 text-sm">
                  Aufbau einer aktiven Community von Graffiti-Liebhabern und Künstlern
                </p>
              </div>
            </div>
          </Card>

          {/* Technology Section */}
          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Technologie & Innovation</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Unser Graffiti Generator basiert auf modernsten Web-Technologien und wird kontinuierlich weiterentwickelt.
              Wir setzen auf:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Frontend-Technologien</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Next.js für optimale Performance</li>
                  <li>• Canvas API für hochwertige Grafiken</li>
                  <li>• Responsive Design für alle Geräte</li>
                  <li>• Progressive Web App Features</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Benutzerfreundlichkeit</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Keine Registrierung erforderlich</li>
                  <li>• Sofortige Vorschau aller Änderungen</li>
                  <li>• Hochwertige PNG-Downloads</li>
                  <li>• Mobile-optimierte Bedienung</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">Kontaktiere uns</h2>
            <p className="text-black mb-6 text-lg">
              Hast du Fragen, Anregungen oder möchtest du mit uns zusammenarbeiten? Wir freuen uns auf deine Nachricht!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Generator ausprobieren
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
