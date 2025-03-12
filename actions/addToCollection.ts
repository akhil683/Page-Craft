"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { collectionBooks, collections } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function addToCollection(bookId: number, name: string, quantity = 1) {
  const session = await auth()
  const userId = session?.user?.id as string

  // Find or create collection
  let userCollection = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId))

  if (!userCollection) {
    userCollection = await db
      .insert(collections)
      .values({
        userId,
        name,
      }).returning();
  }
  // const existingItem = await db.query.collectionBooks.findFirst({
  //   where: (ci, { eq }) => eq(ci.collectionId, userCollection.id) && eq(ci.bookId, bookId),
  // });
  //
  // if (existingItem) {
  //   // Update quantity if the book is already in the collection
  //   await db.update(collectionBooks).set({
  //     quantity: existingItem.quantity + quantity,
  //   }).where(
  //     (ci, { eq }) => eq(ci.collectionId, userCollection.id) && eq(ci.bookId, bookId)
  //   );
  // } else {
  //   // Insert new book into collection
  //   await db.insert(collectionBooks).values({
  //     collectionId: userCollection.id,
  //     bookId,
  //     quantity,
  //   });
  // }
}
