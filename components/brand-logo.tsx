"use client"

import Image from "next/image"
import Link from "next/link"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
  href?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
}

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
}

export function BrandLogo({ size = "md", showText = true, className = "", href = "/" }: BrandLogoProps) {
  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Image
          src="/android-chrome-192x192.png"
          alt="Graffiti Schrift Generator Logo" // alt 描述文字已更新
          width={size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 96}
          height={size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 96}
          className={`${sizeClasses[size]} object-contain`}
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          {/* --- Logo 文字已修改 --- */}
          <span className={`font-bold text-white ${textSizeClasses[size]}`}>Graffiti Schrift</span>
          <span
            className={`text-yellow-400 font-semibold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}`}
          >
            Generator
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity" aria-label="Zur Startseite">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
