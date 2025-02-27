import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function BookPreviewCard() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg max-w-sm mx-auto">
      <div className="flex flex-col">
        <div className="relative w-full h-[250px]">
          <Image src="/placeholder.svg?height=400&width=300" alt="Book cover" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-between p-6">
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold">The Midnight Library</h2>
                <span className="text-xl font-bold text-primary">$19.99</span>
              </div>
              <p className="text-muted-foreground">by Matt Haig</p>

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

            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Between life and death there is a library, and within that library, the shelves go on forever. Every
                book provides a chance to try another life you could have lived.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Fiction</Badge>
              <Badge variant="outline">Fantasy</Badge>
              <Badge variant="outline">Contemporary</Badge>
            </div>
          </CardContent>

          <CardFooter className="p-0 pt-4">
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}

