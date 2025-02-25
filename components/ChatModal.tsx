"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, Bot, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "./ui/textarea"
import { useSession } from "next-auth/react"

export default function ModalChat() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Bot className="w-4 h-4 mr-2" />
            Chat with AI
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-7xl">
          <DialogHeader>
            <DialogTitle>Andomeda Intelligence (AI)</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[80vh]">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`flex items-center gap-2 mb-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                      <Avatar className="h-8 w-8">
                        {message.role === "user" ? (
                          <>
                            <AvatarImage src={session?.user?.image as string} className="border rounded-full" alt="User" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <span className="font-medium">
                        {message.role === "user" ? session?.user?.name : "Andromeda AI"}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-col max-w-[80%] items-start">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">Andromeda</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-500 bg-gray-200 p-4 rounded-2xl">
              <form onSubmit={handleSubmit} className="flex items-end space-x-2 overflow-hidden">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask Andomeda..."
                  className="flex-1 py-4 border-none shadow-none focus-visible:ring-transparent resize-none text-4xl"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading} className="rounded-xl">
                  <ArrowUp className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

