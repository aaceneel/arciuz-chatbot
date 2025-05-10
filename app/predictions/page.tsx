import { Header } from "@/components/header"
import { PredictionsPage } from "@/components/predictions/predictions-page"

export default function Predictions() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <PredictionsPage />
    </main>
  )
}
