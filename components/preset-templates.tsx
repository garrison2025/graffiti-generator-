"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Star, Flame, Snowflake } from "lucide-react"

interface Template {
  id: string
  name: string
  text: string
  font: string
  textColor: string
  backgroundColor: string
  strokeColor: string
  strokeWidth: number
  icon: any
  description: string
}

const PRESET_TEMPLATES: Template[] = [
  {
    id: "fire-style",
    name: "Feuer",
    text: "FIRE",
    font: "fire",
    textColor: "#FF4500",
    backgroundColor: "transparent",
    strokeColor: "#8B0000",
    strokeWidth: 3,
    icon: Flame,
    description: "Heiße Graffiti-Optik",
  },
  {
    id: "neon-glow",
    name: "Neon",
    text: "NEON",
    font: "neon",
    textColor: "#00FFFF",
    backgroundColor: "#000000",
    strokeColor: "#0080FF",
    strokeWidth: 2,
    icon: Zap,
    description: "Leuchtende Neon-Schrift",
  },
  {
    id: "ice-cold",
    name: "Eis",
    text: "ICE",
    font: "ice",
    textColor: "#87CEEB",
    backgroundColor: "transparent",
    strokeColor: "#4682B4",
    strokeWidth: 4,
    icon: Snowflake,
    description: "Kühle Eis-Optik",
  },
  {
    id: "classic-bubble",
    name: "Bubble",
    text: "BUBBLE",
    font: "bubble",
    textColor: "#FF6B35",
    backgroundColor: "transparent",
    strokeColor: "#000000",
    strokeWidth: 5,
    icon: Star,
    description: "Klassische Bubble-Letters",
  },
]

interface PresetTemplatesProps {
  onApplyTemplate: (template: Template) => void
  isVisible: boolean
  onToggle: () => void
}

export function PresetTemplates({ onApplyTemplate, isVisible, onToggle }: PresetTemplatesProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <button onClick={onToggle} className="w-full flex items-center justify-between text-lg font-semibold mb-4">
        <span className="flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Schnellstart Templates
        </span>
        <span className={`transform transition-transform ${isVisible ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isVisible && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">Wähle ein Template für den schnellen Einstieg:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_TEMPLATES.map((template) => {
              const Icon = template.icon
              return (
                <Button
                  key={template.id}
                  onClick={() => onApplyTemplate(template)}
                  variant="outline"
                  className="h-auto p-3 border-gray-600 hover:border-yellow-400 bg-transparent text-left transition-all"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="bg-yellow-400 p-2 rounded-lg flex-shrink-0">
                      <Icon className="h-4 w-4 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">{template.name}</div>
                      <div className="text-xs text-gray-400 mt-1 truncate">{template.description}</div>
                      <div className="text-xs font-mono text-yellow-400 mt-1">"{template.text}"</div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
