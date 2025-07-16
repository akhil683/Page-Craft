"use client"

import { useState, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Save,
} from "lucide-react"
import ModalChat from "@/components/ChatModal"

export default function EditBook({ params }: { params: { bookId: string } }) {
  const [content, setContent] = useState("")
  const [bookTitle, setBookTitle] = useState("Untitled Book")
  const [isSaving, setIsSaving] = useState(false)
  const { bookId } = params

  useEffect(() => {
    console.log("Fetching data for book:", bookId)
    const fetchedContent = `<h1>Chapter 1: The Dragon's Lair</h1><p>This is the story of a brave knight who fought a dragon.</p><h2>The Knight's Journey</h2><p>The knight ventured into the dark cave, his sword gleaming in the faint light.</p><h3>The Treasure</h3><p>Deep within the cave, a treasure awaited.</p><h4>The Escape</h4><p>With the treasure in hand, the knight made his escape.</p>`
    setContent(fetchedContent)
    setBookTitle(`Editing: The Brave Knight`)
  }, [bookId])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use custom one
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base max-w-none mx-auto focus:outline-none p-8",
      },
    },
  })

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  const saveChanges = async () => {
    setIsSaving(true)
    console.log("Saving changes for book:", bookId)
    console.log(content)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 border-b h-16 flex-shrink-0 bg-background z-20">
        <h1 className="text-xl font-bold truncate pr-4">{bookTitle}</h1>
        <div className="flex items-center gap-2">
          <ModalChat />
          <Button onClick={saveChanges} disabled={isSaving} size="sm">
            {isSaving ? "Saving..." : "Save Changes"}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MenuBar editor={editor} />
          <div className="flex-1 overflow-y-auto">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden md:block md:w-1/2 border-l border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800">
          <div
            className="prose dark:prose-invert p-8 max-w-none"
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

  const menuItems = [
    {
      type: "group",
      items: [
        { action: () => editor.chain().focus().toggleBold().run(), icon: Bold, isActive: editor.isActive("bold") },
        { action: () => editor.chain().focus().toggleItalic().run(), icon: Italic, isActive: editor.isActive("italic") },
        { action: () => editor.chain().focus().toggleUnderline().run(), icon: UnderlineIcon, isActive: editor.isActive("underline") },
      ],
    },
    {
      type: "group",
      items: [
        { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), icon: Heading1, isActive: editor.isActive("heading", { level: 1 }) },
        { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: Heading2, isActive: editor.isActive("heading", { level: 2 }) },
        { action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), icon: Heading3, isActive: editor.isActive("heading", { level: 3 }) },
        { action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), icon: Heading4, isActive: editor.isActive("heading", { level: 4 }) },
      ],
    },
    {
      type: "group",
      items: [
        { action: () => editor.chain().focus().toggleBulletList().run(), icon: List, isActive: editor.isActive("bulletList") },
        { action: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, isActive: editor.isActive("orderedList") },
      ],
    },
    {
      type: "group",
      items: [
        { action: () => editor.chain().focus().setTextAlign("left").run(), icon: AlignLeft, isActive: editor.isActive({ textAlign: "left" }) },
        { action: () => editor.chain().focus().setTextAlign("center").run(), icon: AlignCenter, isActive: editor.isActive({ textAlign: "center" }) },
        { action: () => editor.chain().focus().setTextAlign("right").run(), icon: AlignRight, isActive: editor.isActive({ textAlign: "right" }) },
      ],
    },
    {
      type: "group",
      items: [
        { action: () => editor.chain().focus().toggleBlockquote().run(), icon: Quote, isActive: editor.isActive("blockquote") },
      ],
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-background sticky top-0 z-10">
      {menuItems.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center gap-1">
          {groupIndex > 0 && <div className="h-6 border-l mx-2"></div>}
          {group.items.map((item, itemIndex) => (
            <Button key={itemIndex} size="sm" variant={item.isActive ? "secondary" : "ghost"} onClick={item.action}>
              <item.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}