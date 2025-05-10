import type React from "react"
import { RefreshCw, LineChart, Wallet } from "lucide-react"

export function FeaturesSection() {
  return (
    <div className="border-t border-border/40 bg-background">
      <div className="container py-8">
        <h2 className="text-center text-xl font-bold mb-8 text-primary">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<RefreshCw className="h-6 w-6" />}
            title="Auto-Invest with Arciuz"
            description="Set up automated investment strategies based on AI-powered market insights and your risk preferences."
          />
          <FeatureCard
            icon={<LineChart className="h-6 w-6" />}
            title="See your holdings"
            description="Monitor your crypto portfolio performance with detailed analytics and personalized recommendations."
          />
          <FeatureCard
            icon={<Wallet className="h-6 w-6" />}
            title="Secure wallet connection"
            description="Connect your crypto wallets for seamless tracking and transaction capabilities within the platform."
          />
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border/50 card-hover">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="mt-3 text-xs text-primary">Coming Soon</div>
      </div>
    </div>
  )
}
