// Font rendering utilities

export const renderFontStyle = (
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

  switch (fontStyle) {
    case "wildstyle":
      renderWildstyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "bubble":
      renderBubbleLetters(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "block":
      renderBlockStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "tag":
      renderTagStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "throw-up":
      renderThrowUp(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "piece":
      renderPieceStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "stencil":
      renderStencilStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "drip":
      renderDripStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "chrome":
      renderChromeStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "fire":
      renderFireStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "ice":
      renderIceStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "neon":
      renderNeonStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "shadow":
      renderShadowStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "outline":
      renderOutlineStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "grunge":
      renderGrungeStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "electric":
      renderElectricStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "metal":
      renderMetalStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "spray":
      renderSprayStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "pixel":
      renderPixelStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "glitch":
      renderGlitchStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "rainbow":
      renderRainbowStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "frost":
      renderFrostStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "lava":
      renderLavaStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "tribal":
      renderTribalStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    case "gothic":
      renderGothicStyle(ctx, text, x, y, fontSize, fillColor, strokeColor, strokeWidth)
      break
    default:
      // Fallback to basic style
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

// Individual font rendering functions
const renderWildstyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`

  // Multiple layers for wildstyle complexity
  // Background shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)"
  ctx.fillText(text, x + 8, y + 8)

  // Main stroke (thick)
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 6
  ctx.strokeText(text, x, y)

  // Secondary stroke
  ctx.strokeStyle = fillColor
  ctx.lineWidth = strokeWidth + 2
  ctx.strokeText(text, x, y)

  // Main fill
  const gradient = ctx.createLinearGradient(x - fontSize / 2, y - fontSize / 2, x + fontSize / 2, y + fontSize / 2)
  gradient.addColorStop(0, fillColor)
  gradient.addColorStop(0.5, lightenColor(fillColor, 30))
  gradient.addColorStop(1, darkenColor(fillColor, 20))
  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Add wildstyle arrows and connections
  addWildstyleArrows(ctx, text, x, y, fontSize, fillColor)
}

const renderBubbleLetters = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Bubble effect with multiple layers
  // Outer glow
  ctx.shadowColor = fillColor
  ctx.shadowBlur = 15
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  // Thick stroke for bubble effect
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 8
  ctx.strokeText(text, x, y)

  // Inner stroke (lighter)
  ctx.strokeStyle = lightenColor(strokeColor, 40)
  ctx.lineWidth = strokeWidth + 4
  ctx.strokeText(text, x, y)

  // Main fill with gradient
  const gradient = ctx.createRadialGradient(x - fontSize / 4, y - fontSize / 4, 0, x, y, fontSize / 2)
  gradient.addColorStop(0, lightenColor(fillColor, 50))
  gradient.addColorStop(0.7, fillColor)
  gradient.addColorStop(1, darkenColor(fillColor, 30))
  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Highlight
  ctx.fillStyle = "rgba(255,255,255,0.6)"
  ctx.font = `bold ${fontSize * 0.8}px Arial Black, sans-serif`
  ctx.fillText(text, x - fontSize / 8, y - fontSize / 8)

  ctx.shadowBlur = 0
}

const renderBlockStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // 3D block effect
  const offset = fontSize * 0.1

  // Back faces (3D depth)
  ctx.fillStyle = darkenColor(fillColor, 50)
  for (let i = 1; i <= 5; i++) {
    ctx.fillText(text, x + i * 2, y + i * 2)
  }

  // Main stroke
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 3
  ctx.strokeText(text, x, y)

  // Main fill
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Top highlight
  ctx.fillStyle = lightenColor(fillColor, 40)
  ctx.fillText(text, x - 2, y - 2)
}

const renderTagStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  // Handwriting-style font
  ctx.font = `italic bold ${fontSize}px Brush Script MT, cursive`

  // Slight rotation for each letter
  const letters = text.split("")
  const letterWidth = fontSize * 0.6
  const startX = x - (letters.length * letterWidth) / 2

  letters.forEach((letter, index) => {
    ctx.save()
    const letterX = startX + index * letterWidth
    const rotation = (Math.random() - 0.5) * 0.2 // Random slight rotation

    ctx.translate(letterX, y)
    ctx.rotate(rotation)

    // Stroke
    if (strokeWidth > 0) {
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth
      ctx.strokeText(letter, 0, 0)
    }

    // Fill
    ctx.fillStyle = fillColor
    ctx.fillText(letter, 0, 0)

    ctx.restore()
  })
}

const renderThrowUp = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Quick and dirty style - thick outline, simple fill
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 6
  ctx.strokeText(text, x, y)

  // Simple fill, sometimes hollow
  if (Math.random() > 0.3) {
    ctx.fillStyle = fillColor
    ctx.fillText(text, x, y)
  }

  // Add some spray texture
  addSprayTexture(ctx, x, y, fontSize, fillColor, 0.3)
}

const renderPieceStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Piece style with bold and blocky appearance
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Add blocky texture
  ctx.fillStyle = "#000000"
  ctx.fillText(text, x + 2, y + 2)
}

const renderStencilStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Stencil style with cut-out effect
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Add cut-out effect
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(text, x - 2, y - 2)
}

const renderDripStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Main text
  if (strokeWidth > 0) {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.strokeText(text, x, y)
  }

  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Drip effects
  const numDrips = text.length * 2
  for (let i = 0; i < numDrips; i++) {
    const dripX = x + (Math.random() - 0.5) * fontSize * text.length * 0.8
    const dripY = y + fontSize / 2
    const dripHeight = 20 + Math.random() * 40
    const dripWidth = 3 + Math.random() * 4

    // Drip shape
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.ellipse(dripX, dripY, dripWidth / 2, 5, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillRect(dripX - dripWidth / 2, dripY, dripWidth, dripHeight)

    ctx.beginPath()
    ctx.ellipse(dripX, dripY + dripHeight, dripWidth / 2, dripWidth, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

const renderChromeStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Chrome gradient
  const gradient = ctx.createLinearGradient(x - fontSize / 2, y - fontSize / 2, x + fontSize / 2, y + fontSize / 2)
  gradient.addColorStop(0, "#E8E8E8")
  gradient.addColorStop(0.2, "#FFFFFF")
  gradient.addColorStop(0.4, "#C0C0C0")
  gradient.addColorStop(0.6, "#A0A0A0")
  gradient.addColorStop(0.8, "#808080")
  gradient.addColorStop(1, "#606060")

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillText(text, x + 4, y + 4)

  // Main chrome fill
  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Highlight
  ctx.fillStyle = "rgba(255,255,255,0.8)"
  ctx.font = `bold ${fontSize * 0.9}px Arial Black, sans-serif`
  ctx.fillText(text, x - 2, y - 3)
}

const renderFireStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Fire gradient
  const gradient = ctx.createLinearGradient(x, y + fontSize / 2, x, y - fontSize / 2)
  gradient.addColorStop(0, "#FF0000")
  gradient.addColorStop(0.3, "#FF4500")
  gradient.addColorStop(0.6, "#FF8C00")
  gradient.addColorStop(1, "#FFD700")

  // Glow effect
  ctx.shadowColor = "#FF4500"
  ctx.shadowBlur = 20

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Flame effects on top
  const numFlames = text.length * 3
  for (let i = 0; i < numFlames; i++) {
    const flameX = x + (Math.random() - 0.5) * fontSize * text.length * 0.6
    const flameY = y - fontSize / 2 - Math.random() * 30
    const flameHeight = 10 + Math.random() * 20

    const flameGradient = ctx.createRadialGradient(flameX, flameY, 0, flameX, flameY, flameHeight)
    flameGradient.addColorStop(0, "#FFD700")
    flameGradient.addColorStop(0.5, "#FF4500")
    flameGradient.addColorStop(1, "rgba(255,0,0,0)")

    ctx.fillStyle = flameGradient
    ctx.beginPath()
    ctx.ellipse(flameX, flameY, 3, flameHeight, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.shadowBlur = 0
}

const renderIceStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Ice gradient
  const gradient = ctx.createLinearGradient(x, y - fontSize / 2, x, y + fontSize / 2)
  gradient.addColorStop(0, "#E0F6FF")
  gradient.addColorStop(0.3, "#87CEEB")
  gradient.addColorStop(0.7, "#4682B4")
  gradient.addColorStop(1, "#191970")

  // Frost glow
  ctx.shadowColor = "#87CEEB"
  ctx.shadowBlur = 15

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Ice crystals
  ctx.shadowBlur = 0
  ctx.strokeStyle = "rgba(255,255,255,0.8)"
  ctx.lineWidth = 1

  for (let i = 0; i < 15; i++) {
    const crystalX = x + (Math.random() - 0.5) * fontSize * text.length * 0.8
    const crystalY = y + (Math.random() - 0.5) * fontSize * 0.6
    const size = 3 + Math.random() * 5

    // Draw crystal shape
    ctx.beginPath()
    ctx.moveTo(crystalX, crystalY - size)
    ctx.lineTo(crystalX + size, crystalY)
    ctx.lineTo(crystalX, crystalY + size)
    ctx.lineTo(crystalX - size, crystalY)
    ctx.closePath()
    ctx.stroke()
  }
}

const renderNeonStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial, sans-serif`

  // Neon effect with glowing text
  ctx.shadowColor = fillColor
  ctx.shadowBlur = 20
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  // Outer glow
  ctx.strokeStyle = fillColor
  ctx.lineWidth = strokeWidth + 4
  ctx.strokeText(text, x, y)

  // Inner glow
  ctx.strokeStyle = lightenColor(fillColor, 50)
  ctx.lineWidth = strokeWidth
  ctx.strokeText(text, x, y)

  // Core
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(text, x, y)

  ctx.shadowBlur = 0
}

const renderShadowStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Drop shadow
  ctx.fillStyle = "rgba(0,0,0,0.5)"
  ctx.fillText(text, x + 6, y + 6)

  // Main stroke
  if (strokeWidth > 0) {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.strokeText(text, x, y)
  }

  // Main fill
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)
}

const renderOutlineStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial, sans-serif`

  // Only outline, no fill
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 2
  ctx.strokeText(text, x, y)

  // Inner outline
  ctx.strokeStyle = fillColor
  ctx.lineWidth = strokeWidth
  ctx.strokeText(text, x, y)
}

const renderGrungeStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Base text
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Grunge texture overlay
  ctx.globalCompositeOperation = "multiply"

  for (let i = 0; i < 100; i++) {
    const dotX = x + (Math.random() - 0.5) * fontSize * text.length * 0.9
    const dotY = y + (Math.random() - 0.5) * fontSize * 0.8
    const dotSize = Math.random() * 4 + 1
    const opacity = Math.random() * 0.7 + 0.3

    ctx.globalAlpha = opacity
    ctx.fillStyle = darkenColor(fillColor, Math.random() * 50 + 20)
    ctx.beginPath()
    ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalCompositeOperation = "source-over"
  ctx.globalAlpha = 1
}

const renderElectricStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial, sans-serif`

  // Electric glow
  ctx.shadowColor = "#00FFFF"
  ctx.shadowBlur = 25

  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Lightning bolts
  ctx.shadowBlur = 0
  ctx.strokeStyle = "#00FFFF"
  ctx.lineWidth = 2

  for (let i = 0; i < 8; i++) {
    const startX = x + (Math.random() - 0.5) * fontSize * text.length * 0.8
    const startY = y + (Math.random() - 0.5) * fontSize * 0.6

    ctx.beginPath()
    ctx.moveTo(startX, startY)

    // Create zigzag lightning
    for (let j = 0; j < 3; j++) {
      const nextX = startX + (Math.random() - 0.5) * 20
      const nextY = startY + (Math.random() - 0.5) * 20
      ctx.lineTo(nextX, nextY)
    }

    ctx.stroke()
  }
}

// Add other render functions (metal, spray, pixel, glitch, rainbow, frost, lava, tribal, gothic)
const renderMetalStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Metal gradient
  const gradient = ctx.createLinearGradient(x, y - fontSize / 2, x, y + fontSize / 2)
  gradient.addColorStop(0, "#F0F0F0")
  gradient.addColorStop(0.3, "#C0C0C0")
  gradient.addColorStop(0.7, "#808080")
  gradient.addColorStop(1, "#404040")

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Metallic shine
  ctx.fillStyle = "rgba(255,255,255,0.8)"
  ctx.fillText(text, x - 1, y - 2)
}

const renderSprayStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Main text
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Spray texture
  addSprayTexture(ctx, x, y, fontSize, fillColor, 0.5)
}

const renderPixelStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px monospace`
  ctx.imageSmoothingEnabled = false

  // Pixelated effect
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Add pixel blocks
  for (let i = 0; i < 20; i++) {
    const blockX = x + (Math.random() - 0.5) * fontSize * text.length * 0.8
    const blockY = y + (Math.random() - 0.5) * fontSize * 0.6
    const blockSize = 4 + Math.random() * 4

    ctx.fillStyle = darkenColor(fillColor, Math.random() * 30)
    ctx.fillRect(blockX, blockY, blockSize, blockSize)
  }
}

const renderGlitchStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial, sans-serif`

  // Main text
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Glitch effects
  ctx.fillStyle = "#FF0000"
  ctx.fillText(text, x + 2, y - 1)

  ctx.fillStyle = "#00FF00"
  ctx.fillText(text, x - 1, y + 1)

  ctx.fillStyle = "#0000FF"
  ctx.fillText(text, x + 1, y + 2)
}

const renderRainbowStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Rainbow gradient
  const gradient = ctx.createLinearGradient(x - fontSize, y, x + fontSize, y)
  gradient.addColorStop(0, "#FF0000")
  gradient.addColorStop(0.17, "#FF8C00")
  gradient.addColorStop(0.33, "#FFD700")
  gradient.addColorStop(0.5, "#00FF00")
  gradient.addColorStop(0.67, "#0000FF")
  gradient.addColorStop(0.83, "#4B0082")
  gradient.addColorStop(1, "#9400D3")

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)
}

const renderFrostStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Frost gradient
  const gradient = ctx.createLinearGradient(x, y - fontSize / 2, x, y + fontSize / 2)
  gradient.addColorStop(0, "#F0F8FF")
  gradient.addColorStop(0.5, "#B0E0E6")
  gradient.addColorStop(1, "#4682B4")

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Frost crystals
  for (let i = 0; i < 10; i++) {
    const crystalX = x + (Math.random() - 0.5) * fontSize * text.length * 0.6
    const crystalY = y + (Math.random() - 0.5) * fontSize * 0.4
    const size = 2 + Math.random() * 3

    ctx.fillStyle = "rgba(255,255,255,0.8)"
    ctx.fillRect(crystalX, crystalY, size, size)
  }
}

const renderLavaStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Lava gradient
  const gradient = ctx.createLinearGradient(x, y - fontSize / 2, x, y + fontSize / 2)
  gradient.addColorStop(0, "#FFD700")
  gradient.addColorStop(0.3, "#FF4500")
  gradient.addColorStop(0.7, "#DC143C")
  gradient.addColorStop(1, "#8B0000")

  ctx.fillStyle = gradient
  ctx.fillText(text, x, y)

  // Lava bubbles
  for (let i = 0; i < 8; i++) {
    const bubbleX = x + (Math.random() - 0.5) * fontSize * text.length * 0.6
    const bubbleY = y + (Math.random() - 0.5) * fontSize * 0.4
    const size = 3 + Math.random() * 5

    ctx.fillStyle = "#FF6347"
    ctx.beginPath()
    ctx.arc(bubbleX, bubbleY, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const renderTribalStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px Arial Black, sans-serif`

  // Main text
  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Tribal patterns
  ctx.strokeStyle = darkenColor(fillColor, 40)
  ctx.lineWidth = 2

  for (let i = 0; i < 5; i++) {
    const patternX = x + (Math.random() - 0.5) * fontSize * text.length * 0.8
    const patternY = y + (Math.random() - 0.5) * fontSize * 0.6

    ctx.beginPath()
    ctx.moveTo(patternX, patternY)
    ctx.lineTo(patternX + 10, patternY - 5)
    ctx.lineTo(patternX + 5, patternY + 10)
    ctx.closePath()
    ctx.stroke()
  }
}

const renderGothicStyle = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
) => {
  ctx.font = `bold ${fontSize}px serif`

  // Gothic shadow
  ctx.fillStyle = "rgba(0,0,0,0.8)"
  ctx.fillText(text, x + 4, y + 4)

  // Main text
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth + 2
  ctx.strokeText(text, x, y)

  ctx.fillStyle = fillColor
  ctx.fillText(text, x, y)

  // Gothic decorations
  ctx.strokeStyle = darkenColor(fillColor, 30)
  ctx.lineWidth = 1

  for (let i = 0; i < 3; i++) {
    const decorX = x + (Math.random() - 0.5) * fontSize * text.length * 0.6
    const decorY = y - fontSize / 2 - Math.random() * 20

    ctx.beginPath()
    ctx.moveTo(decorX, decorY)
    ctx.lineTo(decorX + 5, decorY - 10)
    ctx.lineTo(decorX - 5, decorY - 10)
    ctx.closePath()
    ctx.stroke()
  }
}

// Helper functions for color manipulation
const lightenColor = (color: string, percent: number): string => {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

const darkenColor = (color: string, percent: number): string => {
  const num = Number.parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return (
    "#" +
    (
      0x1000000 +
      (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)
    )
      .toString(16)
      .slice(1)
  )
}

const addWildstyleArrows = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  ctx.strokeStyle = color
  ctx.lineWidth = 3

  // Add some decorative arrows and connections
  const arrowSize = fontSize * 0.2
  for (let i = 0; i < 3; i++) {
    const arrowX = x + (Math.random() - 0.5) * fontSize * 1.5
    const arrowY = y + (Math.random() - 0.5) * fontSize * 0.8

    ctx.beginPath()
    ctx.moveTo(arrowX - arrowSize, arrowY)
    ctx.lineTo(arrowX + arrowSize, arrowY)
    ctx.moveTo(arrowX + arrowSize - 5, arrowY - 5)
    ctx.lineTo(arrowX + arrowSize, arrowY)
    ctx.lineTo(arrowX + arrowSize - 5, arrowY + 5)
    ctx.stroke()
  }
}

const addSprayTexture = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  opacity: number,
) => {
  ctx.fillStyle = color
  ctx.globalAlpha = opacity

  for (let i = 0; i < 30; i++) {
    const dotX = x + (Math.random() - 0.5) * fontSize * 1.2
    const dotY = y + (Math.random() - 0.5) * fontSize * 0.8
    const dotSize = Math.random() * 2 + 1

    ctx.beginPath()
    ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
}
