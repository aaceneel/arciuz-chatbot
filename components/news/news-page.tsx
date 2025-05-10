"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ArrowUp, ArrowDown, ArrowRight } from "lucide-react"

export function NewsPage() {
  const newsCategories = ["All", "Market", "Regulation", "Technology", "Adoption", "Geopolitics"]

  const newsItems = [
    {
      title: "EU Approves Comprehensive Crypto Regulation Framework",
      summary:
        "The European Parliament has approved a comprehensive regulatory framework for cryptocurrencies, providing clarity for institutional investors and setting standards for the industry.",
      source: "Financial Times",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2048&auto=format&fit=crop",
      category: "Regulation",
      impact: "positive",
    },
    {
      title: "Federal Reserve Signals Interest Rate Stability Through Q3",
      summary:
        "Federal Reserve indicates rates will remain stable through Q3, reducing market uncertainty and potentially providing a favorable environment for risk assets including cryptocurrencies.",
      source: "Wall Street Journal",
      time: "5 hours ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
      category: "Market",
      impact: "positive",
    },
    {
      title: "Trade Tensions Rise Between US and China Over Technology Imports",
      summary:
        "New tariffs announced on technology imports, potentially disrupting supply chains for semiconductor manufacturers and affecting technology-focused cryptocurrencies.",
      source: "Bloomberg",
      time: "12 hours ago",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      category: "Geopolitics",
      impact: "negative",
    },
    {
      title: "Major DeFi Protocol Launches Cross-Chain Interoperability Solution",
      summary:
        "A leading decentralized finance protocol has launched a new cross-chain solution that enables seamless asset transfers between multiple blockchains, potentially increasing liquidity across the ecosystem.",
      source: "CoinDesk",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop",
      category: "Technology",
      impact: "positive",
    },
    {
      title: "Japan Central Bank Adjusts Yield Curve Control Policy",
      summary:
        "Bank of Japan makes minor adjustment to YCC policy, impact on global markets appears limited but could affect Japanese cryptocurrency markets in the medium term.",
      source: "Nikkei Asia",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?q=80&w=2070&auto=format&fit=crop",
      category: "Market",
      impact: "neutral",
    },
    {
      title: "Major Retailer Announces Bitcoin Payment Integration",
      summary:
        "A Fortune 500 retailer has announced plans to accept Bitcoin payments across its online platforms, marking another significant step in mainstream cryptocurrency adoption.",
      source: "CNBC",
      time: "2 days ago",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
      category: "Adoption",
      impact: "positive",
    },
  ]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Market News</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news..."
              className="pl-9 pr-4 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex overflow-x-auto pb-px mb-4">
          {newsCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-sm">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {newsCategories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems
                .filter((item) => category === "All" || item.category === category)
                .map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium bg-muted px-2 py-1 rounded">{item.category}</span>
                        <div
                          className={`px-2 py-0.5 rounded text-xs font-medium flex items-center ${
                            item.impact === "positive"
                              ? "bg-green-500/10 text-green-500"
                              : item.impact === "negative"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {item.impact === "positive" && <ArrowUp className="h-3 w-3 mr-1" />}
                          {item.impact === "negative" && <ArrowDown className="h-3 w-3 mr-1" />}
                          {item.impact === "neutral" && <ArrowRight className="h-3 w-3 mr-1" />}
                          {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.summary}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{item.source}</span>
                        <span>{item.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">AI News Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">Sentiment analysis of recent market news</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Overall Market Sentiment</div>
                <div className="text-xs text-muted-foreground">Based on 250+ news sources in the last 24 hours</div>
              </div>
              <div className="text-green-500 font-medium">Moderately Positive</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Positive</span>
                <span>62%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "62%" }}></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>Neutral</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }}></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>Negative</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="font-medium mb-2">AI Insight</h4>
              <p className="text-sm text-muted-foreground">
                Recent regulatory clarity in the EU and stable interest rate outlook from the Federal Reserve are
                contributing to a positive market sentiment. However, ongoing trade tensions between the US and China
                present a potential risk factor to monitor in the coming weeks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More News</Button>
      </div>
    </div>
  )
}
