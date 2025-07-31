"use client"

import { useCallback, useEffect } from "react"

interface Settings {
  text: string
  selectedFont: string
  textColor: string
  backgroundColor: string
  strokeColor: string
  strokeWidth: number[]
  textSize: number[]
  rotation: number[]
  letterSpacing: number[]
  selectedBackground: string
  customBgColor: string
  selectedEffect: string
}

interface SettingsManagerProps {
  settings: Settings
  onSettingsLoad: (settings: Partial<Settings>) => void
}

const STORAGE_KEY = "brans-graffiti-settings"
const RECENT_COLORS_KEY = "brans-graffiti-recent-colors"

export function SettingsManager({ settings, onSettingsLoad }: SettingsManagerProps) {
  // Save settings to localStorage
  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.warn("Failed to save settings:", error)
    }
  }, [settings])

  // Load settings from localStorage
  const loadSettings = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsedSettings = JSON.parse(saved)
        onSettingsLoad(parsedSettings)
        return true
      }
    } catch (error) {
      console.warn("Failed to load settings:", error)
    }
    return false
  }, [onSettingsLoad])

  // Reset to default settings
  const resetSettings = useCallback(() => {
    const defaultSettings: Settings = {
      text: "BRANS",
      selectedFont: "wildstyle",
      textColor: "#FF006E",
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: [2],
      textSize: [100],
      rotation: [0],
      letterSpacing: [0],
      selectedBackground: "none",
      customBgColor: "#FFFFFF",
      selectedEffect: "none",
    }

    onSettingsLoad(defaultSettings)

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn("Failed to clear settings:", error)
    }
  }, [onSettingsLoad])

  // Copy current settings to clipboard
  const copySettings = useCallback(async () => {
    try {
      const settingsString = JSON.stringify(settings, null, 2)
      await navigator.clipboard.writeText(settingsString)
      return true
    } catch (error) {
      console.warn("Failed to copy settings:", error)
      return false
    }
  }, [settings])

  // Paste settings from clipboard
  const pasteSettings = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      const parsedSettings = JSON.parse(clipboardText)

      // Validate settings structure
      if (typeof parsedSettings === "object" && parsedSettings.text) {
        onSettingsLoad(parsedSettings)
        return true
      }
    } catch (error) {
      console.warn("Failed to paste settings:", error)
    }
    return false
  }, [onSettingsLoad])

  // Save recent colors
  const saveRecentColor = useCallback((color: string) => {
    try {
      const existing = JSON.parse(localStorage.getItem(RECENT_COLORS_KEY) || "[]")
      const filtered = existing.filter((c: string) => c !== color)
      const updated = [color, ...filtered].slice(0, 8)
      localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(updated))
    } catch (error) {
      console.warn("Failed to save recent color:", error)
    }
  }, [])

  // Get recent colors
  const getRecentColors = useCallback((): string[] => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_COLORS_KEY) || "[]")
    } catch (error) {
      console.warn("Failed to load recent colors:", error)
      return []
    }
  }, [])

  // Auto-save settings when they change
  useEffect(() => {
    const timeoutId = setTimeout(saveSettings, 1000) // Debounce saves
    return () => clearTimeout(timeoutId)
  }, [saveSettings])

  // Load settings on mount
  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  return {
    saveSettings,
    loadSettings,
    resetSettings,
    copySettings,
    pasteSettings,
    saveRecentColor,
    getRecentColors,
  }
}
