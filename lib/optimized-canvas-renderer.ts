import { renderFontStyle } from "@/lib/font-utils"
import { renderBackground } from "@/lib/background-utils"
import { applyFontEffect } from "@/lib/advanced-font-effects"

interface RenderOptions {
  text: string
  selectedFont: string
  textColor: string
  backgroundColor: string
  strokeColor: string
  strokeWidth: number
  textSize: number
  rotation: number
  letterSpacing: number
  selectedBackground: string
  customBgColor: string
  selectedEffect: string
  isMobile: boolean
}

export class OptimizedCanvasRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private lastRenderHash = ""
  private renderCache = new Map<string, ImageData>()
  private isRendering = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("Canvas context not available")
    }
    this.ctx = ctx

    // Optimize canvas for performance
    this.optimizeCanvas()
  }

  private optimizeCanvas() {
    // Enable hardware acceleration
    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = "high"

    // Set optimal pixel ratio
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    const rect = this.canvas.getBoundingClientRect()

    this.canvas.width = rect.width * pixelRatio
    this.canvas.height = rect.height * pixelRatio
    this.canvas.style.width = rect.width + "px"
    this.canvas.style.height = rect.height + "px"

    this.ctx.scale(pixelRatio, pixelRatio)
  }

  private generateRenderHash(options: RenderOptions): string {
    return JSON.stringify(options)
  }

  private shouldSkipRender(options: RenderOptions): boolean {
    const currentHash = this.generateRenderHash(options)
    return currentHash === this.lastRenderHash
  }

  async render(options: RenderOptions): Promise<void> {
    // Skip if already rendering or no changes
    if (this.isRendering || this.shouldSkipRender(options)) {
      return
    }

    this.isRendering = true
    const renderHash = this.generateRenderHash(options)

    try {
      // Check cache first
      const cached = this.renderCache.get(renderHash)
      if (cached) {
        this.ctx.putImageData(cached, 0, 0)
        this.lastRenderHash = renderHash
        return
      }

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Render background
      await this.renderBackground(options)

      // Render text with optimizations
      await this.renderText(options)

      // Cache the result (limit cache size)
      if (this.renderCache.size > 10) {
        const firstKey = this.renderCache.keys().next().value
        this.renderCache.delete(firstKey)
      }

      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      this.renderCache.set(renderHash, imageData)

      this.lastRenderHash = renderHash
    } catch (error) {
      console.error("Render error:", error)
      throw error
    } finally {
      this.isRendering = false
    }
  }

  private async renderBackground(options: RenderOptions) {
    const { selectedBackground, customBgColor, backgroundColor } = options

    if (selectedBackground === "custom") {
      renderBackground(this.ctx, "custom", this.canvas.width, this.canvas.height, customBgColor)
    } else if (selectedBackground !== "none") {
      renderBackground(this.ctx, selectedBackground, this.canvas.width, this.canvas.height)
    } else if (backgroundColor !== "transparent") {
      this.ctx.fillStyle = backgroundColor
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  private async renderText(options: RenderOptions) {
    const {
      text,
      selectedFont,
      textColor,
      strokeColor,
      strokeWidth,
      textSize,
      rotation,
      letterSpacing,
      selectedEffect,
      isMobile,
    } = options

    // Save context for transformations
    this.ctx.save()

    try {
      // Apply rotation
      const centerX = this.canvas.width / 2
      const centerY = this.canvas.height / 2
      this.ctx.translate(centerX, centerY)
      this.ctx.rotate((rotation * Math.PI) / 180)
      this.ctx.translate(-centerX, -centerY)

      // Calculate optimal font size
      const baseFontSize = (textSize / 100) * (isMobile ? 80 : 120)
      const fontSize = Math.min(baseFontSize, ((this.canvas.width * 0.8) / text.length) * 1.2)

      // Apply letter spacing
      if (letterSpacing !== 0) {
        this.ctx.letterSpacing = `${letterSpacing}px`
      }

      const x = this.canvas.width / 2
      const y = this.canvas.height / 2

      // Render font-specific style
      renderFontStyle(this.ctx, selectedFont, text, x, y, fontSize, textColor, strokeColor, strokeWidth)

      // Apply additional effects
      if (selectedEffect !== "none") {
        applyFontEffect(this.ctx, selectedEffect, text, x, y, fontSize, textColor)
      }
    } finally {
      this.ctx.restore()
    }
  }

  clearCache() {
    this.renderCache.clear()
    this.lastRenderHash = ""
  }

  destroy() {
    this.clearCache()
  }
}

// Debounced render function
export function createDebouncedRenderer(renderer: OptimizedCanvasRenderer, delay = 300) {
  let timeoutId: NodeJS.Timeout

  return (options: RenderOptions) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      renderer.render(options).catch(console.error)
    }, delay)
  }
}
