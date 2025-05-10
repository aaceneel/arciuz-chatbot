import { ChatInterface } from "@/components/chat-interface"
import { Header } from "@/components/header"

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
