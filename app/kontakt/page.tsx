import { Card } from "@/components/ui/card"
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - Graffiti Schrift Generator | Hilfe & Support",
  description:
    "Kontaktiere das Team vom Graffiti Schrift Generator. Wir helfen bei Fragen, Problemen oder Anregungen. E-Mail: info@graffitischriftgenerator.pro",
  keywords: ["kontakt", "hilfe", "support", "graffiti generator", "kundenservice", "fragen"],
  openGraph: {
    title: "Kontakt - Graffiti Schrift Generator",
    description: "Kontaktiere uns bei Fragen oder Anregungen zum Graffiti Schrift Generator.",
    url: "https://graffitischriftgenerator.pro/kontakt",
  },
}

export default function KontaktPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt - Graffiti Schrift Generator",
    description: "Kontaktinformationen für den Graffiti Schrift Generator",
    url: "https://graffitischriftgenerator.pro/kontakt",
    mainEntity: {
      "@type": "Organization",
      name: "Graffiti Schrift Generator",
      email: "info@graffitischriftgenerator.pro",
      url: "https://graffitischriftgenerator.pro",
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@graffitischriftgenerator.pro",
        contactType: "customer service",
        availableLanguage: "German",
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
              Kontakt
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Wir freuen uns auf deine Nachricht! Egal ob Fragen, Anregungen oder technische Probleme - unser Team hilft
              gerne weiter.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold">E-Mail Kontakt</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Schreibe uns eine E-Mail für alle Anfragen, Feedback oder technischen Support:
                </p>
                <a
                  href="mailto:info@graffitischriftgenerator.pro"
                  className="text-yellow-400 hover:text-yellow-300 text-lg font-semibold"
                >
                  info@graffitischriftgenerator.pro
                </a>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold">Antwortzeiten</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Allgemeine Anfragen:</strong> Innerhalb von 24-48 Stunden
                  </p>
                  <p>
                    <strong className="text-white">Technischer Support:</strong> Innerhalb von 12-24 Stunden
                  </p>
                  <p>
                    <strong className="text-white">Geschäftsanfragen:</strong> Innerhalb von 2-3 Werktagen
                  </p>
                </div>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-6 w-6 text-yellow-400 mr-3" />
                  <h2 className="text-2xl font-bold">Häufige Anfragen</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-2">Technische Probleme</h3>
                    <p className="text-gray-300 text-sm">
                      Generator lädt nicht, Download funktioniert nicht, Browser-Kompatibilität
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-2">Feature-Wünsche</h3>
                    <p className="text-gray-300 text-sm">Neue Schriftstile, zusätzliche Effekte, Export-Formate</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-2">Kooperationen</h3>
                    <p className="text-gray-300 text-sm">Partnerschaften, Werbung, Content-Kooperationen</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form Area */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <h2 className="text-2xl font-bold mb-6">Schnelle Hilfe</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-yellow-400 mb-2">🚀 Generator funktioniert nicht?</h3>
                    <p className="text-gray-300 text-sm mb-3">Versuche diese Schritte, bevor du uns kontaktierst:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Browser-Cache leeren (Strg+F5)</li>
                      <li>• Anderen Browser ausprobieren</li>
                      <li>• JavaScript aktiviert lassen</li>
                      <li>• Ad-Blocker temporär deaktivieren</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-yellow-400 mb-2">📱 Mobile Probleme?</h3>
                    <p className="text-gray-300 text-sm mb-3">Tipps für die mobile Nutzung:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Querformat für bessere Ansicht</li>
                      <li>• Ausreichend freier Speicher</li>
                      <li>• Aktueller Browser verwenden</li>
                      <li>• Stabile Internetverbindung</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-yellow-400 mb-2">💡 Feature-Idee?</h3>
                    <p className="text-gray-300 text-sm">
                      Wir freuen uns über deine Ideen! Beschreibe uns detailliert, welche Funktion du dir wünschst und
                      wie sie dir helfen würde.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
                <h2 className="text-2xl font-bold text-black mb-4">Direkter Kontakt</h2>
                <p className="text-black mb-6">
                  Für die schnellste Antwort schreibe uns direkt eine E-Mail mit deiner Frage oder deinem Problem.
                </p>
                <a
                  href="mailto:info@graffitischriftgenerator.pro?subject=Anfrage%20vom%20Graffiti%20Generator"
                  className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  E-Mail schreiben
                </a>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="bg-gray-800 border-gray-700 p-8 mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Weitere Informationen</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-400 text-sm">
                  Tausche dich mit anderen Nutzern aus und teile deine Kreationen in unserer wachsenden Community.
                </p>
              </div>
              <div>
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Standort</h3>
                <p className="text-gray-400 text-sm">
                  Unser Team arbeitet remote aus Deutschland und ist per E-Mail für dich erreichbar.
                </p>
              </div>
              <div>
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verfügbarkeit</h3>
                <p className="text-gray-400 text-sm">
                  Wir bearbeiten E-Mails Montag bis Freitag und antworten so schnell wie möglich.
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Zurück zum Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
