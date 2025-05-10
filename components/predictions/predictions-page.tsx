"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUpRight, TrendingUp } from "lucide-react"

export function PredictionsPage() {
  const predictionData = [
    { name: "Jan", btc: 42000, eth: 2800 },
    { name: "Feb", btc: 44500, eth: 3100 },
    { name: "Mar", btc: 47000, eth: 3300 },
    { name: "Apr", btc: 53000, eth: 3600 },
    { name: "May", btc: 56000, eth: 3900 },
    { name: "Jun", btc: 58000, eth: 4100 },
    { name: "Jul", btc: 62000, eth: 4300 },
    { name: "Aug", btc: 64000, eth: 4500 },
    { name: "Sep", btc: 67000, eth: 4700 },
    { name: "Oct", btc: 69000, eth: 4900 },
    { name: "Nov", btc: 72000, eth: 5100 },
    { name: "Dec", btc: 75000, eth: 5400 },
  ]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Predictions</h1>
        <Button size="sm" className="hover-glow">
          <TrendingUp className="h-4 w-4 mr-2" />
          Generate New Prediction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Bitcoin (BTC)</CardTitle>
              <div className="text-green-500 flex items-center text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +43.0% (12m)
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-2xl font-bold">$52,438.91</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Predicted (EOY)</div>
                  <div className="text-2xl font-bold">$75,000.00</div>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={["dataMin - 5000", "dataMax + 5000"]} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Price"]} />
                    <Legend />
                    <Line type="monotone" dataKey="btc" stroke="#F7931A" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Bitcoin is projected to continue its upward trend through 2023, with potential catalysts including
                  institutional adoption, reduced inflation concerns, and favorable regulatory developments in key
                  markets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Ethereum (ETH)</CardTitle>
              <div className="text-green-500 flex items-center text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +66.4% (12m)
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-2xl font-bold">$3,245.67</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Predicted (EOY)</div>
                  <div className="text-2xl font-bold">$5,400.00</div>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={["dataMin - 500", "dataMax + 500"]} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Price"]} />
                    <Legend />
                    <Line type="monotone" dataKey="eth" stroke="#627EEA" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Ethereum is expected to outperform in 2023 due to network upgrades, increased DeFi adoption, and
                  growing institutional interest in smart contract platforms. The transition to proof-of-stake has also
                  improved its environmental profile.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Top AI Recommendations</CardTitle>
          <p className="text-sm text-muted-foreground">Assets with the highest growth potential based on AI analysis</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
              <div className="col-span-2">Asset</div>
              <div className="text-right">Current Price</div>
              <div className="text-right">Predicted (EOY)</div>
              <div className="text-right">Potential Growth</div>
              <div className="text-right">Confidence</div>
            </div>
            <div className="divide-y">
              {[
                {
                  name: "Chainlink",
                  symbol: "LINK",
                  logo: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=025",
                  price: 14.82,
                  predicted: 28.5,
                  growth: 92.3,
                  confidence: "High",
                },
                {
                  name: "Solana",
                  symbol: "SOL",
                  logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
                  price: 103.45,
                  predicted: 185.0,
                  growth: 78.8,
                  confidence: "Medium",
                },
                {
                  name: "Ethereum",
                  symbol: "ETH",
                  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
                  price: 3245.67,
                  predicted: 5400.0,
                  growth: 66.4,
                  confidence: "High",
                },
                {
                  name: "Polygon",
                  symbol: "MATIC",
                  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
                  price: 0.98,
                  predicted: 1.6,
                  growth: 63.3,
                  confidence: "Medium",
                },
                {
                  name: "Bitcoin",
                  symbol: "BTC",
                  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
                  price: 52438.91,
                  predicted: 75000.0,
                  growth: 43.0,
                  confidence: "High",
                },
              ].map((asset, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <img src={asset.logo || "/placeholder.svg"} alt={asset.name} className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-xs text-muted-foreground">{asset.name}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-right font-mono">
                    ${asset.predicted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-right text-green-500">+{asset.growth.toFixed(1)}%</div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        asset.confidence === "High"
                          ? "bg-green-500/10 text-green-500"
                          : asset.confidence === "Medium"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {asset.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-card rounded-lg p-6 border">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold mb-2">Get Personalized Investment Recommendations</h2>
            <p className="text-muted-foreground mb-4">
              Our AI can analyze your portfolio, risk tolerance, and market conditions to provide tailored investment
              strategies.
            </p>
            <Button className="hover-glow">Generate Custom Strategy</Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
