import { Header } from "@/components/header"
import { NewsPage } from "@/components/news/news-page"

export default function News() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <NewsPage />
    </main>
  )
}
