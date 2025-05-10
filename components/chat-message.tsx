"use client"

import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "@/types/chat"
import ReactMarkdown from "react-markdown"
import { ThumbsUp, ThumbsDown, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false)

  // Function to safely check if content includes a string
  const safeIncludes = (content: string | undefined, searchString: string): boolean => {
    return typeof content === "string" && content.includes(searchString)
  }

  // Function to format the message content with special styling for prediction format
  const formatContent = (content: string | undefined) => {
    if (!content) {
      return <p>No content to display</p>
    }

    // Check if the message contains the prediction format
    if (message.role === "assistant" && safeIncludes(content, "📈 PREDICTION SUMMARY")) {
      try {
        // Split the content into sections
        const sections = content.split(/(?=🧠 WHY ARCIUZ THINKS THIS|📰 NEWS & SIGNAL SOURCES)/g)

        return (
          <>
            {sections.map((section, index) => {
              try {
                const lines = section.split("\n")
                const sectionTitle = lines.length > 0 ? lines[0].trim() : ""
                const sectionContent = lines.length > 1 ? lines.slice(1).join("\n") : ""

                if (sectionTitle === "📈 PREDICTION SUMMARY") {
                  // Format prediction summary section
                  const contentLines = sectionContent.split("\n").filter((line) => line.trim() !== "")
                  return (
                    <div key={index} className="bg-primary/5 p-4 rounded-md mb-4">
                      <h3 className="text-lg font-bold mb-2">{sectionTitle}</h3>
                      {contentLines.map((line, i) => {
                        try {
                          const parts = line.split(":")
                          const key = parts.length > 0 ? parts[0].trim() : ""
                          const value = parts.length > 1 ? parts.slice(1).join(":").trim() : ""

                          return (
                            <div key={i} className="flex justify-between mb-1">
                              <span className="font-medium">{key}:</span>
                              <span
                                className={cn(
                                  safeIncludes(value, "up")
                                    ? "text-green-500"
                                    : safeIncludes(value, "down")
                                      ? "text-red-500"
                                      : "",
                                )}
                              >
                                {value}
                              </span>
                            </div>
                          )
                        } catch (err) {
                          return <div key={i}>{line}</div>
                        }
                      })}
                    </div>
                  )
                } else if (sectionTitle === "🧠 WHY ARCIUZ THINKS THIS") {
                  // Format reasoning section
                  return (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-bold mb-2">{sectionTitle}</h3>
                      <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                        {sectionContent}
                      </ReactMarkdown>
                    </div>
                  )
                } else if (sectionTitle === "📰 NEWS & SIGNAL SOURCES") {
                  // Format sources section
                  return (
                    <div key={index} className="bg-muted/30 p-4 rounded-md mb-4">
                      <h3 className="text-lg font-bold mb-2">{sectionTitle}</h3>
                      <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                        {sectionContent}
                      </ReactMarkdown>
                    </div>
                  )
                } else {
                  // Default formatting for other content
                  return (
                    <ReactMarkdown key={index} className="prose prose-sm dark:prose-invert max-w-none">
                      {section}
                    </ReactMarkdown>
                  )
                }
              } catch (err) {
                return <div key={index}>{section}</div>
              }
            })}
          </>
        )
      } catch (err) {
        // Fallback to regular markdown if any error occurs in the formatting
        return <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">{content}</ReactMarkdown>
      }
    } else {
      // Regular markdown formatting for non-prediction messages
      return <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">{content}</ReactMarkdown>
    }
  }

  return (
    <div className={cn("flex items-start gap-3 py-4 fade-in")}>
      {message.role === "user" ? (
        <Avatar className="h-8 w-8 bg-secondary">
          <div className="text-secondary-foreground text-xs font-bold">You</div>
        </Avatar>
      ) : (
        <Avatar className="h-8 w-8 bg-primary/10">
          <div className="text-primary text-xs font-bold">AI</div>
        </Avatar>
      )}
      <div className="flex-1 space-y-2">
        <div className={cn("message-content")}>{formatContent(message.content)}</div>

        {message.role === "assistant" && (
          <>
            {/* Sources toggle - would be implemented with real data */}
            {safeIncludes(message.content, "NEWS & SIGNAL SOURCES") && (
              <button
                onClick={() => setShowSources(!showSources)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                {showSources ? "Hide source details" : "Show source details"}
              </button>
            )}

            {showSources && (
              <div className="mt-2 text-xs text-muted-foreground bg-background/50 p-2 rounded-md">
                <p>Source 1: Financial Times - Market Analysis (Confidence: High)</p>
                <p>Source 2: Bloomberg Financial Report (Confidence: Medium)</p>
                <p>Source 3: Reddit r/CryptoCurrency Sentiment Analysis (Confidence: Medium)</p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-glow">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Regenerate</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-glow">
                <ThumbsUp className="h-4 w-4" />
                <span className="sr-only">Helpful</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover-glow">
                <ThumbsDown className="h-4 w-4" />
                <span className="sr-only">Not helpful</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
