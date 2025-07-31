"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Download } from "lucide-react"
import type { ExportFormat, ExportOptions } from "@/lib/export-utils"

interface ExportOptionsProps {
  onExport: (filename: string, options: ExportOptions) => Promise<void>
  isVisible: boolean
  onToggle: () => void
  isExporting: boolean
}

export function ExportOptionsComponent({ onExport, isVisible, onToggle, isExporting }: ExportOptionsProps) {
  const [format, setFormat] = useState<ExportFormat>("png")
  const [quality, setQuality] = useState([90])
  const [customSize, setCustomSize] = useState(false)
  const [width, setWidth] = useState([800])
  const [height, setHeight] = useState([300])
  const [exportBg, setExportBg] = useState("#FFFFFF")

  const formatOptions = [
    { value: "png" as ExportFormat, label: "PNG", description: "Beste Qualität, transparenter Hintergrund" },
    { value: "jpg" as ExportFormat, label: "JPG", description: "Kleinere Dateigröße, kein transparenter Hintergrund" },
    { value: "webp" as ExportFormat, label: "WebP", description: "Moderne Format, gute Kompression" },
    { value: "svg" as ExportFormat, label: "SVG", description: "Vektorgrafik, unendlich skalierbar" },
  ]

  const handleExport = async () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
    const filename = `graffiti-${timestamp}.${format}`

    const options: ExportOptions = {
      format,
      quality: quality[0] / 100,
      ...(customSize && { width: width[0], height: height[0] }),
      ...(format === "jpg" && { backgroundColor: exportBg }),
    }

    await onExport(filename, options)
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-lg font-semibold mb-4">
        <span className="flex items-center">
          <Download className="mr-2 h-5 w-5" />
          Export Optionen
        </span>
        <span className={`transform transition-transform ${isVisible ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isVisible && (
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Dateiformat</label>
            <div className="grid grid-cols-2 gap-2">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormat(option.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    format === option.value
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Settings */}
          {(format === "jpg" || format === "webp") && (
            <div>
              <label className="block text-sm font-medium mb-2">Qualität: {quality[0]}%</label>
              <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="w-full" />
            </div>
          )}

          {/* Custom Size */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                id="customSize"
                checked={customSize}
                onChange={(e) => setCustomSize(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="customSize" className="text-sm font-medium">
                Benutzerdefinierte Größe
              </label>
            </div>

            {customSize && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Breite: {width[0]}px</label>
                  <Slider value={width} onValueChange={setWidth} max={2000} min={200} step={50} className="w-full" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Höhe: {height[0]}px</label>
                  <Slider value={height} onValueChange={setHeight} max={1000} min={100} step={25} className="w-full" />
                </div>
              </div>
            )}
          </div>

          {/* Background for JPG */}
          {format === "jpg" && (
            <div>
              <label className="block text-sm font-medium mb-2">Hintergrundfarbe (für JPG)</label>
              <input
                type="color"
                value={exportBg}
                onChange={(e) => setExportBg(e.target.value)}
                className="w-full h-10 rounded border border-gray-600"
              />
            </div>
          )}

          {/* Export Button */}
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Exportiere...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Als {format.toUpperCase()} herunterladen
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
