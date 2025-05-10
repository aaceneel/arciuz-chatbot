"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { portfolioData, assetAllocation } from "@/lib/portfolio-data"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface PortfolioOverviewProps {
  timeframe: string
  setTimeframe: (timeframe: string) => void
}

export function PortfolioOverview({ timeframe, setTimeframe }: PortfolioOverviewProps) {
  const [portfolioValue, setPortfolioValue] = useState(12458.32)
  const [portfolioChange, setPortfolioChange] = useState(5.8)
  const [assets, setAssets] = useState(portfolioData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioValue((prev) => prev * (1 + (Math.random() * 0.002 - 0.001)))
      setPortfolioChange((prev) => prev + (Math.random() * 0.1 - 0.05))

      setAssets((prevAssets) =>
        prevAssets.map((asset) => ({
          ...asset,
          change: asset.change + (Math.random() * 0.2 - 0.1),
          allocation: asset.allocation * (1 + (Math.random() * 0.01 - 0.005)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const chartData = [
    { name: "Mon", value: portfolioValue * 0.92 },
    { name: "Tue", value: portfolioValue * 0.94 },
    { name: "Wed", value: portfolioValue * 0.97 },
    { name: "Thu", value: portfolioValue * 0.99 },
    { name: "Fri", value: portfolioValue * 0.98 },
    { name: "Sat", value: portfolioValue * 1.01 },
    { name: "Sun", value: portfolioValue },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Portfolio Overview</CardTitle>
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-auto">
            <TabsList className="grid grid-cols-6 h-8">
              <TabsTrigger value="1D" className="text-xs">
                1D
              </TabsTrigger>
              <TabsTrigger value="1W" className="text-xs">
                1W
              </TabsTrigger>
              <TabsTrigger value="1M" className="text-xs">
                1M
              </TabsTrigger>
              <TabsTrigger value="3M" className="text-xs">
                3M
              </TabsTrigger>
              <TabsTrigger value="1Y" className="text-xs">
                1Y
              </TabsTrigger>
              <TabsTrigger value="ALL" className="text-xs">
                ALL
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-sm text-muted-foreground">Your current portfolio performance and asset allocation</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">
              ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {portfolioChange >= 0 ? "↑" : "↓"} {Math.abs(portfolioChange).toFixed(1)}% {timeframe}
              </span>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4D9EFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4D9EFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#4D9EFF" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <h3 className="text-sm font-medium mb-4">Asset Allocation</h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Top Assets</h3>
              <div className="space-y-3">
                {assets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-1 h-8" style={{ backgroundColor: asset.color }}></div>
                      <div className="ml-2">
                        <div className="flex items-center">
                          <span className="font-medium text-sm">{asset.symbol}</span>
                          <span className="text-xs text-muted-foreground ml-1">{asset.name}</span>
                        </div>
                        <div className="w-full bg-muted h-1 mt-1 rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${asset.allocation}%`,
                              backgroundColor: asset.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {asset.change >= 0 ? "+" : ""}
                        {asset.change.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">{asset.allocation.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="sm" className="text-xs">
              View All Assets
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
