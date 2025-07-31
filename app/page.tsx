"use client"

import { useCallback, useEffect, useRef, useState, useMemo, lazy, Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSpinner } from "@/components/loading-spinner"
import { MobileNav } from "@/components/mobile-nav"
import { BrandLogo } from "@/components/brand-logo"
import { useHistory } from "@/hooks/use-history"
import { ExportManager, type ExportOptions } from "@/lib/export-utils"
import { renderFontStyle } from "@/lib/font-utils"
import { renderBackground } from "@/lib/background-utils"
import { applyFontEffect, FONT_EFFECTS } from "@/lib/advanced-font-effects"
import { downloadImage } from "@/lib/download-utils"
import { shareDesign } from "@/lib/share-utils"
import { generateStructuredData } from "@/components/seo-optimized-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Download,
  Palette,
  Type,
  Layers,
  Share,
  Undo,
  Redo,
  Keyboard,
  HelpCircle,
  Sparkles,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

// Lazy load heavy components for better performance
const PresetTemplates = lazy(() =>
  import("@/components/preset-templates").then((m) => ({ default: m.PresetTemplates })),
)
const ExportOptionsComponent = lazy(() =>
  import("@/components/export-options").then((m) => ({ default: m.ExportOptionsComponent })),
)
const BackgroundSelector = lazy(() =>
  import("@/components/background-selector").then((m) => ({ default: m.BackgroundSelector })),
)

const GRAFFITI_FONTS = [
  { id: "wildstyle", name: "Wild Style", preview: "WILD", category: "Advanced" },
  { id: "bubble", name: "Bubble Letters", preview: "BUBBLE", category: "Classic" },
  { id: "block", name: "Block Style", preview: "BLOCK", category: "Classic" },
  { id: "tag", name: "Tag Style", preview: "TAG", category: "Basic" },
  { id: "throw-up", name: "Throw-up", preview: "THROW", category: "Street" },
  { id: "piece", name: "Piece Style", preview: "PIECE", category: "Advanced" },
  { id: "stencil", name: "Stencil", preview: "STENCIL", category: "Urban" },
  { id: "drip", name: "Drip Style", preview: "DRIP", category: "Effects" },
  { id: "chrome", name: "Chrome", preview: "CHROME", category: "3D" },
  { id: "fire", name: "Fire Style", preview: "FIRE", category: "Effects" },
  { id: "ice", name: "Ice Style", preview: "ICE", category: "Effects" },
  { id: "neon", name: "Neon", preview: "NEON", category: "Effects" },
  { id: "shadow", name: "Shadow", preview: "SHADOW", category: "3D" },
  { id: "outline", name: "Outline", preview: "OUTLINE", category: "Basic" },
  { id: "grunge", name: "Grunge", preview: "GRUNGE", category: "Texture" },
  { id: "electric", name: "Electric", preview: "ELECTRIC", category: "Effects" },
  { id: "metal", name: "Metal", preview: "METAL", category: "3D" },
  { id: "spray", name: "Spray Paint", preview: "SPRAY", category: "Street" },
  { id: "pixel", name: "Pixel Art", preview: "PIXEL", category: "Digital" },
  { id: "glitch", name: "Glitch", preview: "GLITCH", category: "Digital" },
  { id: "rainbow", name: "Rainbow", preview: "RAINBOW", category: "Effects" },
  { id: "frost", name: "Frost", preview: "FROST", category: "Effects" },
  { id: "lava", name: "Lava", preview: "LAVA", category: "Effects" },
  { id: "tribal", name: "Tribal", preview: "TRIBAL", category: "Artistic" },
  { id: "gothic", name: "Gothic", preview: "GOTHIC", category: "Artistic" },
]

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

export default function GraffitiGenerator() {
  const [text, setText] = useState("BRANS")
  const [selectedFont, setSelectedFont] = useState("wildstyle")
  const [textColor, setTextColor] = useState("#FF006E")
  const [backgroundColor, setBgColor] = useState("transparent")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState([2])
  const [showCustomization, setShowCustomization] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fontCategory, setFontCategory] = useState("All")
  const [textSize, setTextSize] = useState([100])
  const [rotation, setRotation] = useState([0])
  const [letterSpacing, setLetterSpacing] = useState([0])
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Mobile-specific states
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(false)
  const [activeTab, setActiveTab] = useState<"text" | "style" | "colors" | "effects">("text")

  // New features
  const [selectedBackground, setSelectedBackground] = useState("none")
  const [customBgColor, setCustomBgColor] = useState("#FFFFFF")
  const [selectedEffect, setSelectedEffect] = useState("none")
  const [showBackgrounds, setShowBackgrounds] = useState(false)
  const [showEffects, setShowEffects] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)

  // Performance optimization: Memoize filtered fonts
  const filteredFonts = useMemo(() => {
    return GRAFFITI_FONTS.filter((font) => fontCategory === "All" || font.category === fontCategory)
  }, [fontCategory])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // History management
  const initialHistoryState = {
    text: "BRANS",
    selectedFont: "wildstyle",
    textColor: "#FF006E",
    backgroundColor: "transparent",
    strokeColor: "#000000",
    strokeWidth: [2],
    textSize: [100],
    rotation: [0],
    letterSpacing: [0],
  }

  const { pushState, undo, redo, canUndo, canRedo } = useHistory(initialHistoryState)

  const checkCanvasSupport = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      setError("Canvas element not found")
      return false
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setError("Your browser doesn't support Canvas. Please use a modern browser like Chrome, Firefox, or Safari.")
      return false
    }

    return true
  }, [])

  // Optimized canvas rendering with debouncing
  const generateGraffiti = useCallback(async () => {
    if (!checkCanvasSupport()) return

    setIsLoading(true)
    setError(null)

    try {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")!

      // Responsive canvas sizing
      const maxWidth = isMobile ? 350 : 800
      const maxHeight = isMobile ? 200 : 300

      canvas.width = maxWidth
      canvas.height = maxHeight

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Render background
      if (selectedBackground === "custom") {
        renderBackground(ctx, "custom", canvas.width, canvas.height, customBgColor)
      } else if (selectedBackground !== "none") {
        renderBackground(ctx, selectedBackground, canvas.width, canvas.height)
      } else if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Save context for transformations
      ctx.save()

      // Apply rotation
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      ctx.translate(centerX, centerY)
      ctx.rotate((rotation[0] * Math.PI) / 180)
      ctx.translate(-centerX, -centerY)

      // Configure text style based on selected font
      const baseFontSize = (textSize[0] / 100) * (isMobile ? 80 : 120)
      const fontSize = Math.min(baseFontSize, ((canvas.width * 0.8) / text.length) * 1.2)

      // Apply letter spacing
      if (letterSpacing[0] !== 0) {
        ctx.letterSpacing = `${letterSpacing[0]}px`
      }

      const x = canvas.width / 2
      const y = canvas.height / 2

      // Render font-specific style
      renderFontStyle(ctx, selectedFont, text, x, y, fontSize, textColor, strokeColor, strokeWidth[0])

      // Apply additional effects
      if (selectedEffect !== "none") {
        applyFontEffect(ctx, selectedEffect, text, x, y, fontSize, textColor)
      }

      ctx.restore()
    } catch (err) {
      console.error("Generation failed:", err)
      setError("Error generating graffiti, please try again")
    } finally {
      setIsLoading(false)
    }
  }, [
    text,
    selectedFont,
    textColor,
    backgroundColor,
    strokeColor,
    strokeWidth,
    textSize,
    rotation,
    letterSpacing,
    selectedBackground,
    customBgColor,
    selectedEffect,
    checkCanvasSupport,
    isMobile,
  ])

  // Debounced generation for better performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateGraffiti()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [generateGraffiti])

  const applyTemplate = useCallback((template: any) => {
    setText(template.text)
    setSelectedFont(template.font)
    setTextColor(template.textColor)
    setBgColor(template.backgroundColor)
    setStrokeColor(template.strokeColor)
    setStrokeWidth([template.strokeWidth])
  }, [])

  const handleExport = useCallback(async (filename: string, options: ExportOptions) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsExporting(true)
    try {
      const exportManager = new ExportManager(canvas)
      await exportManager.downloadAs(filename, options)
    } catch (error) {
      console.error("Export failed:", error)
      setError("Export failed, please try again")
    } finally {
      setIsExporting(false)
    }
  }, [])

  const handleUndo = useCallback(() => {
    const prevState = undo()
    if (prevState) {
      setText(prevState.text)
      setSelectedFont(prevState.selectedFont)
      setTextColor(prevState.textColor)
      setBgColor(prevState.backgroundColor)
      setStrokeColor(prevState.strokeColor)
      setStrokeWidth(prevState.strokeWidth)
      setTextSize(prevState.textSize)
      setRotation(prevState.rotation)
      setLetterSpacing(prevState.letterSpacing)
    }
  }, [undo])

  const handleRedo = useCallback(() => {
    const nextState = redo()
    if (nextState) {
      setText(nextState.text)
      setSelectedFont(nextState.selectedFont)
      setTextColor(nextState.textColor)
      setBgColor(nextState.backgroundColor)
      setStrokeColor(nextState.strokeColor)
      setStrokeWidth(nextState.strokeWidth)
      setTextSize(nextState.textSize)
      setRotation(nextState.rotation)
      setLetterSpacing(nextState.letterSpacing)
    }
  }, [redo])

  // Keyboard shortcuts (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault()
            if (e.shiftKey) {
              handleRedo()
            } else {
              handleUndo()
            }
            break
          case "s":
            e.preventDefault()
            if (canvasRef.current) {
              downloadImage(canvasRef.current)
            }
            break
          case "/":
            e.preventDefault()
            setShowKeyboardHelp(true)
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleUndo, handleRedo, isMobile])

  // Add structured data to page
  useEffect(() => {
    const structuredData = generateStructuredData("home")
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Mobile Tab Component
  const MobileTabButton = ({ tab, label, icon: Icon, isActive }: any) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
        isActive ? "text-pink-400 border-b-2 border-pink-400 bg-gray-800/50" : "text-gray-400 hover:text-gray-300"
      }`}
    >
      <Icon className="h-5 w-5 mb-1" />
      {label}
    </button>
  )

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Optimized Header */}
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <BrandLogo size={isMobile ? "sm" : "md"} showText={!isMobile} />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link href="/ueber-uns" className="hover:text-yellow-400 transition-colors">
                  Über uns
                </Link>
                <Link href="/kontakt" className="hover:text-yellow-400 transition-colors">
                  Kontakt
                </Link>
              </nav>

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMobileControls(!showMobileControls)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {showMobileControls ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              )}

              {!isMobile && <MobileNav />}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-4 md:py-8">
          {/* SEO Optimized Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Dein Graffiti Generator ✨
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-gray-200">
              Erstelle authentische Street Art & Bubble Letters
            </h2>
            <p className="text-sm md:text-xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto px-2">
              🎨 Der führende <strong>kostenlose Graffiti Schrift Generator</strong> mit 25+ professionellen Stilen.
              Bubble Letters, Wildstyle, Chrome-Effekte und realistische Graffiti-Wall Hintergründe.
              <span className="hidden md:inline">
                <strong>Keine Anmeldung</strong> • <strong>Sofortiger Download</strong> •{" "}
                <strong>Mobile optimiert</strong>
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400 mb-6 md:mb-8 px-2">
              <span className="bg-gray-800 px-2 md:px-3 py-1 rounded-full">✅ 25+ Graffiti-Stile</span>
              <span className="bg-gray-800 px-2 md:px-3 py-1 rounded-full">✅ Graffiti Wall Hintergründe</span>
              <span className="bg-gray-800 px-2 md:px-3 py-1 rounded-full">✅ PNG/JPG/SVG Export</span>
              <span className="bg-gray-800 px-2 md:px-3 py-1 rounded-full">✅ Kommerzielle Nutzung</span>
            </div>
          </div>

          {/* Mobile Layout */}
          {isMobile ? (
            <div className="space-y-4">
              {/* Canvas Preview - Always Visible on Mobile */}
              <Card className="p-4 bg-gray-800 border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Layers className="mr-2 h-5 w-5" />
                    Live Vorschau
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => shareDesign(canvasRef.current!, text)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 hover:border-pink-400 bg-transparent"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => downloadImage(canvasRef.current!)}
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-2 flex items-center justify-center min-h-[200px] relative">
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-700/80 flex items-center justify-center rounded-lg">
                      <LoadingSpinner size="md" text="Generiere..." />
                    </div>
                  )}

                  {error && (
                    <div className="absolute inset-0 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-red-400 font-semibold mb-2 text-sm">Fehler</div>
                        <div className="text-xs text-gray-300 mb-4">{error}</div>
                        <Button
                          onClick={() => {
                            setError(null)
                            generateGraffiti()
                          }}
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Erneut versuchen
                        </Button>
                      </div>
                    </div>
                  )}

                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-gray-600 rounded"
                    style={{ backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor }}
                  />
                </div>
              </Card>

              {/* Mobile Controls Toggle */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowMobileControls(!showMobileControls)}
                  className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                >
                  {showMobileControls ? (
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

              {/* Mobile Controls */}
              {showMobileControls && (
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  {/* Mobile Tab Navigation */}
                  <div className="flex border-b border-gray-700">
                    <MobileTabButton tab="text" label="Text" icon={Type} isActive={activeTab === "text"} />
                    <MobileTabButton tab="style" label="Style" icon={Sparkles} isActive={activeTab === "style"} />
                    <MobileTabButton tab="colors" label="Farben" icon={Palette} isActive={activeTab === "colors"} />
                    <MobileTabButton
                      tab="effects"
                      label="Effekte"
                      icon={ImageIcon}
                      isActive={activeTab === "effects"}
                    />
                  </div>

                  {/* Mobile Tab Content */}
                  <div className="p-4">
                    {activeTab === "text" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Dein Text</label>
                          <Input
                            value={text}
                            onChange={(e) => setText(e.target.value.toUpperCase())}
                            placeholder="DEIN GRAFFITI TEXT"
                            className="bg-gray-700 border-gray-600 text-white text-lg font-bold"
                            maxLength={20}
                          />
                          <p className="text-xs text-gray-400 mt-2">
                            💡 Tipp: Kurze Texte (3-8 Buchstaben) sehen am besten aus
                          </p>
                        </div>

                        {/* Undo/Redo for Mobile */}
                        <div className="flex gap-2">
                          <Button
                            onClick={handleUndo}
                            disabled={!canUndo}
                            variant="outline"
                            className="flex-1 border-gray-600 hover:border-pink-400 bg-transparent"
                            size="sm"
                          >
                            <Undo className="mr-2 h-4 w-4" />
                            Rückgängig
                          </Button>
                          <Button
                            onClick={handleRedo}
                            disabled={!canRedo}
                            variant="outline"
                            className="flex-1 border-gray-600 hover:border-pink-400 bg-transparent"
                            size="sm"
                          >
                            <Redo className="mr-2 h-4 w-4" />
                            Wiederholen
                          </Button>
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
                                  fontCategory === category ? "bg-pink-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                                }`}
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
                                className={`p-2 rounded-lg border-2 transition-all ${
                                  selectedFont === font.id
                                    ? "border-pink-500 bg-pink-500/10"
                                    : "border-gray-600 hover:border-gray-500"
                                }`}
                              >
                                <div className="text-xs font-bold">{font.preview}</div>
                                <div className="text-xs text-gray-400 mt-1">{font.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Text Size */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Textgröße: {textSize[0]}%</label>
                          <Slider
                            value={textSize}
                            onValueChange={setTextSize}
                            max={200}
                            min={50}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === "colors" && (
                      <div className="space-y-4">
                        {/* Text Color */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Textfarbe</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {PRESET_COLORS.slice(0, 8).map((color) => (
                              <button
                                key={color}
                                onClick={() => setTextColor(color)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  textColor === color ? "border-white" : "border-gray-600"
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-full h-10 rounded border border-gray-600"
                          />
                        </div>

                        {/* Stroke */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Umrandung</label>
                          <div className="space-y-2">
                            <input
                              type="color"
                              value={strokeColor}
                              onChange={(e) => setStrokeColor(e.target.value)}
                              className="w-full h-8 rounded border border-gray-600"
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
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "effects" && (
                      <div className="space-y-4">
                        <Suspense fallback={<LoadingSpinner size="sm" text="Lade Hintergründe..." />}>
                          <BackgroundSelector
                            selectedBackground={selectedBackground}
                            onBackgroundChange={setSelectedBackground}
                            customColor={customBgColor}
                            onCustomColorChange={setCustomBgColor}
                            isVisible={true}
                            onToggle={() => {}}
                          />
                        </Suspense>

                        {/* Font Effects */}
                        <div>
                          <label className="block text-sm font-medium mb-3">Spezialeffekte</label>
                          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                            {FONT_EFFECTS.slice(0, 6).map((effect) => (
                              <button
                                key={effect.id}
                                onClick={() => setSelectedEffect(effect.id)}
                                className={`p-2 rounded-lg border-2 text-left transition-all ${
                                  selectedEffect === effect.id
                                    ? "border-pink-500 bg-pink-500/10"
                                    : "border-gray-600 hover:border-gray-500"
                                }`}
                              >
                                <div className="font-semibold text-white text-sm">{effect.name}</div>
                                <div className="text-xs text-gray-400">{effect.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            /* Desktop Layout */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="lg:col-span-1 space-y-6">
                {/* Text Input */}
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Type className="mr-2 h-5 w-5" />
                    Text eingeben
                  </h3>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase())}
                    placeholder="DEIN GRAFFITI TEXT"
                    className="bg-gray-700 border-gray-600 text-white text-lg font-bold"
                    maxLength={20}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    💡 Tipp: Kurze Texte (3-8 Buchstaben) sehen am besten aus
                  </p>
                </Card>

                {/* Preset Templates */}
                <Suspense fallback={<LoadingSpinner size="sm" text="Lade Templates..." />}>
                  <PresetTemplates
                    onApplyTemplate={applyTemplate}
                    isVisible={showTemplates}
                    onToggle={() => setShowTemplates(!showTemplates)}
                  />
                </Suspense>

                {/* Background Selector */}
                <Suspense fallback={<LoadingSpinner size="sm" text="Lade Hintergründe..." />}>
                  <BackgroundSelector
                    selectedBackground={selectedBackground}
                    onBackgroundChange={setSelectedBackground}
                    customColor={customBgColor}
                    onCustomColorChange={setCustomBgColor}
                    isVisible={showBackgrounds}
                    onToggle={() => setShowBackgrounds(!showBackgrounds)}
                  />
                </Suspense>

                {/* Font Selection */}
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Graffiti-Stil wählen</h3>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["All", "Classic", "Street", "Effects", "3D", "Digital", "Artistic"].map((category) => (
                      <button
                        key={category}
                        onClick={() => setFontCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          fontCategory === category ? "bg-pink-500 text-white" : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {filteredFonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedFont === font.id
                            ? "border-pink-500 bg-pink-500/10"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                      >
                        <div className="text-xs font-bold">{font.preview}</div>
                        <div className="text-xs text-gray-400 mt-1">{font.name}</div>
                        <div className="text-xs text-cyan-400">{font.category}</div>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Font Effects */}
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <button
                    onClick={() => setShowEffects(!showEffects)}
                    className="w-full flex items-center justify-between text-lg font-semibold mb-4"
                  >
                    <span className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Spezialeffekte
                    </span>
                    <span className={`transform transition-transform ${showEffects ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {showEffects && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-400 mb-4">Verleihe deinem Graffiti zusätzliche Effekte:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {FONT_EFFECTS.map((effect) => (
                          <button
                            key={effect.id}
                            onClick={() => setSelectedEffect(effect.id)}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              selectedEffect === effect.id
                                ? "border-pink-500 bg-pink-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                          >
                            <div className="font-semibold text-white">{effect.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{effect.description}</div>
                            <div className="text-xs text-cyan-400 mt-1">{effect.category}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Customization */}
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <button
                    onClick={() => setShowCustomization(!showCustomization)}
                    className="w-full flex items-center justify-between text-lg font-semibold mb-4"
                  >
                    <span className="flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Farben & Anpassungen
                    </span>
                    <span className={`transform transition-transform ${showCustomization ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {showCustomization && (
                    <div className="space-y-4">
                      {/* Text Color */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Textfarbe</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {PRESET_COLORS.map((color) => (
                            <button
                              key={color}
                              onClick={() => setTextColor(color)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                textColor === color ? "border-white" : "border-gray-600"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full h-10 rounded border border-gray-600"
                        />
                      </div>

                      {/* Background Color (only if no wall background selected) */}
                      {selectedBackground === "none" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Einfacher Hintergrund</label>
                          <div className="flex gap-2 mb-2">
                            <button
                              onClick={() => setBgColor("transparent")}
                              className={`px-3 py-1 rounded text-sm ${
                                backgroundColor === "transparent" ? "bg-pink-500 text-white" : "bg-gray-700"
                              }`}
                            >
                              Transparent
                            </button>
                            <input
                              type="color"
                              value={backgroundColor === "transparent" ? "#ffffff" : backgroundColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="flex-1 h-8 rounded border border-gray-600"
                            />
                          </div>
                        </div>
                      )}

                      {/* Stroke */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Umrandung</label>
                        <div className="space-y-2">
                          <input
                            type="color"
                            value={strokeColor}
                            onChange={(e) => setStrokeColor(e.target.value)}
                            className="w-full h-8 rounded border border-gray-600"
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
                            />
                          </div>
                        </div>
                      </div>

                      {/* Advanced Controls Toggle */}
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full text-left text-sm font-medium text-pink-400 hover:text-pink-300"
                      >
                        {showAdvanced ? "▼" : "▶"} Erweiterte Einstellungen
                      </button>

                      {showAdvanced && (
                        <div className="space-y-4 pl-4 border-l-2 border-gray-600">
                          {/* Text Size */}
                          <div>
                            <label className="block text-sm font-medium mb-2">Textgröße: {textSize[0]}%</label>
                            <Slider
                              value={textSize}
                              onValueChange={setTextSize}
                              max={200}
                              min={50}
                              step={5}
                              className="w-full"
                            />
                          </div>

                          {/* Rotation */}
                          <div>
                            <label className="block text-sm font-medium mb-2">Rotation: {rotation[0]}°</label>
                            <Slider
                              value={rotation}
                              onValueChange={setRotation}
                              max={45}
                              min={-45}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          {/* Letter Spacing */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Buchstabenabstand: {letterSpacing[0]}px
                            </label>
                            <Slider
                              value={letterSpacing}
                              onValueChange={setLetterSpacing}
                              max={20}
                              min={-10}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>

                {/* Undo/Redo Controls */}
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Keyboard className="mr-2 h-5 w-5" />
                    Aktionen
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <Button
                      onClick={handleUndo}
                      disabled={!canUndo}
                      variant="outline"
                      className="flex-1 border-gray-600 hover:border-pink-400 bg-transparent"
                    >
                      <Undo className="mr-2 h-4 w-4" />
                      Rückgängig
                    </Button>
                    <Button
                      onClick={handleRedo}
                      disabled={!canRedo}
                      variant="outline"
                      className="flex-1 border-gray-600 hover:border-pink-400 bg-transparent"
                    >
                      <Redo className="mr-2 h-4 w-4" />
                      Wiederholen
                    </Button>
                  </div>
                  <Button
                    onClick={() => setShowKeyboardHelp(true)}
                    variant="ghost"
                    className="w-full text-sm text-gray-400 hover:text-pink-400"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Tastenkürzel anzeigen
                  </Button>
                </Card>
              </div>

              {/* Preview and Download */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-gray-800 border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Layers className="mr-2 h-5 w-5" />
                      Live Vorschau
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => shareDesign(canvasRef.current!, text)}
                        variant="outline"
                        className="border-gray-600 hover:border-pink-400 bg-transparent"
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Teilen
                      </Button>
                      <Button
                        onClick={() => downloadImage(canvasRef.current!)}
                        className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        PNG Download
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-center min-h-[300px] relative">
                    {isLoading && (
                      <div className="absolute inset-0 bg-gray-700/80 flex items-center justify-center rounded-lg">
                        <LoadingSpinner size="lg" text="Generiere Graffiti..." />
                      </div>
                    )}

                    {error && (
                      <div className="absolute inset-0 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="text-red-400 font-semibold mb-2">Fehler</div>
                          <div className="text-sm text-gray-300 mb-4">{error}</div>
                          <Button
                            onClick={() => {
                              setError(null)
                              generateGraffiti()
                            }}
                            size="sm"
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Erneut versuchen
                          </Button>
                        </div>
                      </div>
                    )}

                    <canvas
                      ref={canvasRef}
                      className="max-w-full h-auto border border-gray-600 rounded"
                      style={{ backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor }}
                    />
                  </div>

                  <div className="mt-4 text-sm text-gray-400 text-center">
                    💡 <strong>Profi-Tipp:</strong> Kombiniere verschiedene Graffiti-Stile mit Wall-Hintergründen für
                    authentische Street Art!
                  </div>
                </Card>

                {/* Export Options */}
                <div className="mt-6">
                  <Suspense fallback={<LoadingSpinner size="sm" text="Lade Export-Optionen..." />}>
                    <ExportOptionsComponent
                      onExport={handleExport}
                      isVisible={showExportOptions}
                      onToggle={() => setShowExportOptions(!showExportOptions)}
                      isExporting={isExporting}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          )}

          {/* SEO Optimized Features Section */}
          <section className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Warum Brans der #1 Graffiti Generator für Street Art ist
            </h2>
            <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              Über <strong>50.000+ Nutzer</strong> vertrauen bereits auf Brans Graffiti Generator. Entdecke, warum wir
              die beste Alternative zu teurer Design-Software sind.
            </p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Type className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">25+ Authentische Graffiti-Stile</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Von klassischen <strong>Bubble Letters</strong> bis zu komplexem <strong>Wildstyle</strong> - alle
                  wichtigen Graffiti-Stile in professioneller Qualität. Inklusive Chrome, Fire, Ice und Neon-Effekte.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Realistische Graffiti Wall Hintergründe</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Authentische <strong>Ziegelwand</strong>, <strong>Beton</strong>, <strong>U-Bahn-Fliesen</strong> und
                  <strong>Zugwaggon</strong> Hintergründe für echte Street Art Atmosphäre.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 md:h-8 w-6 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Professionelle Export-Optionen</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Download als <strong>PNG</strong> (transparent), <strong>JPG</strong>, <strong>WebP</strong> oder
                  <strong>SVG</strong> in verschiedenen Auflösungen. Perfekt für Social Media, T-Shirts und Poster.
                </p>
              </div>
            </div>
          </section>

          {/* How-To Section for SEO */}
          <section className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Wie erstelle ich Graffiti Schrift mit Brans? - Schritt-für-Schritt Anleitung
            </h2>
            <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              In nur <strong>4 einfachen Schritten</strong> zu deinem perfekten Graffiti-Design. Keine Design-Erfahrung
              nötig!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg md:text-xl">
                  1
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Text eingeben</h3>
                <p className="text-gray-400 text-sm">
                  Gib deinen gewünschten Text ein und wähle aus <strong>25+ Graffiti-Stilen</strong>
                  wie Bubble Letters oder Wildstyle.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg md:text-xl">
                  2
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Hintergrund wählen</h3>
                <p className="text-gray-400 text-sm">
                  Wähle einen <strong>authentischen Graffiti-Wall Hintergrund</strong> oder verwende transparenten
                  Hintergrund für eigene Designs.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg md:text-xl">
                  3
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Anpassen & Effekte</h3>
                <p className="text-gray-400 text-sm">
                  Passe <strong>Farben, Größe, Rotation</strong> an und füge <strong>Spezialeffekte</strong>
                  wie Glow oder Double Shadow hinzu.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-400 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg md:text-xl">
                  4
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2">Download</h3>
                <p className="text-gray-400 text-sm">
                  Lade dein fertiges Graffiti als <strong>PNG, JPG oder SVG</strong> in
                  <strong>HD-Qualität</strong> herunter - kostenlos!
                </p>
              </div>
            </div>
          </section>

          {/* SEO FAQ Section */}
          <section className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              Häufig gestellte Fragen zu Brans Graffiti Generator
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-4">
              <Card className="bg-gray-800 border-gray-700 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-400">
                  Ist Brans Graffiti Generator wirklich 100% kostenlos?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Ja! <strong>Brans Graffiti Generator</strong> ist vollständig kostenlos nutzbar. Du kannst unbegrenzt{" "}
                  <strong>Graffiti-Designs erstellen</strong> und als PNG, JPG oder SVG herunterladen, ohne versteckte
                  Kosten, Wasserzeichen oder Registrierung.
                </p>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-400">
                  Welche Graffiti-Stile bietet Brans?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Brans bietet über <strong>25 authentische Graffiti-Stile</strong>:<strong>Bubble Letters</strong>,{" "}
                  <strong>Wildstyle</strong>, <strong>Block Style</strong>,<strong>Tag Style</strong>,{" "}
                  <strong>Throw-up</strong>, <strong>Chrome</strong>,<strong>Fire</strong>, <strong>Ice</strong>,{" "}
                  <strong>Neon</strong>, und viele mehr. Alle Stile sind von echten Street Art Künstlern inspiriert.
                </p>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-400">
                  Kann ich Brans Graffiti-Designs kommerziell nutzen?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Absolut! Alle mit <strong>Brans erstellten Graffiti-Designs</strong> können frei für{" "}
                  <strong>private und kommerzielle Zwecke</strong> verwendet werden. Perfekt für{" "}
                  <strong>T-Shirt Designs</strong>, <strong>Logos</strong>,<strong>Social Media Posts</strong>,{" "}
                  <strong>YouTube Thumbnails</strong> und mehr.
                </p>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-400">
                  Funktioniert Brans auf dem Handy?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Ja! <strong>Brans Graffiti Generator</strong> ist vollständig
                  <strong>responsive und mobile-optimiert</strong>. Er funktioniert perfekt auf
                  <strong>iPhone</strong>, <strong>Android</strong>, <strong>iPad</strong> und allen Desktop-Computern.
                  Keine App-Installation nötig!
                </p>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-pink-400">
                  Was macht Brans besser als andere Graffiti Generatoren?
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Brans bietet <strong>authentische Graffiti Wall Hintergründe</strong>,
                  <strong>25+ professionelle Stile</strong>, <strong>Spezialeffekte</strong>,
                  <strong>Undo/Redo Funktion</strong>, <strong>Tastenkürzel</strong> und
                  <strong>Export in 4 Formaten</strong>. Alles kostenlos, ohne Anmeldung und mit
                  <strong>deutscher Benutzeroberfläche</strong>.
                </p>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-12 md:mt-16">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <BrandLogo size={isMobile ? "sm" : "md"} showText={true} href={undefined} className="mb-4" />
                <p className="text-gray-400 text-sm">
                  Der führende kostenlose Online Graffiti Schrift Generator mit 25+ authentischen Stilen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Rechtliches</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="/datenschutzrichtlinie" className="hover:text-pink-400">
                      Datenschutz
                    </Link>
                  </li>
                  <li>
                    <Link href="/nutzungsbedingungen" className="hover:text-pink-400">
                      Nutzungsbedingungen
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="/kontakt" className="hover:text-pink-400">
                      Kontakt
                    </Link>
                  </li>
                  <li>
                    <Link href="/ueber-uns" className="hover:text-pink-400">
                      Über uns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-6 md:pt-8">
              © 2025 Brans Graffiti Generator. Alle Rechte vorbehalten.
              <span className="mx-2">•</span>
              Kostenloser Online Graffiti Generator für authentische Street Art
            </div>
          </div>
        </footer>

        {/* Keyboard Help Modal */}
        {showKeyboardHelp && !isMobile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-gray-800 border-gray-700 p-6 max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tastenkürzel</h3>
                <Button onClick={() => setShowKeyboardHelp(false)} variant="ghost" size="sm">
                  ✕
                </Button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Rückgängig</span>
                  <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wiederholen</span>
                  <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+Shift+Z</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speichern</span>
                  <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+S</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hilfe</span>
                  <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+/</kbd>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
