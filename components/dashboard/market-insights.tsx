"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react"
import { marketEvents } from "@/lib/market-events"

export function MarketInsights() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Market Insights</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time geopolitical events and market sentiment analysis</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="events" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="events">Geopolitical Events</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="space-y-4">
            {marketEvents.map((event, index) => (
              <div key={index} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <div
                    className={`px-2 py-0.5 rounded text-xs font-medium flex items-center ${
                      event.impact === "positive"
                        ? "bg-green-500/10 text-green-500"
                        : event.impact === "negative"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {event.impact === "positive" && <ArrowUp className="h-3 w-3 mr-1" />}
                    {event.impact === "negative" && <ArrowDown className="h-3 w-3 mr-1" />}
                    {event.impact === "neutral" && <ArrowRight className="h-3 w-3 mr-1" />}
                    {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{event.source}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="sentiment" className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Sentiment analysis visualization coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
