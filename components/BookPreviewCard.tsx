'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// This would typically be passed as a prop
const book = {
  id: '1',
  title: 'The Midnight Library',
  author: 'Matt Haig',
  authorId: '1',
  coverImage:
    'https://marketplace.canva.com/EAF-jFqBHBA/1/0/900w/canva-blue-book-reading-concept-phone-wallpaper-F51QYzgB6q0.jpg',
  price: 19.99,
  rating: 4.2,
  purchases: 12345,
  tags: ['Fiction', 'Fantasy', 'Contemporary'],
}

export default function BookPreviewCard() {
  return (
    <Link href={`/book/${book.id}`} className="block w-full h-full">
      <Card className="overflow-hidden border-2 border-transparent hover:border-primary hover:shadow-2xl duration-200 shadow-lg flex flex-col h-full">
        <div className="relative w-full h-[250px]">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6 flex-1">
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{book.title}</h3>
                <span className="font-bold text-primary">${book.price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground">by {book.author}</p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
                <Badge variant="secondary" className="px-2 py-1">
                  {book.purchases.toLocaleString()} sales
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {book.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

