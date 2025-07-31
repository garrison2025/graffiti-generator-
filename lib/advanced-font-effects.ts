export interface FontEffect {
  id: string
  name: string
  description: string
  category: string
}

export const FONT_EFFECTS: FontEffect[] = [
  { id: "none", name: "Keine", description: "Kein zusätzlicher Effekt", category: "Basic" },
  { id: "glow", name: "Glow", description: "Leuchtender Schein-Effekt", category: "Light" },
  { id: "double-shadow", name: "Double Shadow", description: "Doppelter Schatten-Effekt", category: "Shadow" },
  { id: "emboss", name: "Emboss", description: "Geprägter 3D-Effekt", category: "3D" },
  { id: "outline-glow", name: "Outline Glow", description: "Leuchtende Umrandung", category: "Light" },
  { id: "vintage", name: "Vintage", description: "Retro-Grunge Effekt", category: "Texture" },
  { id: "neon-flicker", name: "Neon Flicker", description: "Flackerndes Neon", category: "Light" },
  { id: "spray-fade", name: "Spray Fade", description: "Verblassender Spray-Effekt", category: "Texture" },
]

export const applyFontEffect = (
  ctx: CanvasRenderingContext2D,
  effectId: string,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  switch (effectId) {
    case "glow":
      applyGlowEffect(ctx, text, x, y, fontSize, color)
      break
    case "double-shadow":
      applyDoubleShadowEffect(ctx, text, x, y, fontSize, color)
      break
    case "emboss":
      applyEmbossEffect(ctx, text, x, y, fontSize, color)
      break
    case "outline-glow":
      applyOutlineGlowEffect(ctx, text, x, y, fontSize, color)
      break
    case "vintage":
      applyVintageEffect(ctx, text, x, y, fontSize, color)
      break
    case "neon-flicker":
      applyNeonFlickerEffect(ctx, text, x, y, fontSize, color)
      break
    case "spray-fade":
      applySprayFadeEffect(ctx, text, x, y, fontSize, color)
      break
  }
}

const applyGlowEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Multiple glow layers
  const glowSizes = [30, 20, 10, 5]
  const glowOpacities = [0.1, 0.2, 0.4, 0.6]

  glowSizes.forEach((size, index) => {
    ctx.shadowColor = color
    ctx.shadowBlur = size
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.globalAlpha = glowOpacities[index]
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
  })

  ctx.globalAlpha = 1
  ctx.shadowBlur = 0
}

const applyDoubleShadowEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // First shadow (far)
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
  ctx.fillText(text, x + 8, y + 8)

  // Second shadow (near)
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
  ctx.fillText(text, x + 4, y + 4)

  // Main text
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

const applyEmbossEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Dark shadow (bottom-right)
  ctx.fillStyle = darkenColor(color, 40)
  ctx.fillText(text, x + 2, y + 2)

  // Light highlight (top-left)
  ctx.fillStyle = lightenColor(color, 40)
  ctx.fillText(text, x - 1, y - 1)

  // Main text
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

const applyOutlineGlowEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Outer glow
  ctx.shadowColor = color
  ctx.shadowBlur = 20
  ctx.strokeStyle = color
  ctx.lineWidth = 6
  ctx.strokeText(text, x, y)

  // Inner outline
  ctx.shadowBlur = 0
  ctx.strokeStyle = lightenColor(color, 30)
  ctx.lineWidth = 2
  ctx.strokeText(text, x, y)

  // Core text
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(text, x, y)
}

const applyVintageEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Base text
  ctx.fillStyle = darkenColor(color, 20)
  ctx.fillText(text, x, y)

  // Add vintage texture overlay
  ctx.globalCompositeOperation = "multiply"
  for (let i = 0; i < 50; i++) {
    const dotX = x + (Math.random() - 0.5) * fontSize * 2
    const dotY = y + (Math.random() - 0.5) * fontSize
    const dotSize = Math.random() * 3 + 1
    const opacity = Math.random() * 0.5 + 0.2

    ctx.globalAlpha = opacity
    ctx.fillStyle = "#8B4513"
    ctx.beginPath()
    ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalCompositeOperation = "source-over"
  ctx.globalAlpha = 1
}

const applyNeonFlickerEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Simulate flicker with random opacity
  const flickerIntensity = 0.8 + Math.random() * 0.2

  ctx.globalAlpha = flickerIntensity
  ctx.shadowColor = color
  ctx.shadowBlur = 25
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.strokeText(text, x, y)

  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(text, x, y)

  ctx.globalAlpha = 1
  ctx.shadowBlur = 0
}

const applySprayFadeEffect = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
) => {
  // Main text with reduced opacity
  ctx.globalAlpha = 0.8
  ctx.fillStyle = color
  ctx.fillText(text, x, y)

  // Spray particles around text
  ctx.globalAlpha = 0.3
  for (let i = 0; i < 30; i++) {
    const particleX = x + (Math.random() - 0.5) * fontSize * 3
    const particleY = y + (Math.random() - 0.5) * fontSize * 1.5
    const particleSize = Math.random() * 2 + 1

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
}

// Helper functions
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
