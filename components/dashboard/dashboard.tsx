"use client"

import { useState } from "react"
import { TopCryptoPicks } from "./top-crypto-picks"
import { PortfolioOverview } from "./portfolio-overview"
import { MarketInsights } from "./market-insights"
import { ChatWidget } from "./chat-widget"

export function Dashboard() {
  const [timeframe, setTimeframe] = useState("1W")

  return (
    <div className="container py-6 space-y-6">
      <TopCryptoPicks />

      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioOverview timeframe={timeframe} setTimeframe={setTimeframe} />
          <MarketInsights />
        </div>
        <div className="lg:col-span-1">
          <ChatWidget />
        </div>
      </div>
    </div>
  )
}
