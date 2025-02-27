import { db } from "./db"
import { books } from "./schema"
import { eq } from "drizzle-orm"

export async function getBooksByAuthor(authorId: string | undefined) {
  if (!authorId) return

  const booksByAuthor = await db
    .select()
    .from(books)
    .where(eq(books.authorId, authorId))

  return booksByAuthor
}

export async function getAllBooks() {
  const allBooks = await db
    .select()
    .from(books)

  return allBooks
}
