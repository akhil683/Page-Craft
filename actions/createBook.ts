"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";
import AWS from "aws-sdk";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function createBook(formData: FormData) {
  const user = await auth();
  console.log(user);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const coverImage = formData.get("coverImage") as File;

  if (!title || !description || !coverImage) {
    return {
      success: false,
      error: "Title, description, and cover image are required.",
    };
  }

  let coverImageUrl = "";
  const tagArray = tags.split(",").map(tag => tag.trim())

  try {
    // Upload the cover image to AWS S3
    const imageUploadResponse = await uploadImageToS3(coverImage);
    coverImageUrl = imageUploadResponse;

    const newBook = await db.insert(books).values({
      title,
      description,
      tags: tagArray,
      authorId: user?.user?.id as string,
      coverImage: coverImageUrl as string,
      fileUrl: "",
      isPublic: true,
    });

    console.log(newBook);
    return { success: true };
  } catch (createError) {
    console.log(createError);
    return {
      success: false,
      error: "Unexpected error occurred.",
    };
  }
}

async function uploadImageToS3(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `book-covers/${fileName}`,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ACL: "public-read",
  };

  try {
    const { Location } = await s3.upload(uploadParams).promise();
    return Location;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload image to S3");
  }
}
