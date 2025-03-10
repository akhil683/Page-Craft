"use client"

import { LogOut, Menu, X } from "lucide-react"
import logo from "../public/images/logo_wihout_bg.png"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { toast } from "sonner"
import Image from "next/image"

const navOptions = [
  {
    name: "Explore",
    link: "/explore",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Features",
    link: "/features",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "About",
    link: "/about",
  },
]

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
    <nav className="fixed top-0 w-full z-30">
      <header className="z-50 mx-auto backdrop-blur-3xl md:px-12 px-4">
        <div className="container flex h-16 mx-auto items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              width={100}
              height={100}
              className="w-14 h-14"
              alt="Page Craft Logo" />
            <span className="font-bold md:text-lg">Page Craft</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navOptions.map(route => (
              <Link
                key={route.link}
                href={route.link}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex space-x-2">
            {session ? (
              <Button onClick={handleSignOut} className="rounded-full flex justify-center items-center gap-2">
                <Image
                  className="h-6 w-6 rounded-full"
                  src={session?.user?.image as string}
                  alt={session?.user?.name as string}
                  width={50}
                  height={50}
                />
                <LogOut className="w-8 h-8" />
              </Button>
            ) : (
              <Button onClick={handleSignIn} disabled={loading} className="rounded-full">
                Sign In
              </Button>
            )}
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
        <div className="absolute  top-2 right-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <Image src={logo} width={300} height={300} alt="Page Craft Logo" />
        </div>
        <nav className="space-y-12 px-4">
          <div className="flex flex-col gap-6">
            {navOptions.map((route => (
              <Link
                key={route.link}
                href={route.link}
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            )))}
          </div>
          {session ? (
            <Button onClick={handleSignOut} className="rounded-full w-full py-4 flex justify-center items-center gap-2">
              <Image
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={50}
                height={50}
                className="h-6 w-6 rounded-full"
              />
              <LogOut className="w-8 h-8" />
            </Button>
          ) : (
            <Button onClick={handleSignIn} disabled={loading} className="rounded-full">
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </nav>
  )
}
