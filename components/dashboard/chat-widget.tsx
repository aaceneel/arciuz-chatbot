"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Send, RefreshCw } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "ai/react"
import Link from "next/link"
import { ChatMessage } from "@/components/chat-message"

export function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const exampleQueries = [
    "How will tensions in the Middle East affect oil prices?",
    "What's the sentiment around Bitcoin today?",
    "Compare SOL vs AVAX in bull markets",
  ]

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <Tabs defaultValue="assistant" className="w-full">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">AI Assistant</CardTitle>
            <TabsList className="grid grid-cols-2 h-8">
              <TabsTrigger value="assistant" className="text-xs">
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs">
                Detailed Analysis
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="assistant" className="mt-0">
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto pr-4">
                {messages.length === 0 ? (
                  <div className="flex items-start gap-3 py-4">
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <div className="text-primary text-xs font-bold">AI</div>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        Welcome to Arciuz! Ask me about any crypto market movement, geopolitical event impact, or get
                        investment recommendations.
                      </p>
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                        <div className="flex flex-col gap-2">
                          {exampleQueries.map((query, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs justify-start h-auto py-1 px-2"
                              onClick={() => {
                                handleInputChange({ target: { value: query } } as React.ChangeEvent<HTMLInputElement>)
                                setTimeout(() => handleSubmit({} as React.FormEvent<HTMLFormElement>), 100)
                              }}
                            >
                              {query}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => <ChatMessage key={index} message={message} />)
                )}
                {isLoading && (
                  <div className="flex items-start gap-3 py-4">
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <div className="text-primary text-xs font-bold">AI</div>
                    </Avatar>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="pt-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    className="flex-1 min-w-0 px-3 py-2 text-sm bg-card border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about market movements, geopolitical impacts..."
                  />
                  <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <div className="mt-2 text-center">
                  <Link href="/chat" className="text-xs text-primary hover:underline">
                    Open full chat interface
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analysis" className="mt-0">
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Detailed market analysis coming soon</p>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Request Analysis
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}
