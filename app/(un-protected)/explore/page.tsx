import BookPreviewCard from "@/components/BookPreviewCard";
import { getAllBooks } from "@/lib/db/query";

export default async function Explore() {
  const books = await getAllBooks()
  return (
    <section className="flex flex-col items-center pt-24">
      <div className="max-w-7xl grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <BookPreviewCard />
        <BookPreviewCard />
        <BookPreviewCard />
        <BookPreviewCard />
        <BookPreviewCard />
        <BookPreviewCard />
      </div>
    </section>
  )
}
