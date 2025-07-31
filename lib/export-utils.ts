export type ExportFormat = "png" | "jpg" | "svg" | "webp"

export interface ExportOptions {
  format: ExportFormat
  quality?: number
  width?: number
  height?: number
  backgroundColor?: string
}

export class ExportManager {
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  async exportAs(options: ExportOptions): Promise<string> {
    const { format, quality = 0.9, width, height, backgroundColor } = options

    // 创建临时canvas用于导出
    const exportCanvas = document.createElement("canvas")
    const ctx = exportCanvas.getContext("2d")
    if (!ctx) throw new Error("无法创建导出上下文")

    // 设置导出尺寸
    exportCanvas.width = width || this.canvas.width
    exportCanvas.height = height || this.canvas.height

    // 设置背景色（对JPG格式重要）
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    } else if (format === "jpg") {
      // JPG不支持透明，设置白色背景
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    }

    // 绘制原始内容
    ctx.drawImage(this.canvas, 0, 0, exportCanvas.width, exportCanvas.height)

    // 根据格式导出
    switch (format) {
      case "png":
        return exportCanvas.toDataURL("image/png")
      case "jpg":
        return exportCanvas.toDataURL("image/jpeg", quality)
      case "webp":
        return exportCanvas.toDataURL("image/webp", quality)
      case "svg":
        return this.exportAsSVG()
      default:
        throw new Error(`不支持的导出格式: ${format}`)
    }
  }

  private exportAsSVG(): string {
    // 简化的SVG导出（实际实现会更复杂）
    const { width, height } = this.canvas

    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <canvas width="${width}" height="${height}"></canvas>
          </div>
        </foreignObject>
      </svg>
    `.trim()
  }

  async downloadAs(filename: string, options: ExportOptions): Promise<void> {
    try {
      const dataUrl = await this.exportAs(options)
      const link = document.createElement("a")
      link.download = filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("导出失败:", error)
      throw new Error("导出失败，请重试")
    }
  }
}
