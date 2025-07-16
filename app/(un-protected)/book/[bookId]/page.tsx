"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addToCart } from "@/actions/addToCart";
import { toast } from "sonner";

// Dummy data for the book
const dummyBook = {
  id: "1",
  title: "The Last Shadow",
  author: "Orson Scott Card",
  description:
    "The thrilling conclusion to the Ender's Game series, The Last Shadow is a story of heroism, sacrifice, and the bonds of family. When a new threat emerges to challenge the fragile peace between the species, it's up to Ender and his allies to save the world once more.",
  coverImage: "/images/placeholder-book-cover.png", // Replace with a real image path
  price: 29.99,
};

// Dummy data for reviews
const dummyReviews = [
  {
    id: "1",
    user: "Jane Doe",
    avatar: "/images/avatar-1.png",
    rating: 5,
    comment:
      "An absolutely fantastic read! I couldn't put it down. The characters are so well-developed, and the plot is gripping.",
  },
  {
    id: "2",
    user: "John Smith",
    avatar: "/images/avatar-2.png",
    rating: 4,
    comment:
      "A great addition to the series. The ending was a bit rushed, but overall, a very satisfying conclusion.",
  },
];

export default function BookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const [book, setBook] = useState(dummyBook)
  const [reviews, setReviews] = useState(dummyReviews)

  useEffect(() => {
    // In a real application, you would fetch the book data and reviews based on the params.bookId
    console.log("Fetching data for book:", params.bookId)
    // For now, we just use the dummy data
    setBook({ ...dummyBook, id: params.bookId })
  }, [params.bookId])

  const handleAddToCart = async () => {
    try {
      // In a real app, you might want to pass more book details
      const result = await addToCart(book.id)
      if (result.success) {
        toast.success("Book added to cart!")
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
          <p className="text-lg mb-6">{book.description}</p>
          <div className="flex items-center justify-between mb-6">
            <p className="text-3xl font-bold">${book.price.toFixed(2)}</p>
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>User Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.user} />
                  <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.353 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">{review.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
