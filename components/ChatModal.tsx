"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import logo from "../public/images/logo_wihout_bg.png"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, Bot, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "./ui/textarea"
import { useSession } from "next-auth/react"
import Image from "next/image"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prismLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ModalChat() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Bot className="w-4 h-4 mr-1" />
            Chat with AI
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-7xl w-[90%] rounded-xl max-md:p-2">
          <DialogHeader>
            <DialogTitle>Andomeda Intelligence (AI)</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[80vh]">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length < 1 && (
                <div className="h-full flex justify-center items-center w-full">
                  <div className="flex flex-col justify-center items-center">
                    <Image src={logo} width={300} height={300} className="h-28 md:36 w-28 md:w-36" alt="Logo" />
                    <p className="max-md:text-sm text-gray-700">Start talking to Andromeda AI</p>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div key={message.id} className={`flex overflow-hidden ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`flex items-center gap-2 mb-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                      {message.role === "user" ? (
                        <>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={session?.user?.image as string} className="border rounded-full" alt="User" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        </>
                      ) : (
                        <>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        </>
                      )}
                      <span className="font-medium">
                        {message.role === "user" ? session?.user?.name : "Andromeda AI"}
                      </span>
                    </div>
                    <div className="max-w-[80vw] md:max-w-[100%] text-gray-800 overflow-hidden">
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={prismLight}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    {/* <div */}
                    {/*   className={`prose rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted" */}
                    {/*     }`} */}
                    {/* > */}
                    {/*   {message.content} */}
                    {/**/}
                    {/* </div> */}
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
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-500 shadow-gray-500 bg-gray-200 md:p-4 p-2 rounded-2xl">
              <form onSubmit={handleSubmit} className="flex items-end space-x-2 overflow-hidden">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask Andomeda..."
                  className="flex-1 border-none shadow-none focus-visible:ring-transparent resize-none md:text-xl"
                  onKeyDown={handleKeyPress}
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
    </div >
  )
}

