import { Card } from "@/components/ui/card"
import { Shield, Eye, Cookie, Database } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzrichtlinie - Graffiti Schrift Generator | DSGVO konform",
  description:
    "Datenschutzrichtlinie des Graffiti Schrift Generators. Erfahre, wie wir deine Daten schützen und verarbeiten. DSGVO-konform und transparent.",
  keywords: ["datenschutz", "dsgvo", "privacy policy", "datenschutzrichtlinie", "cookies", "datenverarbeitung"],
  openGraph: {
    title: "Datenschutzrichtlinie - Graffiti Schrift Generator",
    description: "Unsere Datenschutzrichtlinie - transparent und DSGVO-konform.",
    url: "https://graffitischriftgenerator.pro/datenschutzrichtlinie",
  },
}

export default function DatenschutzrichtliniePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Datenschutzrichtlinie - Graffiti Schrift Generator",
    description: "Datenschutzrichtlinie und Informationen zur Datenverarbeitung",
    url: "https://graffitischriftgenerator.pro/datenschutzrichtlinie",
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
              Datenschutzrichtlinie
            </h1>
            <p className="text-lg text-gray-300">Letzte Aktualisierung: 31. Juli 2025</p>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">Datenschutz auf einen Blick</h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Diese Datenschutzrichtlinie erklärt, welche
              Daten wir sammeln, wie wir sie verwenden und welche Rechte Sie haben.
            </p>
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
              <p className="text-yellow-400 font-semibold">
                ✅ Unser Graffiti Generator funktioniert vollständig in Ihrem Browser - Ihre Texte und Designs werden
                NICHT an unsere Server übertragen!
              </p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">1. Verantwortliche Stelle</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Verantwortlich für die Datenverarbeitung:</strong>
              </p>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>Graffiti Schrift Generator</p>
                <p>E-Mail: info@graffitischriftgenerator.pro</p>
                <p>Website: https://graffitischriftgenerator.pro</p>
              </div>
              <p>
                Bei Fragen zum Datenschutz können Sie uns jederzeit unter der oben genannten E-Mail-Adresse
                kontaktieren.
              </p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">2. Welche Daten sammeln wir?</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.1 Automatisch erfasste Daten</h3>
                <p className="text-gray-300 mb-3">
                  Beim Besuch unserer Website werden automatisch folgende Daten erfasst:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>IP-Adresse (anonymisiert)</li>
                  <li>Browsertyp und -version</li>
                  <li>Betriebssystem</li>
                  <li>Referrer-URL (vorherige Website)</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Aufgerufene Seiten</li>
                </ul>
                <p className="text-gray-300 mt-3">
                  <strong>Rechtsgrundlage:</strong> Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) zur
                  Bereitstellung und Verbesserung unserer Website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.2 Graffiti Generator Daten</h3>
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-semibold mb-2">✅ Datenschutzfreundlich:</p>
                  <p className="text-gray-300">
                    Ihre eingegebenen Texte und erstellten Designs werden ausschließlich lokal in Ihrem Browser
                    verarbeitet. Diese Daten werden NICHT an unsere Server übertragen oder gespeichert.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">2.3 Kontaktdaten</h3>
                <p className="text-gray-300">
                  Wenn Sie uns per E-Mail kontaktieren, speichern wir Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht
                  zur Bearbeitung Ihrer Anfrage.
                </p>
                <p className="text-gray-300 mt-2">
                  <strong>Rechtsgrundlage:</strong> Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) zur Beantwortung
                  Ihrer Anfrage.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Cookie className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">3. Cookies und Tracking</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">3.1 Technisch notwendige Cookies</h3>
                <p className="text-gray-300">
                  Wir verwenden nur technisch notwendige Cookies, die für das Funktionieren der Website erforderlich
                  sind. Diese Cookies:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4 mt-3">
                  <li>Speichern Ihre Spracheinstellungen</li>
                  <li>Merken sich Ihre Generator-Einstellungen während der Sitzung</li>
                  <li>Gewährleisten die Sicherheit der Website</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">3.2 Analytics (optional)</h3>
                <p className="text-gray-300">
                  Wir verwenden anonymisierte Analytics, um die Nutzung unserer Website zu verstehen und zu verbessern.
                  Diese Daten sind nicht personenbezogen und können nicht zu Ihnen zurückverfolgt werden.
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-2">ℹ️ Keine Werbe-Cookies:</p>
                <p className="text-gray-300">
                  Wir verwenden keine Werbe-Cookies oder Tracking-Pixel von Drittanbietern für Werbezwecke.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">4. Hosting und Drittanbieter</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">4.1 Vercel (Hosting)</h3>
                <p className="text-gray-300 mb-3">Unsere Website wird auf Servern von Vercel Inc. gehostet:</p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">
                    Vercel Inc.
                    <br />
                    340 S Lemon Ave #4133
                    <br />
                    Walnut, CA 91789, USA
                  </p>
                </div>
                <p className="text-gray-300 mt-3">
                  Vercel erfasst Server-Logs mit IP-Adressen zur technischen Bereitstellung der Website.
                  Datenschutzerklärung:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    className="text-yellow-400 hover:text-yellow-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold">5. Ihre Rechte</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Auskunftsrecht (Art. 15 DSGVO)</h4>
                  <p className="text-gray-300 text-sm">
                    Sie können Auskunft über die von uns verarbeiteten Daten verlangen.
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Berichtigungsrecht (Art. 16 DSGVO)</h4>
                  <p className="text-gray-300 text-sm">Sie können die Berichtigung unrichtiger Daten verlangen.</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Löschungsrecht (Art. 17 DSGVO)</h4>
                  <p className="text-gray-300 text-sm">
                    Sie können die Löschung Ihrer Daten unter bestimmten Voraussetzungen verlangen.
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Widerspruchsrecht (Art. 21 DSGVO)</h4>
                  <p className="text-gray-300 text-sm">Sie können der Verarbeitung Ihrer Daten widersprechen.</p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:{" "}
                <a href="mailto:info@graffitischriftgenerator.pro" className="text-yellow-400 hover:text-yellow-300">
                  info@graffitischriftgenerator.pro
                </a>
              </p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">6. Datensicherheit</h2>
            <p className="text-gray-300 mb-4">
              Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer Daten:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
              <li>Regelmäßige Sicherheitsupdates</li>
              <li>Minimierung der Datensammlung</li>
              <li>Lokale Verarbeitung im Browser (Generator-Daten)</li>
              <li>Sichere Server-Infrastruktur</li>
            </ul>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">7. Speicherdauer</h2>
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Server-Logs</h4>
                <p className="text-sm">Werden nach 30 Tagen automatisch gelöscht</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">E-Mail-Korrespondenz</h4>
                <p className="text-sm">Wird nach 2 Jahren gelöscht, sofern nicht länger erforderlich</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Generator-Daten</h4>
                <p className="text-sm">Werden nicht gespeichert - nur lokal in Ihrem Browser verarbeitet</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">8. Änderungen der Datenschutzrichtlinie</h2>
            <p className="text-gray-300">
              Wir behalten uns vor, diese Datenschutzrichtlinie zu aktualisieren, um sie an geänderte Rechtslage oder
              bei Änderungen unserer Dienste anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.
            </p>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Fragen zum Datenschutz?</h2>
            <p className="text-black mb-6">
              Bei Fragen zu unserer Datenschutzrichtlinie oder zur Verarbeitung Ihrer Daten kontaktieren Sie uns gerne.
            </p>
            <a
              href="mailto:info@graffitischriftgenerator.pro?subject=Datenschutz%20Anfrage"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Datenschutz-Anfrage senden
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
