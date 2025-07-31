import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <Card className="bg-gray-800 border-gray-700 p-8">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>

                <h3 className="text-lg font-semibold mb-2">Allgemeine Hinweise</h3>
                <p className="mb-4">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können.
                </p>

                <h3 className="text-lg font-semibold mb-2">Datenerfassung auf dieser Website</h3>
                <p className="mb-4">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                  <br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Hosting</h2>
                <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>

                <h3 className="text-lg font-semibold mb-2">Vercel</h3>
                <p className="mb-4">
                  Diese Website wird auf Servern von Vercel Inc. gehostet. Anbieter ist die Vercel Inc., 340 S Lemon Ave
                  #4133, Walnut, CA 91789, USA (nachfolgend „Vercel").
                </p>
                <p className="mb-4">
                  Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen.
                  Details entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" className="text-yellow-400 hover:text-yellow-300">
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

                <h3 className="text-lg font-semibold mb-2">Datenschutz</h3>
                <p className="mb-4">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzbestimmungen sowie
                  dieser Datenschutzerklärung.
                </p>

                <h3 className="text-lg font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  <br />
                  [Ihre Kontaktdaten - siehe Impressum]
                </p>

                <h3 className="text-lg font-semibold mb-2">Speicherdauer</h3>
                <p className="mb-4">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                  Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Datenerfassung auf dieser Website</h2>

                <h3 className="text-lg font-semibold mb-2">Server-Log-Dateien</h3>
                <p className="mb-4">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">Graffiti Generator</h3>
                <p className="mb-4">
                  Unser Graffiti Generator funktioniert vollständig in Ihrem Browser. Die von Ihnen eingegebenen Texte
                  und Einstellungen werden nicht an unsere Server übertragen oder gespeichert. Alle Verarbeitung erfolgt
                  lokal auf Ihrem Gerät.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Ihre Rechte</h2>
                <p className="mb-4">
                  Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung,
                  Sperrung oder Löschung dieser Daten zu verlangen.
                </p>
              </section>
            </div>
          </Card>

          <div className="mt-8 text-center">
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
