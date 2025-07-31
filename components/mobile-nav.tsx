"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Type, Users, Mail } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Generator", icon: Type },
    { href: "/ueber-uns", label: "Über uns", icon: Users },
    { href: "/kontakt", label: "Kontakt", icon: Mail },
  ]

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-400">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-lg z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Icon className="h-5 w-5 mr-3 text-yellow-400" />
                    <span className="text-white">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
