"use client"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cryptoData } from "@/lib/crypto-data"

export function TopCryptoPicks() {
  const [data, setData] = useState(cryptoData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          price: item.price * (1 + (Math.random() * 0.002 - 0.001)),
          change: item.change + (Math.random() * 0.2 - 0.1),
          changePercent: item.changePercent + (Math.random() * 0.1 - 0.05),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card/50 rounded-lg p-2 overflow-x-auto">
      <div className="flex items-center min-w-max">
        <div className="bg-muted/50 rounded-md px-3 py-1 flex items-center mr-4">
          <span className="text-sm font-medium">Top AI Picks</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Assets selected by Arciuz AI based on market analysis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {data.map((item) => (
          <div key={item.symbol} className="flex items-center space-x-6 px-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {item.logo ? (
                  <img src={item.logo || "/placeholder.svg"} alt={item.name} className="h-6 w-6" />
                ) : (
                  <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{item.symbol.substring(0, 1)}</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-bold text-sm">{item.symbol}</span>
                  <span className="text-xs text-muted-foreground ml-1">{item.name}</span>
                </div>
                <div className="text-sm font-mono">
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {item.change >= 0 ? "+" : ""}
                {item.change.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">
                {item.changePercent >= 0 ? "+" : ""}
                {item.changePercent.toFixed(1)}% (24h)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
