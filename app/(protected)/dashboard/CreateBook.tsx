'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBook } from "@/actions/createBook"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function CreateBook() {
  const router = useRouter()
  const [createLoading, setCreateLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookDescription, setNewBookDescription] = useState("")
  const [newBookTags, setNewBookTags] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)

  const handleCreateBook = async () => {
    if (!newBookTitle || !newBookDescription || !coverImage) {
      toast("Title, description, and cover image are required.")
      return
    }

    setCreateLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", newBookTitle)
      formData.append("description", newBookDescription)
      formData.append("tags", newBookTags)
      formData.append("coverImage", coverImage)

      await createBook(formData)

      setNewBookTitle("")
      setNewBookDescription("")
      setNewBookTags("")
      setCoverImage(null)
      setIsModalOpen(false)

      router.push("/dashboard/edit/1")
    } catch (createError) {
      toast("Unexpected error occurred.")
    } finally {
      setCreateLoading(false)
    }
  }

  return (
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
            <label htmlFor="tags">Tags</label>
            <Input
              id="tags"
              value={newBookTags}
              onChange={(e) => setNewBookTags(e.target.value)}
              placeholder="Tags (e.g. horror, biography etc)"
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
          <div className="grid gap-2">
            <label htmlFor="coverImage">Cover Image</label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <Button onClick={handleCreateBook} disabled={createLoading} className="flex justify-center items-center gap-2">
          {createLoading && <Loader2 className="animate-spin" />}
          Create New Book
        </Button>
      </DialogContent>
    </Dialog>
  )
}
