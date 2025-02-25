"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db/db"
import { books } from "@/lib/db/schema"

export async function createBook(title: string, description: string) {
  const user = await auth()
  console.log(user)
  if (!title || !description) {
    return {
      success: false, error: "Title and description is required."
    }
  }
  try {
    const newBook = await db
      .insert(books)
      .values({
        title: title,
        description,
        authorId: user?.user?.id as string,
        coverImage: "",
        fileUrl: "",
        isPublic: true,
      })
    console.log(newBook)
  } catch (createError) {
    console.log(createError)
    return {
      success: false, error: "Unexpected error occured."
    }
  }

}
