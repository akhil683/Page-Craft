"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function BookPreviewCard() {
  const onCartClick = () => {
    alert("hello")
  }

  return (
    <Card className="overflow-hidden border-2 border-transparent hover:border-gray-200 hover:shadow-2xl duration-200 shadow-lg max-w-sm mx-auto">
      <div className="flex flex-col">
        <div className="relative w-full h-[250px]">
          <Image
            src="https://marketplace.canva.com/EAF-jFqBHBA/1/0/900w/canva-blue-book-reading-concept-phone-wallpaper-F51QYzgB6q0.jpg"
            alt="Book cover"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link href={"/book/1"} className="text-xl hover:underline">The Midnight Library</Link>
                <span className="font-bold text-primary">$19.99</span>
              </div>
              <p className="text-muted-foreground">by {" "}
                <Link href={`/user/1`} className="hover:underline">Matt Haig</Link>
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">4.2</span>
                </div>
                <Badge variant="secondary" className="px-2 py-1">
                  12,345 purchases
                </Badge>
              </div>
            </div>

            {/* <div> */}
            {/*   <p className="text-sm text-muted-foreground leading-relaxed"> */}
            {/*     Between life and death there is a library, and within that library, the shelves go on forever. Every */}
            {/*     book provides a chance to try another life you could have lived. */}
            {/*   </p> */}
            {/* </div> */}

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Fiction</Badge>
              <Badge variant="outline">Fantasy</Badge>
              <Badge variant="outline">Contemporary</Badge>
            </div>
          </CardContent>

          <CardFooter className="p-0 pt-4">
            <Button onClick={onCartClick} className="w-full">Add to Cart</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}

