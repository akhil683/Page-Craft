"use client"

import { BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const hello = async () => {
    // const res = await main()
    // console.log(res)
  }
  return (
    <nav>
      <header className="sticky top-0 px-4 z-50 mx-auto w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Page Craft</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="hidden md:flex space-x-2">
            <Button variant="ghost">Log In</Button>
            <Button onClick={hello}>Sign Up</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <Link
            href="#features"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Button variant="ghost" className="justify-start" onClick={() => setIsMenuOpen(false)}>
            Log In
          </Button>
          <Button className="justify-start" onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </Button>
        </nav>
      </div>
    </nav>
  )
}
