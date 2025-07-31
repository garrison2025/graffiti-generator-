"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Type,
  Sparkles,
  Palette,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Undo,
  Redo,
  RotateCcw,
  Copy,
  Settings,
} from "lucide-react"

interface EnhancedMobileControlsProps {
  // Text controls
  text: string
  setText: (text: string) => void

  // Font controls
  selectedFont: string
  setSelectedFont: (font: string) => void
  filteredFonts: any[]
  fontCategory: string
  setFontCategory: (category: string) => void

  // Color controls
  textColor: string
  setTextColor: (color: string) => void
  strokeColor: string
  setStrokeColor: (color: string) => void
  strokeWidth: number[]
  setStrokeWidth: (width: number[]) => void

  // Size and transform
  textSize: number[]
  setTextSize: (size: number[]) => void
  rotation: number[]
  setRotation: (rotation: number[]) => void
  letterSpacing: number[]
  setLetterSpacing: (spacing: number[]) => void

  // Background and effects
  selectedBackground: string
  setSelectedBackground: (bg: string) => void
  selectedEffect: string
  setSelectedEffect: (effect: string) => void

  // Actions
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onReset: () => void
  onCopySettings: () => void

  // State
  isVisible: boolean
  onToggle: () => void
}

const PRESET_COLORS = [
  "#FF6B35",
  "#F7931E",
  "#FFD23F",
  "#06FFA5",
  "#118AB2",
  "#073B4C",
  "#FF006E",
  "#8338EC",
  "#3A86FF",
  "#06D6A0",
  "#FFB3C6",
  "#FB8500",
]

export function EnhancedMobileControls({
  text,
  setText,
  selectedFont,
  setSelectedFont,
  filteredFonts,
  fontCategory,
  setFontCategory,
  textColor,
  setTextColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  textSize,
  setTextSize,
  rotation,
  setRotation,
  letterSpacing,
  setLetterSpacing,
  selectedBackground,
  setSelectedBackground,
  selectedEffect,
  setSelectedEffect,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onCopySettings,
  isVisible,
  onToggle,
}: EnhancedMobileControlsProps) {
  const [activeTab, setActiveTab] = useState<"text" | "style" | "colors" | "effects" | "advanced">("text")
  const [recentColors, setRecentColors] = useState<string[]>([])

  const addToRecentColors = useCallback((color: string) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color)
      return [color, ...filtered].slice(0, 6)
    })
  }, [])

  const handleColorChange = useCallback(
    (color: string, type: "text" | "stroke") => {
      addToRecentColors(color)
      if (type === "text") {
        setTextColor(color)
      } else {
        setStrokeColor(color)
      }
    },
    [addToRecentColors, setTextColor, setStrokeColor],
  )

  const MobileTabButton = ({ tab, label, icon: Icon, isActive, badge }: any) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-all relative ${
        isActive
          ? "text-pink-400 border-b-2 border-pink-400 bg-gray-800/50"
          : "text-gray-400 hover:text-gray-300 active:bg-gray-700"
      }`}
      aria-label={`${label} Einstellungen`}
    >
      <Icon className="h-5 w-5 mb-1" />
      {label}
      {badge && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )

  return (
    <>
      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <Button
          onClick={onToggle}
          className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white shadow-lg"
          aria-expanded={isVisible}
          aria-controls="mobile-controls"
        >
          {isVisible ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Einstellungen ausblenden
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Einstellungen anzeigen
            </>
          )}
        </Button>
      </div>

      {/* Controls Panel */}
      {isVisible && (
        <Card id="mobile-controls" className="bg-gray-800 border-gray-700 overflow-hidden">
          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-750">
            <div className="flex gap-2">
              <Button
                onClick={onUndo}
                disabled={!canUndo}
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-pink-400 bg-transparent disabled:opacity-50"
                aria-label="Rückgängig machen"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                onClick={onRedo}
                disabled={!canRedo}
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-pink-400 bg-transparent disabled:opacity-50"
                aria-label="Wiederholen"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={onCopySettings}
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-yellow-400 bg-transparent"
                aria-label="Einstellungen kopieren"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={onReset}
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-red-400 bg-transparent"
                aria-label="Alle Einstellungen zurücksetzen"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <MobileTabButton tab="text" label="Text" icon={Type} isActive={activeTab === "text"} />
            <MobileTabButton
              tab="style"
              label="Style"
              icon={Sparkles}
              isActive={activeTab === "style"}
              badge={selectedFont !== "wildstyle" ? "!" : null}
            />
            <MobileTabButton tab="colors" label="Farben" icon={Palette} isActive={activeTab === "colors"} />
            <MobileTabButton
              tab="effects"
              label="Effekte"
              icon={ImageIcon}
              isActive={activeTab === "effects"}
              badge={selectedBackground !== "none" || selectedEffect !== "none" ? "!" : null}
            />
            <MobileTabButton tab="advanced" label="Erweitert" icon={Settings} isActive={activeTab === "advanced"} />
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "text" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="text-input">
                    Dein Text
                  </label>
                  <Input
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase())}
                    placeholder="DEIN GRAFFITI TEXT"
                    className="bg-gray-700 border-gray-600 text-white text-lg font-bold"
                    maxLength={20}
                    aria-describedby="text-help"
                  />
                  <p id="text-help" className="text-xs text-gray-400 mt-2">
                    💡 Tipp: Kurze Texte (3-8 Buchstaben) sehen am besten aus
                  </p>
                  <div className="text-xs text-gray-500 mt-1">Zeichen: {text.length}/20</div>
                </div>

                {/* Text Size Quick Controls */}
                <div>
                  <label className="block text-sm font-medium mb-2">Textgröße: {textSize[0]}%</label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      onClick={() => setTextSize([50])}
                      size="sm"
                      variant={textSize[0] === 50 ? "default" : "outline"}
                      className="flex-1"
                    >
                      Klein
                    </Button>
                    <Button
                      onClick={() => setTextSize([100])}
                      size="sm"
                      variant={textSize[0] === 100 ? "default" : "outline"}
                      className="flex-1"
                    >
                      Normal
                    </Button>
                    <Button
                      onClick={() => setTextSize([150])}
                      size="sm"
                      variant={textSize[0] === 150 ? "default" : "outline"}
                      className="flex-1"
                    >
                      Groß
                    </Button>
                  </div>
                  <Slider
                    value={textSize}
                    onValueChange={setTextSize}
                    max={200}
                    min={50}
                    step={5}
                    className="w-full"
                    aria-label="Textgröße"
                  />
                </div>
              </div>
            )}

            {activeTab === "style" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">Graffiti-Stil wählen</label>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {["All", "Classic", "Street", "Effects", "3D", "Digital"].map((category) => (
                      <button
                        key={category}
                        onClick={() => setFontCategory(category)}
                        className={`px-2 py-1 rounded-full text-xs transition-all ${
                          fontCategory === category
                            ? "bg-pink-500 text-white"
                            : "bg-gray-700 hover:bg-gray-600 active:bg-gray-600"
                        }`}
                        aria-pressed={fontCategory === category}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {filteredFonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`p-2 rounded-lg border-2 transition-all active:scale-95 ${
                          selectedFont === font.id
                            ? "border-pink-500 bg-pink-500/10"
                            : "border-gray-600 hover:border-gray-500 active:border-gray-400"
                        }`}
                        aria-pressed={selectedFont === font.id}
                        aria-label={`${font.name} Schriftstil auswählen`}
                      >
                        <div className="text-xs font-bold">{font.preview}</div>
                        <div className="text-xs text-gray-400 mt-1 truncate">{font.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "colors" && (
              <div className="space-y-4">
                {/* Recent Colors */}
                {recentColors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Zuletzt verwendet</label>
                    <div className="flex gap-2 mb-3">
                      {recentColors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setTextColor(color)}
                          className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                          style={{ backgroundColor: color }}
                          aria-label={`Zuletzt verwendete Farbe ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium mb-2">Textfarbe</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_COLORS.slice(0, 8).map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color, "text")}
                        className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${
                          textColor === color ? "border-white" : "border-gray-600 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Textfarbe ${color} auswählen`}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleColorChange(e.target.value, "text")}
                    className="w-full h-10 rounded border border-gray-600"
                    aria-label="Benutzerdefinierte Textfarbe"
                  />
                </div>

                {/* Stroke */}
                <div>
                  <label className="block text-sm font-medium mb-2">Umrandung</label>
                  <div className="space-y-2">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => handleColorChange(e.target.value, "stroke")}
                      className="w-full h-8 rounded border border-gray-600"
                      aria-label="Umrandungsfarbe"
                    />
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Dicke: {strokeWidth[0]}px</label>
                      <Slider
                        value={strokeWidth}
                        onValueChange={setStrokeWidth}
                        max={10}
                        min={0}
                        step={1}
                        className="w-full"
                        aria-label="Umrandungsdicke"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "effects" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hintergrund</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button
                      onClick={() => setSelectedBackground("none")}
                      size="sm"
                      variant={selectedBackground === "none" ? "default" : "outline"}
                      className="text-xs"
                    >
                      🔳 Transparent
                    </Button>
                    <Button
                      onClick={() => setSelectedBackground("brick-wall")}
                      size="sm"
                      variant={selectedBackground === "brick-wall" ? "default" : "outline"}
                      className="text-xs"
                    >
                      🧱 Ziegel
                    </Button>
                    <Button
                      onClick={() => setSelectedBackground("concrete")}
                      size="sm"
                      variant={selectedBackground === "concrete" ? "default" : "outline"}
                      className="text-xs"
                    >
                      🏢 Beton
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Spezialeffekte</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["none", "glow", "double-shadow", "emboss"].map((effect) => (
                      <Button
                        key={effect}
                        onClick={() => setSelectedEffect(effect)}
                        size="sm"
                        variant={selectedEffect === effect ? "default" : "outline"}
                        className="text-left justify-start"
                      >
                        {effect === "none" && "Keine Effekte"}
                        {effect === "glow" && "✨ Leuchteffekt"}
                        {effect === "double-shadow" && "👥 Doppelschatten"}
                        {effect === "emboss" && "🔺 Prägung"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="space-y-4">
                {/* Rotation */}
                <div>
                  <label className="block text-sm font-medium mb-2">Rotation: {rotation[0]}°</label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      onClick={() => setRotation([-15])}
                      size="sm"
                      variant={rotation[0] === -15 ? "default" : "outline"}
                      className="flex-1 text-xs"
                    >
                      ↺ Links
                    </Button>
                    <Button
                      onClick={() => setRotation([0])}
                      size="sm"
                      variant={rotation[0] === 0 ? "default" : "outline"}
                      className="flex-1 text-xs"
                    >
                      ↕ Gerade
                    </Button>
                    <Button
                      onClick={() => setRotation([15])}
                      size="sm"
                      variant={rotation[0] === 15 ? "default" : "outline"}
                      className="flex-1 text-xs"
                    >
                      ↻ Rechts
                    </Button>
                  </div>
                  <Slider
                    value={rotation}
                    onValueChange={setRotation}
                    max={45}
                    min={-45}
                    step={1}
                    className="w-full"
                    aria-label="Textrotation"
                  />
                </div>

                {/* Letter Spacing */}
                <div>
                  <label className="block text-sm font-medium mb-2">Buchstabenabstand: {letterSpacing[0]}px</label>
                  <Slider
                    value={letterSpacing}
                    onValueChange={setLetterSpacing}
                    max={20}
                    min={-10}
                    step={1}
                    className="w-full"
                    aria-label="Buchstabenabstand"
                  />
                </div>

                {/* Performance Info */}
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">
                    <div className="font-semibold mb-1">Performance-Tipp:</div>
                    <div>Weniger Effekte = schnellere Vorschau</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  )
}
