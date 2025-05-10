"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, ArrowUpDown, Download, Filter } from "lucide-react"

export function PortfolioPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hover-glow">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,458.32</div>
            <div className="text-sm text-green-500">↑ 5.8% (1W)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$245.67</div>
            <div className="text-sm text-green-500">↑ 2.1%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Performance Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+3.2%</div>
            <div className="text-sm text-muted-foreground">vs. market average</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Your Assets</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
              <div className="col-span-2">Asset</div>
              <div className="text-right">Price</div>
              <div className="text-right">Holdings</div>
              <div className="text-right">Value</div>
              <div className="text-right">24h</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {[
                {
                  name: "Ethereum",
                  symbol: "ETH",
                  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
                  price: 3245.67,
                  amount: 1.42,
                  value: 4608.85,
                  change: 2.4,
                },
                {
                  name: "Bitcoin",
                  symbol: "BTC",
                  logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
                  price: 52438.91,
                  amount: 0.062,
                  value: 3251.21,
                  change: -1.2,
                },
                {
                  name: "Apple",
                  symbol: "AAPL",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                  price: 187.45,
                  amount: 9.8,
                  value: 1837.01,
                  change: 0.8,
                },
                {
                  name: "Chainlink",
                  symbol: "LINK",
                  logo: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=025",
                  price: 14.82,
                  amount: 81.5,
                  value: 1207.83,
                  change: 5.7,
                },
                {
                  name: "Gold",
                  symbol: "GLD",
                  logo: "https://cdn-icons-png.flaticon.com/512/2533/2533563.png",
                  price: 2103.5,
                  amount: 0.74,
                  value: 1556.59,
                  change: 1.5,
                },
              ].map((asset, i) => (
                <div key={i} className="grid grid-cols-7 gap-4 p-4 items-center">
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
                  <div className="text-right font-mono">{asset.amount}</div>
                  <div className="text-right font-mono">
                    ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-right ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {asset.change >= 0 ? "+" : ""}
                    {asset.change}%
                  </div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      Trade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect your crypto wallet to automatically sync your holdings and track your portfolio in real-time.
                </p>
              </div>
              <Button className="mt-2">Connect Wallet</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
