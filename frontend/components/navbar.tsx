"use client"

import { Leaf, ShoppingCart } from "lucide-react"
import {Lobster_Two} from "next/font/google"
import { Button } from "./ui/button"
import Link from "next/link"


const lobsterTwo = Lobster_Two({
        weight: '400',
        subsets: ['latin'] 
})

export function AppHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: "compare" | "cart"
  onTabChange: (tab: "compare" | "cart") => void
}) {

    
  return (
    <header className="sticky top-0 z-50 border-b border-border  backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-0.5 ">
            <div className="flex items-center justify-center h-9 w-9 rounded-lg">
              <Leaf className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className={`${lobsterTwo.className} text-2xl text-black`}>
                Shopsmart
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-4 rounded-lg  p-1">
            <Button
              onClick={() => onTabChange("compare")}
              className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-all    hover:text-gray-200 ${
                activeTab === "compare"
                  ? "bg-card text-card-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </Button>
            <Link
            href="/cart/select-type"              
              className={`relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-all flex items-center gap-1.5 text-black ${
                activeTab === "cart"
                  ? "bg-card text-card-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Cart
              {/* {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-4.5 min-w-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1">
                  {itemCount}
                </span>
              )} */}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

