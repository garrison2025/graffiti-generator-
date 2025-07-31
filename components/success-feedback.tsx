"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, Share, Copy } from "lucide-react"

interface SuccessFeedbackProps {
  type: "download" | "share" | "copy" | "save"
  message?: string
  duration?: number
}

export function SuccessFeedback({ type, message, duration = 3000 }: SuccessFeedbackProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case "download":
        return <Download className="h-5 w-5" />
      case "share":
        return <Share className="h-5 w-5" />
      case "copy":
        return <Copy className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const getDefaultMessage = () => {
    switch (type) {
      case "download":
        return "Graffiti erfolgreich heruntergeladen!"
      case "share":
        return "Graffiti geteilt!"
      case "copy":
        return "In Zwischenablage kopiert!"
      case "save":
        return "Einstellungen gespeichert!"
      default:
        return "Erfolgreich!"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        {getIcon()}
        <span className="text-sm font-medium">{message || getDefaultMessage()}</span>
      </div>
    </div>
  )
}
