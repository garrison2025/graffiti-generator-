"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Palette } from "lucide-react"
import { BACKGROUND_OPTIONS } from "@/lib/background-utils"

interface BackgroundSelectorProps {
  selectedBackground: string
  onBackgroundChange: (backgroundId: string) => void
  customColor: string
  onCustomColorChange: (color: string) => void
  isVisible: boolean
  onToggle: () => void
}

export function BackgroundSelector({
  selectedBackground,
  onBackgroundChange,
  customColor,
  onCustomColorChange,
  isVisible,
  onToggle,
}: BackgroundSelectorProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-lg font-semibold mb-4">
        <span className="flex items-center">
          <ImageIcon className="mr-2 h-5 w-5" />
          Graffiti Wandhintergrund
        </span>
        <span className={`transform transition-transform ${isVisible ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isVisible && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">Wähle einen authentischen Hintergrund:</p>

          {/* Custom Color Option */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Eigene Farbe</label>
            <div className="flex gap-2">
              <Button
                onClick={() => onBackgroundChange("custom")}
                variant="outline"
                className={`px-3 py-1 text-sm ${
                  selectedBackground === "custom" ? "border-yellow-400 bg-yellow-400/10" : "border-gray-600"
                }`}
              >
                <Palette className="mr-2 h-4 w-4" />
                Eigene Farbe
              </Button>
              <input
                type="color"
                value={customColor}
                onChange={(e) => onCustomColorChange(e.target.value)}
                className="h-8 w-16 rounded border border-gray-600"
              />
            </div>
          </div>

          {/* Background Options Grid - Optimized Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BACKGROUND_OPTIONS.map((bg) => (
              <Button
                key={bg.id}
                onClick={() => onBackgroundChange(bg.id)}
                variant="outline"
                className={`h-auto p-2 border-2 text-left transition-all ${
                  selectedBackground === bg.id
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <div className="w-full text-center">
                  <div className="text-lg mb-1">{bg.preview}</div>
                  <div className="text-xs font-semibold text-white truncate">{bg.name}</div>
                  <div className="text-xs text-yellow-400 mt-1">{bg.category}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="text-xs text-gray-500 mt-4">
            💡 Tipp: Verschiedene Hintergründe verleihen deinem Graffiti einen authentischen Street-Art Look!
          </div>
        </div>
      )}
    </Card>
  )
}
