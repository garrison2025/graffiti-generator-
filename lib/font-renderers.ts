// Additional font rendering functions

export const renderDripStyle = (
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

export const renderChromeStyle = (
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

export const renderFireStyle = (
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

export const renderIceStyle = (
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

export const renderOutlineStyle = (
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

export const renderGrungeStyle = (
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

export const renderElectricStyle = (
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

// Helper function for color manipulation
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
