"use client"

import { useEffect, useRef } from "react"

interface FontPreviewProps {
  fontId: string
  fontName: string
  isSelected: boolean
  onClick: () => void
  previewText: string
}

export function FontPreview({ fontId, fontName, isSelected, onClick, previewText }: FontPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 120
    canvas.height = 60

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Render mini preview of the font style
    renderMiniPreview(ctx, fontId, previewText, 60, 30, 24, "#FF6B35", "#000000", 2)
  }, [fontId, previewText])

  const renderMiniPreview = (
    ctx: CanvasRenderingContext2D,
    fontStyle: string,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
  ) => {
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Simplified versions of each font style for preview
    switch (fontStyle) {
      case "wildstyle":
        ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth + 2
        ctx.strokeText(text, x, y)
        ctx.fillStyle = fillColor
        ctx.fillText(text, x, y)
        break

      case "bubble":
        ctx.font = `bold ${fontSize}px Arial Black, sans-serif`
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth + 3
        ctx.strokeText(text, x, y)
        const bubbleGradient = ctx.createRadialGradient(x - fontSize / 4, y - fontSize / 4, 0, x, y, fontSize / 2)
        bubbleGradient.addColorStop(0, "#FFFFFF")
        bubbleGradient.addColorStop(0.7, fillColor)
        bubbleGradient.addColorStop(1, strokeColor)
        ctx.fillStyle = bubbleGradient
        ctx.fillText(text, x, y)
        break

      case "neon":
        ctx.font = `bold ${fontSize}px Arial, sans-serif`
        ctx.shadowColor = fillColor
        ctx.shadowBlur = 10
        ctx.strokeStyle = fillColor
        ctx.lineWidth = 2
        ctx.strokeText(text, x, y)
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(text, x, y)
        ctx.shadowBlur = 0
        break

      case "fire":
        ctx.font = `bold ${fontSize}px Arial Black, sans-serif`
        const fireGradient = ctx.createLinearGradient(x, y + fontSize / 2, x, y - fontSize / 2)
        fireGradient.addColorStop(0, "#FF0000")
        fireGradient.addColorStop(0.5, "#FF8C00")
        fireGradient.addColorStop(1, "#FFD700")
        ctx.fillStyle = fireGradient
        ctx.fillText(text, x, y)
        break

      case "chrome":
        ctx.font = `bold ${fontSize}px Arial Black, sans-serif`
        const chromeGradient = ctx.createLinearGradient(x - fontSize / 2, y, x + fontSize / 2, y)
        chromeGradient.addColorStop(0, "#C0C0C0")
        chromeGradient.addColorStop(0.5, "#FFFFFF")
        chromeGradient.addColorStop(1, "#808080")
        ctx.fillStyle = chromeGradient
        ctx.fillText(text, x, y)
        break

      default:
        ctx.font = `bold ${fontSize}px Arial, sans-serif`
        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = strokeWidth
          ctx.strokeText(text, x, y)
        }
        ctx.fillStyle = fillColor
        ctx.fillText(text, x, y)
    }
  }

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border-2 transition-all ${
        isSelected ? "border-yellow-400 bg-yellow-400/10" : "border-gray-600 hover:border-gray-500"
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-8 mb-2" style={{ imageRendering: "pixelated" }} />
      <div className="text-xs text-gray-400">{fontName}</div>
    </button>
  )
}
