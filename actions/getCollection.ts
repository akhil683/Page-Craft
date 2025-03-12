"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { books, collectionBooks, collections } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getCollectionItems() {
  const session = await auth()

  const userCollection = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, session?.user?.id as string))
    .limit(1)

  if (!userCollection) return [];

  return await db
    .select({
      id: collectionBooks.id,
      book: books,
    })
    .from(collectionBooks)
    .where(eq(collectionBooks.collectionId, userCollection[0].id))
    .innerJoin(books, eq(collectionBooks.bookId, books.id));
}
