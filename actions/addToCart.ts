"use server"

import { auth } from "@/auth"

// This is a placeholder for your actual database logic
const fakeCartDatabase = {
  carts: new Map<string, { items: string[] }>(),
}

export async function addToCart(bookId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { success: false, error: "You must be logged in to add items to the cart." }
  }

  const userId = session.user.id

  try {
    // Get the user's cart or create a new one
    if (!fakeCartDatabase.carts.has(userId)) {
      fakeCartDatabase.carts.set(userId, { items: [] })
    }

    const userCart = fakeCartDatabase.carts.get(userId)!

    // In a real app, you might want to check if the book is already in the cart
    if (userCart.items.includes(bookId)) {
      return { success: false, error: "This book is already in your cart." }
    }

    // Add the book to the cart
    userCart.items.push(bookId)

    console.log(`Book ${bookId} added to cart for user ${userId}`)
    console.log("Current cart state:", fakeCartDatabase.carts)

    return { success: true }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return { success: false, error: "An unexpected error occurred while adding the book to your cart." }
  }
}
