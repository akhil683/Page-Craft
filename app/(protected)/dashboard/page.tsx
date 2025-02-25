"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBook } from "@/actions/createBook"
import { toast } from "sonner"

const previousBooks = [
  { id: 1, title: "The Lost City", description: "An adventure novel" },
  { id: 2, title: "Echoes of Time", description: "A sci-fi thriller" },
  { id: 3, title: "Whispers in the Wind", description: "A collection of poetry" },
]

export default function Dashboard() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookDescription, setNewBookDescription] = useState("")

  const handleCreateBook = async () => {
    if (!newBookTitle || !newBookDescription) {
      toast("Title and description is required.")
      return
    }

    try {
      const res = await createBook(newBookTitle, newBookDescription)
      console.log(res)
      setNewBookTitle("")
      setNewBookDescription("")
      setIsModalOpen(false)
      router.push("/dashboard/edit/1")
    } catch (createError) {
      toast("Unexpected error occured.")
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Your Books</h1>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Create New Book
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">Description (up to 100 words)</label>
              <Textarea
                id="description"
                value={newBookDescription}
                onChange={(e) => setNewBookDescription(e.target.value)}
                placeholder="Enter book description"
                rows={4}
              />
            </div>
          </div>
          <Button onClick={handleCreateBook}>Proceed to Edit</Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {previousBooks.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <Link href={`/dashboard/edit/${book.id}`}>
              <Button>Edit Book</Button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

