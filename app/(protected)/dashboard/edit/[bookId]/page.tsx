"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
} from "lucide-react"
import ModalChat from "@/components/ChatModal"


export default function EditBook() {
  const [content, setContent] = useState("<p>Start writing your book here...</p>")

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const saveChanges = () => {
    // Here you would typically send the content to your backend
    console.log("Saving changes:", content)
    // Implement your save logic here
  }

  return (
    <div className="mx-auto p-4 mt-16">
      <div className="flex max-md:flex-col md:justify-between md:items-center mb-4">
        <h1 className="md:text-2xl text-xl font-bold">Edit Book: </h1>
        <div className="flex gap-4 items-center max-md:justify-between max-md:w-full max-md:mt-2">
          <ModalChat />
          <Button onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 md:border rounded-lg md:p-4">
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="prose max-w-none min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto border rounded-lg p-4"
          />
        </div>
        <div className="flex-1 border rounded-lg p-4">
          <div
            className="prose max-w-none min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  )
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap md:gap-2 gap-1 mb-4 p-2 border rounded-lg bg-muted">
      <Button
        size="icon"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="hover:bg-gray-200"
      >
        <Bold className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="hover:bg-gray-200"
      >
        <Italic className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("underline") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="hover:bg-gray-200"
      >
        <UnderlineIcon className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="hover:bg-gray-200"
      >
        <Heading1 className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="hover:bg-gray-200"
      >
        <Heading2 className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="hover:bg-gray-200"
      >
        <List className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="hover:bg-gray-200"
      >
        <ListOrdered className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="hover:bg-gray-200"
      >
        <AlignLeft className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="hover:bg-gray-200"
      >
        <AlignCenter className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="hover:bg-gray-200"
      >
        <AlignRight className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
      <Button
        size="icon"
        variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="hover:bg-gray-200"
      >
        <Quote className="md:h-4 md:w-4 h-2 w-2" />
      </Button>
    </div>
  )
}
