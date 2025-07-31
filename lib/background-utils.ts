export interface BackgroundOption {
  id: string
  name: string
  preview: string
  category: string
  description: string
}

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: "none", name: "Transparent", preview: "🔳", category: "Basic", description: "Transparenter Hintergrund" },
  { id: "brick-wall", name: "Ziegel", preview: "🧱", category: "Urban", description: "Klassische Ziegelwand" },
  { id: "concrete", name: "Beton", preview: "🏢", category: "Urban", description: "Raue Betonwand" },
  { id: "subway", name: "U-Bahn", preview: "🚇", category: "Urban", description: "U-Bahn Fliesen" },
  { id: "metal", name: "Metall", preview: "⚙️", category: "Industrial", description: "Metallwand mit Rost" },
  { id: "wood", name: "Holz", preview: "🪵", category: "Street", description: "Alter Holzzaun" },
  { id: "train", name: "Zug", preview: "🚂", category: "Street", description: "Zugwaggon Seitenwand" },
  { id: "underpass", name: "Tunnel", preview: "🌉", category: "Urban", description: "Unterführung Wand" },
]

export const renderBackground = (
  ctx: CanvasRenderingContext2D,
  backgroundId: string,
  width: number,
  height: number,
  customColor?: string,
) => {
  switch (backgroundId) {
    case "none":
      // Transparent background - do nothing
      break
    case "brick-wall":
      renderBrickWall(ctx, width, height)
      break
    case "concrete":
      renderConcrete(ctx, width, height)
      break
    case "subway":
      renderSubwayTiles(ctx, width, height)
      break
    case "metal":
      renderMetalSheet(ctx, width, height)
      break
    case "wood":
      renderWoodFence(ctx, width, height)
      break
    case "train":
      renderTrainCar(ctx, width, height)
      break
    case "underpass":
      renderUnderpass(ctx, width, height)
      break
    case "custom":
      if (customColor && customColor !== "transparent") {
        ctx.fillStyle = customColor
        ctx.fillRect(0, 0, width, height)
      }
      break
    default:
      if (customColor && customColor !== "transparent") {
        ctx.fillStyle = customColor
        ctx.fillRect(0, 0, width, height)
      }
  }
}

const renderBrickWall = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base wall color
  ctx.fillStyle = "#8B4513"
  ctx.fillRect(0, 0, width, height)

  const brickWidth = 60
  const brickHeight = 25
  const mortarWidth = 2

  // Draw bricks
  for (let y = 0; y < height; y += brickHeight + mortarWidth) {
    for (let x = 0; x < width; x += brickWidth + mortarWidth) {
      // Offset every other row
      const offsetX = (Math.floor(y / (brickHeight + mortarWidth)) % 2) * (brickWidth / 2)
      const brickX = x + offsetX

      // Brick color variation
      const variation = Math.random() * 30 - 15
      const red = Math.max(0, Math.min(255, 139 + variation))
      const green = Math.max(0, Math.min(255, 69 + variation))
      const blue = Math.max(0, Math.min(255, 19 + variation))

      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
      ctx.fillRect(brickX, y, brickWidth, brickHeight)

      // Mortar lines
      ctx.fillStyle = "#D3D3D3"
      ctx.fillRect(brickX + brickWidth, y, mortarWidth, brickHeight + mortarWidth)
      ctx.fillRect(brickX, y + brickHeight, brickWidth, mortarWidth)
    }
  }

  // Add weathering and texture
  addWeathering(ctx, width, height, 0.1)
}

const renderConcrete = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base concrete color
  ctx.fillStyle = "#696969"
  ctx.fillRect(0, 0, width, height)

  // Add concrete texture
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 3 + 1
    const opacity = Math.random() * 0.3 + 0.1

    ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${opacity})`
    ctx.fillRect(x, y, size, size)
  }

  // Add cracks
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
  ctx.lineWidth = 1
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }

  addWeathering(ctx, width, height, 0.15)
}

const renderSubwayTiles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base tile color
  ctx.fillStyle = "#F5F5DC"
  ctx.fillRect(0, 0, width, height)

  const tileWidth = 40
  const tileHeight = 40
  const groutWidth = 2

  // Draw tiles
  for (let y = 0; y < height; y += tileHeight + groutWidth) {
    for (let x = 0; x < width; x += tileWidth + groutWidth) {
      // Tile color variation
      const variation = Math.random() * 20 - 10
      const baseColor = 245 + variation

      ctx.fillStyle = `rgb(${baseColor}, ${baseColor}, ${Math.max(220, baseColor - 25)})`
      ctx.fillRect(x, y, tileWidth, tileHeight)

      // Grout
      ctx.fillStyle = "#C0C0C0"
      ctx.fillRect(x + tileWidth, y, groutWidth, tileHeight + groutWidth)
      ctx.fillRect(x, y + tileHeight, tileWidth, groutWidth)
    }
  }

  // Add dirt and stains
  addWeathering(ctx, width, height, 0.2)
}

const renderMetalSheet = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base metal color
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, "#C0C0C0")
  gradient.addColorStop(0.5, "#808080")
  gradient.addColorStop(1, "#696969")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Add rust spots
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 20 + 10

    const rustGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    rustGradient.addColorStop(0, "rgba(139, 69, 19, 0.8)")
    rustGradient.addColorStop(0.5, "rgba(160, 82, 45, 0.6)")
    rustGradient.addColorStop(1, "rgba(139, 69, 19, 0)")

    ctx.fillStyle = rustGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Add scratches
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
  ctx.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }
}

const renderWoodFence = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base wood color
  ctx.fillStyle = "#8B4513"
  ctx.fillRect(0, 0, width, height)

  const plankWidth = 80
  const plankGap = 2

  // Draw wood planks
  for (let x = 0; x < width; x += plankWidth + plankGap) {
    // Wood grain color variation
    const variation = Math.random() * 40 - 20
    const red = Math.max(0, Math.min(255, 139 + variation))
    const green = Math.max(0, Math.min(255, 69 + variation / 2))
    const blue = Math.max(0, Math.min(255, 19 + variation / 4))

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
    ctx.fillRect(x, 0, plankWidth, height)

    // Wood grain lines
    ctx.strokeStyle = `rgba(${red - 30}, ${green - 20}, ${blue - 10}, 0.5)`
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const grainY = (height / 5) * i + Math.random() * 20
      ctx.beginPath()
      ctx.moveTo(x, grainY)
      ctx.lineTo(x + plankWidth, grainY + Math.random() * 10 - 5)
      ctx.stroke()
    }
  }

  addWeathering(ctx, width, height, 0.1)
}

const renderTrainCar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Base train car color
  ctx.fillStyle = "#4682B4"
  ctx.fillRect(0, 0, width, height)

  // Add horizontal lines (typical of train cars)
  ctx.strokeStyle = "#2F4F4F"
  ctx.lineWidth = 3
  for (let y = height * 0.2; y < height * 0.8; y += 40) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Add rivets
  ctx.fillStyle = "#2F4F4F"
  for (let x = 20; x < width; x += 60) {
    for (let y = 30; y < height; y += 50) {
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  addWeathering(ctx, width, height, 0.25)
}

const renderUnderpass = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Dark concrete base
  ctx.fillStyle = "#2F2F2F"
  ctx.fillRect(0, 0, width, height)

  // Add stains and discoloration
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 50 + 20

    const stainGradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    stainGradient.addColorStop(0, "rgba(0, 0, 0, 0.5)")
    stainGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    ctx.fillStyle = stainGradient
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Add water damage streaks
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width
    const streakHeight = Math.random() * height * 0.6 + height * 0.2
    ctx.fillRect(x, 0, 2 + Math.random() * 3, streakHeight)
  }
}

const addWeathering = (ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number) => {
  // Add dirt and grime
  for (let i = 0; i < width * height * intensity * 0.001; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 2 + 1
    const opacity = Math.random() * 0.3

    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
}
