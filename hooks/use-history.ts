"use client"

import { useState, useCallback } from "react"

interface HistoryState {
  text: string
  selectedFont: string
  textColor: string
  backgroundColor: string
  strokeColor: string
  strokeWidth: number[]
  textSize: number[]
  rotation: number[]
  letterSpacing: number[]
}

export function useHistory(initialState: HistoryState) {
  const [history, setHistory] = useState<HistoryState[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const pushState = useCallback(
    (newState: HistoryState) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1)
        newHistory.push(newState)
        // 限制历史记录数量
        if (newHistory.length > 50) {
          newHistory.shift()
          return newHistory
        }
        return newHistory
      })
      setCurrentIndex((prev) => Math.min(prev + 1, 49))
    },
    [currentIndex],
  )

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      return history[currentIndex - 1]
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return history[currentIndex + 1]
    }
    return null
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    currentState: history[currentIndex],
  }
}
