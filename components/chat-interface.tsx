"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Send, Search, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-message"
import { SuggestedQueries } from "@/components/suggested-queries"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, stop } = useChat()
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Hide suggestions when user starts chatting
  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false)
    }
  }, [messages])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  const handleSuggestedQuery = (query: string) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      formData.set("message", query)
      const submitEvent = new CustomEvent("submit", { bubbles: true, cancelable: true })
      handleInputChange({ target: { value: query } } as React.ChangeEvent<HTMLTextAreaElement>)
      setTimeout(() => formRef.current?.dispatchEvent(submitEvent), 100)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <div className="text-center space-y-4 max-w-lg">
                <h2 className="text-2xl font-bold gradient-text">Welcome to Arciuz</h2>
                <p className="text-muted-foreground">
                  Your AI-powered crypto investment assistant. Ask me about market trends, token performance, or how
                  geopolitical events affect crypto markets.
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 py-4 fade-in">
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
      </ScrollArea>

      {showSuggestions && messages.length === 0 && <SuggestedQueries onSelectQuery={handleSuggestedQuery} />}

      <div className="border-t p-4">
        <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col gap-2 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-3 top-3 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <Textarea
              name="message"
              placeholder="Why is BTC reacting to Middle East tensions?"
              value={input}
              onChange={handleInputChange}
              className="min-h-24 resize-none pl-10 pr-12 rounded-xl bg-card"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (input.trim()) {
                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
                  }
                }
              }}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="spring-button bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <div className="absolute right-12 bottom-2">
              <Button type="button" size="icon" variant="ghost" disabled={true} className="text-muted-foreground">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice input</span>
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Arciuz provides investment insights, not financial advice. Always do your own research.
          </div>
        </form>
      </div>
    </div>
  )
}
