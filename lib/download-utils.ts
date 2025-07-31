export const downloadImage = (canvas: HTMLCanvasElement, filename?: string) => {
  if (!canvas) return

  const link = document.createElement("a")
  link.download = filename || `graffiti-${Date.now()}.png`
  link.href = canvas.toDataURL()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
