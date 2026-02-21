"use client"

import { AppHeader } from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compare" | "cart" >("compare");

  return (
    <div className="min-h-screen flex flex-col bg-white">
        <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
