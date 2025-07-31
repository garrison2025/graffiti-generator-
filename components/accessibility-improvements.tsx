"use client"

import type React from "react"

import { useEffect } from "react"

interface AccessibilityImprovementsProps {
  children: React.ReactNode
}

export function AccessibilityImprovements({ children }: AccessibilityImprovementsProps) {
  useEffect(() => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Zum Hauptinhalt springen"
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-400 focus:text-black focus:px-4 focus:py-2 focus:rounded"
    skipLink.setAttribute("aria-label", "Zum Hauptinhalt springen")

    document.body.insertBefore(skipLink, document.body.firstChild)

    // Announce page changes to screen readers
    const announcePageChange = (message: string) => {
      const announcement = document.createElement("div")
      announcement.setAttribute("aria-live", "polite")
      announcement.setAttribute("aria-atomic", "true")
      announcement.className = "sr-only"
      announcement.textContent = message

      document.body.appendChild(announcement)

      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }

    // Listen for route changes
    const handleRouteChange = () => {
      announcePageChange("Seite geladen")
    }

    // Add focus management for modals
    const manageFocus = (element: HTMLElement) => {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    }

    // Improve color contrast warnings
    const checkColorContrast = () => {
      const elements = document.querySelectorAll('[style*="color"]')
      elements.forEach((element) => {
        const styles = window.getComputedStyle(element)
        const color = styles.color
        const backgroundColor = styles.backgroundColor

        // Basic contrast check (simplified)
        if (color && backgroundColor) {
          const colorLuminance = getLuminance(color)
          const bgLuminance = getLuminance(backgroundColor)
          const contrast =
            (Math.max(colorLuminance, bgLuminance) + 0.05) / (Math.min(colorLuminance, bgLuminance) + 0.05)

          if (contrast < 4.5) {
            console.warn("Low color contrast detected:", element)
          }
        }
      })
    }

    // Helper function to calculate luminance
    const getLuminance = (color: string): number => {
      // Simplified luminance calculation
      const rgb = color.match(/\d+/g)
      if (!rgb) return 0

      const [r, g, b] = rgb.map((x) => {
        const val = Number.parseInt(x) / 255
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      })

      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    // Add keyboard navigation improvements
    const improveKeyboardNavigation = () => {
      document.addEventListener("keydown", (e) => {
        // Escape key to close modals
        if (e.key === "Escape") {
          const modals = document.querySelectorAll('[role="dialog"]')
          modals.forEach((modal) => {
            if (modal instanceof HTMLElement && modal.style.display !== "none") {
              const closeButton = modal.querySelector('[aria-label*="schließen"], [aria-label*="close"]')
              if (closeButton instanceof HTMLElement) {
                closeButton.click()
              }
            }
          })
        }

        // Tab trapping in modals
        if (e.key === "Tab") {
          const activeModal = document.querySelector('[role="dialog"]:not([style*="display: none"])')
          if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            )

            if (focusableElements.length > 0) {
              const firstElement = focusableElements[0] as HTMLElement
              const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

              if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement.focus()
              } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()
              }
            }
          }
        }
      })
    }

    // Initialize improvements
    handleRouteChange()
    improveKeyboardNavigation()

    // Check contrast periodically (development only)
    if (process.env.NODE_ENV === "development") {
      setTimeout(checkColorContrast, 2000)
    }

    return () => {
      // Cleanup
      const skipLinkElement = document.querySelector('a[href="#main-content"]')
      if (skipLinkElement) {
        document.body.removeChild(skipLinkElement)
      }
    }
  }, [])

  return (
    <div>
      {/* Screen reader announcements */}
      <div id="sr-announcements" aria-live="polite" aria-atomic="true" className="sr-only" />

      {/* Main content wrapper */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
