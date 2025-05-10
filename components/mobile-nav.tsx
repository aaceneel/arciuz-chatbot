"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, BarChart2, Briefcase, LineChart, Newspaper, Globe, Settings, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Portfolio", href: "/portfolio", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Predictions", href: "/predictions", icon: <LineChart className="h-5 w-5" /> },
    { name: "News", href: "/news", icon: <Newspaper className="h-5 w-5" /> },
    { name: "Chat", href: "/chat", icon: <Globe className="h-5 w-5" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-4">
          <div className="px-4">
            <h2 className="text-lg font-bold">Arciuz</h2>
            <p className="text-sm text-muted-foreground">AI-Powered Crypto Insights</p>
          </div>
          <nav className="flex flex-col gap-2 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground",
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-4">
            <Button className="w-full" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
