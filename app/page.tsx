import Image from "next/image"
import Link from "next/link"
import logo from "../public/images/page_craft_logo.png"
import { Button } from "@/components/ui/button"
import { BookOpen, Palette, ShoppingBag, ChevronRight } from "lucide-react"

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-7xl">
      <main className="flex-1">
        <section className="min-h-screen flex justify-center items-center w-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Craft Your Story, Design Your Success
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The ultimate platform for aspiring authors, creators, and storytellers. With our cutting-edge AI tools, you can write, design, and publish stunning books.
                </p>
              </div>
              <div className="flex max-md:flex-col gap-2">
                <Button size="lg">
                  Start Writing for Free
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Empower Your Writing Journey
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 p-6 bg-muted rounded-lg transition-all hover:shadow-lg">
                <div className="p-3 bg-primary rounded-full">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Intuitive Book Creation</h3>
                <p className="text-center text-muted-foreground">
                  Our advanced editor makes writing and formatting your book a breeze. Collaborate with editors in
                  real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-muted rounded-lg transition-all hover:shadow-lg">
                <div className="p-3 bg-primary rounded-full">
                  <Palette className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Professional Cover Design</h3>
                <p className="text-center text-muted-foreground">
                  Create stunning book covers with our easy-to-use design tools. Stand out in the crowded marketplace.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-muted rounded-lg transition-all hover:shadow-lg">
                <div className="p-3 bg-primary rounded-full">
                  <ShoppingBag className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Global Marketplace</h3>
                <p className="text-center text-muted-foreground">
                  Sell your books to a worldwide audience. Set your prices, track sales, and grow your author brand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Your Path to Publishing Success
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold">Write Your Masterpiece</h3>
                <p className="text-muted-foreground">
                  Use our powerful editor to bring your story to life. Collaborate seamlessly with editors and beta
                  readers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Design an Eye-Catching Cover</h3>
                <p className="text-muted-foreground">
                  Create a professional cover that captures readers' attention. Use our templates or design from
                  scratch.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Publish and Profit</h3>
                <p className="text-muted-foreground">
                  List your book on our marketplace, set your price, and start earning. Reach readers across the globe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Success Stories from Our Authors
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-muted rounded-lg shadow-lg">
                <Image src="/placeholder.svg" alt="Author" width={64} height={64} className="rounded-full mb-4" />
                <p className="text-muted-foreground italic mb-4">
                  "BookCraft transformed my writing process. The cover design tool is incredible, and I've seen a
                  significant boost in sales!"
                </p>
                <p className="font-semibold mt-auto">Sarah J., Bestselling Author</p>
              </div>
              <div className="flex flex-col p-6 bg-muted rounded-lg shadow-lg">
                <Image src="/placeholder.svg" alt="Author" width={64} height={64} className="rounded-full mb-4" />
                <p className="text-muted-foreground italic mb-4">
                  "The all-in-one platform saves me so much time. Writing, designing, and selling in one place has
                  streamlined my entire publishing journey."
                </p>
                <p className="font-semibold mt-auto">Michael R., Indie Author</p>
              </div>
              <div className="flex flex-col p-6 bg-muted rounded-lg shadow-lg">
                <Image src="/placeholder.svg" alt="Author" width={64} height={64} className="rounded-full mb-4" />
                <p className="text-muted-foreground italic mb-4">
                  "I never thought I could design my own covers, but BookCraft's tools made it easy. My books now look
                  as professional as they read!"
                </p>
                <p className="font-semibold mt-auto">Emily T., Self-Published Author</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Choose Your Publishing Journey
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col p-6 bg-background rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Aspiring Author</h3>
                <p className="text-4xl font-bold mb-6">
                  $9.99<span className="text-base font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Write up to 3 books
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Basic cover design tools
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Sell on marketplace (15% fee)
                  </li>
                </ul>
                <Button>Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-primary text-primary-foreground rounded-lg shadow-lg scale-105 transform transition-transform">
                <h3 className="text-2xl font-bold mb-4">Professional Author</h3>
                <p className="text-4xl font-bold mb-6">
                  $24.99<span className="text-base font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4" /> Unlimited books
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4" /> Advanced cover design tools
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4" /> Sell on marketplace (10% fee)
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4" /> Marketing tools
                  </li>
                </ul>
                <Button variant="secondary">Choose Pro</Button>
              </div>
              <div className="flex flex-col p-6 bg-background rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Publisher</h3>
                <p className="text-4xl font-bold mb-6">Custom</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> All Pro features
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Custom integrations
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Dedicated support
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" /> Lower marketplace fees
                  </li>
                </ul>
                <Button variant="outline">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Author Journey Today
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of authors who are creating, designing, and selling their books with PageCraft. Your
                success story starts here.
              </p>
              <Button size="lg" className="mt-6">
                Begin Your Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold">Product</h3>
              <Link href="#" className="text-sm hover:underline">
                Features
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Testimonials
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold">Company</h3>
              <Link href="#" className="text-sm hover:underline">
                About Us
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Careers
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Press
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold">Resources</h3>
              <Link href="#" className="text-sm hover:underline">
                Blog
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Help Center
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Community
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-bold">Legal</h3>
              <Link href="#" className="text-sm hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center justice space-x-2">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Page Craft Logo"
              />
              <span className="text-lg">Page Craft</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">© 2024 Page Craft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div >
  )
}

