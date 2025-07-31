"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Download, Share, Maximize2, Minimize2, RotateCcw } from "lucide-react"
import { downloadImage } from "@/lib/download-utils"
import { shareDesign } from "@/lib/share-utils"

interface MobileOptimizedCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  isLoading: boolean
  error: string | null
  onRetry: () => void
  text: string
  backgroundColor: string
  isMobile: boolean
}

export function MobileOptimizedCanvas({
  canvasRef,
  isLoading,
  error,
  onRetry,
  text,
  backgroundColor,
  isMobile,
}: MobileOptimizedCanvasProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 300 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Optimize canvas size based on container
  const updateCanvasSize = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const container = containerRef.current
      const containerWidth = container.clientWidth - 32 // Account for padding

      let optimalWidth, optimalHeight

      if (isMobile) {
        // Mobile: prioritize fitting in viewport
        optimalWidth = Math.min(containerWidth, 350)
        optimalHeight = Math.min(200, window.innerHeight * 0.3)
      } else {
        // Desktop: larger canvas
        optimalWidth = Math.min(containerWidth, 800)
        optimalHeight = Math.min(300, containerWidth * 0.375)
      }

      setCanvasSize({ width: optimalWidth, height: optimalHeight })

      // Update actual canvas size
      const canvas = canvasRef.current
      canvas.width = optimalWidth
      canvas.height = optimalHeight
      canvas.style.width = `${optimalWidth}px`
      canvas.style.height = `${optimalHeight}px`
    }
  }, [isMobile, canvasRef])

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [updateCanvasSize])

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleDownload = useCallback(() => {
    if (canvasRef.current) {
      downloadImage(canvasRef.current, `brans-graffiti-${text.toLowerCase()}.png`)
    }
  }, [canvasRef, text])

  const handleShare = useCallback(() => {
    if (canvasRef.current) {
      shareDesign(canvasRef.current, text)
    }
  }, [canvasRef, text])

  const handleReset = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
    onRetry()
  }, [canvasRef, onRetry])

  return (
    <Card className={`bg-gray-800 border-gray-700 ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "p-4 md:p-6"}`}>
      <div ref={containerRef} className="w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <span className="mr-2">🎨</span>
            Live Vorschau
            {isMobile && <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">Mobile</span>}
          </h3>

          <div className="flex gap-2">
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="border-gray-600 hover:border-yellow-400 bg-transparent"
              aria-label="Canvas zurücksetzen"
            >
              <RotateCcw className="h-4 w-4" />
              {!isMobile && <span className="ml-2">Reset</span>}
            </Button>

            {!isMobile && (
              <Button
                onClick={toggleFullscreen}
                size="sm"
                variant="outline"
                className="border-gray-600 hover:border-gray-400 bg-transparent"
                aria-label={isFullscreen ? "Vollbild verlassen" : "Vollbild"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}

            <Button
              onClick={handleShare}
              size="sm"
              variant="outline"
              className="border-gray-600 hover:border-pink-400 bg-transparent"
              aria-label="Graffiti teilen"
            >
              <Share className="h-4 w-4" />
              {!isMobile && <span className="ml-2">Teilen</span>}
            </Button>

            <Button
              onClick={handleDownload}
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white"
              aria-label="Graffiti herunterladen"
            >
              <Download className="h-4 w-4" />
              {!isMobile && <span className="ml-2">Download</span>}
            </Button>
          </div>
        </div>

        <div
          className={`bg-gray-700 rounded-lg flex items-center justify-center relative ${
            isFullscreen ? "h-full p-8" : "p-4 min-h-[200px] md:min-h-[300px]"
          }`}
          style={{
            minHeight: isMobile ? "200px" : "300px",
            maxHeight: isMobile ? "50vh" : "none",
          }}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gray-700/90 flex items-center justify-center rounded-lg backdrop-blur-sm">
              <LoadingSpinner size="lg" text="Generiere Graffiti..." />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-center">
              <div className="text-center p-4 max-w-sm">
                <div className="text-red-400 font-semibold mb-2">⚠️ Fehler</div>
                <div className="text-sm text-gray-300 mb-4">{error}</div>
                <Button
                  onClick={onRetry}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600"
                  aria-label="Erneut versuchen"
                >
                  Erneut versuchen
                </Button>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="max-w-full h-auto border border-gray-600 rounded shadow-lg"
            style={{
              backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor,
              imageRendering: "pixelated",
              touchAction: "none",
            }}
            width={canvasSize.width}
            height={canvasSize.height}
            aria-label={`Graffiti Vorschau: ${text}`}
          />
        </div>

        {isMobile && (
          <div className="mt-4 text-xs text-gray-400 text-center">
            💡 <strong>Tipp:</strong> Drehe dein Handy für eine bessere Ansicht
          </div>
        )}
      </div>
    </Card>
  )
}
