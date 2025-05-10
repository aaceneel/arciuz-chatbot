"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { MobileNav } from "./mobile-nav"
import { Globe, Briefcase, Wallet, BarChart2, LineChart, Newspaper, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Portfolio", href: "/portfolio", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Predictions", href: "/predictions", icon: <LineChart className="h-5 w-5" /> },
    { name: "News", href: "/news", icon: <Newspaper className="h-5 w-5" /> },
    { name: "Chat", href: "/chat", icon: <Globe className="h-5 w-5" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-8">
          <MobileNav />
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Arciuz Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="text-xl font-bold gradient-text">Arciuz</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="icon" className="hover-glow relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <ModeToggle />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-glow hidden md:flex">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l">
            <Button variant="outline" size="sm" className="hover-glow">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
