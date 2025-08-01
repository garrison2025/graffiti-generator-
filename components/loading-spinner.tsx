import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]} text-yellow-400 mr-2`} />
      {text && <span className="text-gray-300">{text}</span>}
    </div>
  )
}
