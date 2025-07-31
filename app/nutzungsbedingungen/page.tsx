import { Card } from "@/components/ui/card"
import { FileText, CheckCircle, AlertTriangle, Scale } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nutzungsbedingungen - Graffiti Schrift Generator | AGB & Rechtliches",
  description:
    "Nutzungsbedingungen für den Graffiti Schrift Generator. Erfahre mehr über die Nutzungsrechte, Lizenzen und rechtlichen Bestimmungen.",
  keywords: ["nutzungsbedingungen", "agb", "terms of service", "lizenz", "nutzungsrechte", "rechtliches"],
  openGraph: {
    title: "Nutzungsbedingungen - Graffiti Schrift Generator",
    description: "Nutzungsbedingungen und rechtliche Bestimmungen für den Graffiti Schrift Generator.",
    url: "https://graffitischriftgenerator.pro/nutzungsbedingungen",
  },
}

export default function NutzungsbedingungenPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Nutzungsbedingungen - Graffiti Schrift Generator",
    description: "Nutzungsbedingungen und rechtliche Bestimmungen",
    url: "https://graffitischriftgenerator.pro/nutzungsbedingungen",
    dateModified: "2025-07-31",
    publisher: {
      "@type": "Organization",
      name: "Graffiti Schrift Generator",
      url: "https://graffitischriftgenerator.pro",
    },
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Nutzungsbedingungen
            </h1>
            <p className="text-lg text-gray-300">Letzte Aktualisierung: 31. Juli 2025</p>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">Willkommen beim Graffiti Schrift Generator</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Diese Nutzungsbedingungen regeln die Nutzung unserer Website und unseres kostenlosen Graffiti Generators.
              Durch die Nutzung unserer Dienste stimmen Sie diesen Bedingungen zu.
            </p>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold">
                ✅ Kostenlos • ✅ Keine Registrierung • ✅ Kommerzielle Nutzung erlaubt
              </p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">1. Geltungsbereich und Anbieter</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Anbieter:</strong> Graffiti Schrift Generator
              </p>
              <p>
                <strong className="text-white">Website:</strong> https://graffitischriftgenerator.pro
              </p>
              <p>
                <strong className="text-white">Kontakt:</strong> info@graffitischriftgenerator.pro
              </p>
              <p>Diese Nutzungsbedingungen gelten für alle Besucher und Nutzer unserer Website und unserer Dienste.</p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">2. Nutzung des Graffiti Generators</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.1 Kostenlose Nutzung</h3>
                <p className="text-gray-300">
                  Unser Graffiti Generator ist vollständig kostenlos nutzbar. Es fallen keine Gebühren für die Nutzung,
                  das Erstellen oder den Download von Designs an.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.2 Keine Registrierung erforderlich</h3>
                <p className="text-gray-300">
                  Sie können unseren Service ohne Registrierung oder Anmeldung nutzen. Ihre Daten werden lokal in Ihrem
                  Browser verarbeitet.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.3 Technische Voraussetzungen</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Moderner Webbrowser mit JavaScript-Unterstützung</li>
                  <li>Internetverbindung zum Laden der Website</li>
                  <li>Canvas-API Unterstützung für die Grafikgenerierung</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Scale className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">3. Rechte und Lizenzen</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">3.1 Ihre Rechte an erstellten Designs</h3>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                  <p className="text-green-400 font-semibold mb-2">✅ Vollständige Nutzungsrechte:</p>
                  <p className="text-gray-300">
                    Sie erhalten vollständige Rechte an allen mit unserem Generator erstellten Designs und können diese
                    frei verwenden.
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>
                    <strong>Private Nutzung:</strong> Unbegrenzte Nutzung für persönliche Projekte
                  </li>
                  <li>
                    <strong>Kommerzielle Nutzung:</strong> Erlaubt für Geschäftszwecke, Werbung, Verkauf
                  </li>
                  <li>
                    <strong>Bearbeitung:</strong> Sie dürfen die Designs weiter bearbeiten und anpassen
                  </li>
                  <li>
                    <strong>Weiterverteilung:</strong> Erlaubt, auch als Teil anderer Werke
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">3.2 Keine Namensnennung erforderlich</h3>
                <p className="text-gray-300">
                  Sie müssen uns nicht als Quelle nennen, wenn Sie unsere generierten Designs verwenden. Eine
                  Namensnennung ist freiwillig und wird geschätzt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">3.3 Unsere Rechte</h3>
                <p className="text-gray-300">
                  Wir behalten uns alle Rechte an unserer Website, dem Generator-Code und den bereitgestellten
                  Schriftstilen vor. Sie dürfen unseren Service nicht kopieren oder nachahmen.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">4. Verbotene Nutzung</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">Die folgenden Nutzungsarten sind untersagt:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">❌ Illegale Inhalte</h4>
                  <p className="text-gray-300 text-sm">
                    Erstellung von Designs mit illegalen, beleidigenden oder diskriminierenden Inhalten
                  </p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">❌ Markenrechtsverletzung</h4>
                  <p className="text-gray-300 text-sm">
                    Verwendung geschützter Marken oder urheberrechtlich geschützter Inhalte ohne Erlaubnis
                  </p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">❌ Missbrauch</h4>
                  <p className="text-gray-300 text-sm">
                    Übermäßige Nutzung, die unsere Server belastet oder andere Nutzer beeinträchtigt
                  </p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">❌ Reverse Engineering</h4>
                  <p className="text-gray-300 text-sm">Versuche, unseren Code zu kopieren oder nachzubauen</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">5. Verfügbarkeit und Haftung</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">5.1 Verfügbarkeit</h3>
                <p className="text-gray-300">
                  Wir bemühen uns um eine hohe Verfügbarkeit unseres Services, können jedoch keine 100%ige Verfügbarkeit
                  garantieren. Wartungsarbeiten werden nach Möglichkeit angekündigt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">5.2 Haftungsausschluss</h3>
                <p className="text-gray-300 mb-3">
                  Unser Service wird "wie besehen" bereitgestellt. Wir übernehmen keine Haftung für:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Datenverlust oder technische Probleme</li>
                  <li>Schäden durch die Nutzung erstellter Designs</li>
                  <li>Rechtsverletzungen durch Nutzer-generierte Inhalte</li>
                  <li>Ausfälle oder Unterbrechungen des Services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">5.3 Nutzerverantwortung</h3>
                <p className="text-gray-300">
                  Sie sind selbst verantwortlich für die Inhalte, die Sie mit unserem Generator erstellen, und für die
                  rechtmäßige Nutzung der erstellten Designs.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">6. Änderungen und Kündigung</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">6.1 Änderungen der Bedingungen</h3>
                <p>
                  Wir behalten uns vor, diese Nutzungsbedingungen zu ändern. Wesentliche Änderungen werden auf der
                  Website bekannt gegeben.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">6.2 Beendigung der Nutzung</h3>
                <p>
                  Sie können die Nutzung jederzeit beenden. Wir können Nutzern bei Verstößen gegen diese Bedingungen den
                  Zugang verwehren.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">7. Anwendbares Recht</h2>
            <p className="text-gray-300">
              Diese Nutzungsbedingungen unterliegen deutschem Recht. Gerichtsstand ist Deutschland. Sollten einzelne
              Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Fragen zu den Nutzungsbedingungen?</h2>
            <p className="text-black mb-6">
              Bei Fragen zu unseren Nutzungsbedingungen oder zur Nutzung unseres Services kontaktieren Sie uns gerne.
            </p>
            <a
              href="mailto:info@graffitischriftgenerator.pro?subject=Frage%20zu%20Nutzungsbedingungen"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Rechtliche Frage stellen
            </a>
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
