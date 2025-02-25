"use client"

import { BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { toast } from "sonner"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn("google", { callbackUrl: '/dashboard' })
    } catch (SignInError) {
      console.log("Error during signin: ", SignInError)
      toast("Error")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast("Logged out successfully")
    } catch (SignOutError) {
      console.log("Error during signout: ", SignOutError)
    }
  }

  return (
    <nav className="fixed top-0 w-full">
      <header className="z-50 mx-auto backdrop-blur md:px-12 px-4">
        <div className="container flex h-16 mx-auto items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Page Craft</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
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
            <Button onClick={handleSignIn}>Sign In</Button>
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
            href="/dashboard"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
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
