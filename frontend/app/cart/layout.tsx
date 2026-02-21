"use client"

import { useState } from "react"
import { AppHeader } from "../../components/navbar"

export default function CartLayout({
    children,
}: {
    children: React.ReactNode
}){
    const [activeTab, setActiveTab] = useState<"compare" | "cart">("cart")

    return(
        <>
        <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="mx-auto max-w-5xl px-4">
            {children}
        </main>
        </>
    )
}