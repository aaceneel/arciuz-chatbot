import { Header } from "@/components/header"
import { PortfolioPage } from "@/components/portfolio/portfolio-page"

export default function Portfolio() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <PortfolioPage />
    </main>
  )
}
