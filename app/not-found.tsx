"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, Search, Type } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Graffiti Style */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
              404
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-2">Seite nicht gefunden</div>
            <p className="text-gray-400 text-lg">Ups! Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Type className="h-12 w-12 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Was kannst du stattdessen tun?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Zurück zur Startseite</span>
                </div>
                <div className="flex items-center">
                  <Type className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Graffiti Generator nutzen</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Unsere Seiten durchsuchen</span>
                </div>
                <div className="flex items-center">
                  <ArrowLeft className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Zurück zur vorherigen Seite</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                <Home className="mr-2 h-4 w-4" />
                Zur Startseite
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-600 hover:border-yellow-400 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500">Fehlercode: 404 | Seite nicht gefunden</div>
        </div>
      </div>
    </div>
  )
}
