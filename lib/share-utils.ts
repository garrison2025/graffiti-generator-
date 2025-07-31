export const shareDesign = async (canvas: HTMLCanvasElement, text?: string) => {
  if (!canvas) return

  try {
    canvas.toBlob(async (blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], `graffiti-${text || "design"}.png`, { type: "image/png" })
        await navigator.share({
          title: `Mein Graffiti: ${text || "Design"}`,
          text: `Schau dir mein cooles Graffiti an, erstellt mit dem Graffiti Generator!`,
          files: [file],
        })
      } else {
        // Fallback: copy link to clipboard
        const url = `${window.location.origin}/api/generate-og?text=${encodeURIComponent(text || "GRAFFITI")}`
        await navigator.clipboard.writeText(url)
        alert("Link in Zwischenablage kopiert!")
      }
    })
  } catch (error) {
    console.error("Sharing failed:", error)
    // Fallback to download
    downloadImage(canvas, `graffiti-${text || "design"}.png`)
  }
}

// Import downloadImage function
const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
