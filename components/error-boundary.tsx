"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-red-900/20 border-red-500/30 p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Etwas ist schiefgelaufen</h2>
          <p className="text-gray-300 mb-6">Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.</p>
          <div className="space-y-2 text-sm text-gray-400 mb-6">
            {this.state.error && (
              <details className="text-left bg-gray-800 p-4 rounded">
                <summary className="cursor-pointer">Technische Details</summary>
                <pre className="mt-2 text-xs overflow-auto">{this.state.error.message}</pre>
              </details>
            )}
          </div>
          <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600">
            <RefreshCw className="mr-2 h-4 w-4" />
            Seite neu laden
          </Button>
        </Card>
      )
    }

    return this.props.children
  }
}
