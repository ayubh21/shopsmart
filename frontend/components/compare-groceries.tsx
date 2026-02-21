"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

type ComparisonResult = {
  store: string
  price: number
  location: string
  inStock: boolean
}

export default function CompareGroceries() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ComparisonResult[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!query) return

    setLoading(true)

    // 🔥 Replace this with real API call
    const response = await new Promise<ComparisonResult[]>((resolve) =>
      setTimeout(() => {
        resolve([
          { store: "Walmart", price: 5.99, location: "Downtown", inStock: true },
          { store: "Superstore", price: 6.49, location: "West End", inStock: true },
          { store: "No Frills", price: 5.79, location: "Southside", inStock: false },
        ])
      }, 1000)
    )

    setResults(response)
    setLoading(false)
  }

  const cheapest = results.length
    ? Math.min(...results.map((r) => r.price))
    : null

  return (
    <div className="container mx-auto max-w-4xl py-16 space-y-8">
      {/* Search Section */}
      <div className="flex gap-4">
        <Input
          placeholder="Search for a product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Compare
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.store}
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell
                      className={
                        item.price === cheapest
                          ? "text-green-600 font-semibold"
                          : ""
                      }
                    >
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {item.inStock ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}