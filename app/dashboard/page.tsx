import { Dashboard } from "@/components/dashboard/dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Dashboard />
    </main>
  )
}
