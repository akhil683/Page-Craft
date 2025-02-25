import Link from "next/link"
import { Button } from "@/components/ui/button"
import CreateBook from "./CreateBook"
import { auth } from "@/auth"
import { getBooksByAuthor } from "@/lib/db/query"
import { Suspense } from "react"


export default async function Dashboard() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Your Books</h1>
      <CreateBook />
      <Suspense fallback={<div className="mt-16 text-xl text-gray-500 text-center w-full">Loading...</div>}>
        <BookSection />
      </Suspense>

    </div>
  )
}


const BookSection = async () => {
  const session = await auth()
  const userBooks = await getBooksByAuthor(session?.user?.id) || []

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {userBooks?.length > 0 && (
          userBooks?.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <Link href={`/dashboard/edit/${book.id}`}>
                <Button>Edit Book</Button>
              </Link>
            </div>
          ))
        )}
      </div >
      {userBooks.length < 1 && (
        <div className="w-full mt-16 md:text-2xl text-lg text-gray-600 h-full text-center">
          <p>You have not create a book yet.</p>
        </div>
      )}
    </>
  )
}
