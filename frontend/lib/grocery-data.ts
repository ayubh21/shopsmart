export type Retailer = {
  id: string
  name: string
  color: string
  logo: string
}

export type GroceryItem = {
  id: string
  name: string
  category: string
  unit: string
  image: string
  prices: Record<string, number>
}

export const retailers: Retailer[] = [
  { id: "loblaws", name: "Loblaws", color: "#E31837", logo: "L" },
  { id: "walmart", name: "Walmart", color: "#0071CE", logo: "W" },
  { id: "metro", name: "Metro", color: "#003DA5", logo: "M" },
  { id: "sobeys", name: "Sobeys", color: "#ED1C24", logo: "S" },
  { id: "nofrills", name: "No Frills", color: "#FFC220", logo: "NF" },
]

export const categories = [
  "All",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery",
  "Pantry",
  "Beverages",
  "Snacks",
  "Frozen",
] as const

export type Category = (typeof categories)[number]

export const groceryItems: GroceryItem[] = [
  {
    id: "1",
    name: "Bananas",
    category: "Fruits & Vegetables",
    unit: "per lb",
    image: "banana",
    prices: { loblaws: 0.79, walmart: 0.67, metro: 0.85, sobeys: 0.82, nofrills: 0.59 },
  },
  {
    id: "2",
    name: "2% Milk (4L)",
    category: "Dairy & Eggs",
    unit: "per bag",
    image: "milk",
    prices: { loblaws: 5.99, walmart: 5.47, metro: 6.29, sobeys: 5.99, nofrills: 5.29 },
  },
  {
    id: "3",
    name: "Large Eggs (12)",
    category: "Dairy & Eggs",
    unit: "per dozen",
    image: "eggs",
    prices: { loblaws: 4.49, walmart: 3.97, metro: 4.79, sobeys: 4.29, nofrills: 3.79 },
  },
  {
    id: "4",
    name: "Chicken Breast",
    category: "Meat & Seafood",
    unit: "per kg",
    image: "chicken",
    prices: { loblaws: 13.99, walmart: 11.97, metro: 14.49, sobeys: 13.49, nofrills: 10.99 },
  },
  {
    id: "5",
    name: "White Bread",
    category: "Bakery",
    unit: "per loaf",
    image: "bread",
    prices: { loblaws: 3.49, walmart: 2.47, metro: 3.29, sobeys: 3.19, nofrills: 2.29 },
  },
  {
    id: "6",
    name: "Avocados",
    category: "Fruits & Vegetables",
    unit: "each",
    image: "avocado",
    prices: { loblaws: 2.49, walmart: 1.97, metro: 2.79, sobeys: 2.29, nofrills: 1.79 },
  },
  {
    id: "7",
    name: "Cheddar Cheese (400g)",
    category: "Dairy & Eggs",
    unit: "per block",
    image: "cheese",
    prices: { loblaws: 7.49, walmart: 6.47, metro: 7.99, sobeys: 7.29, nofrills: 5.99 },
  },
  {
    id: "8",
    name: "Atlantic Salmon",
    category: "Meat & Seafood",
    unit: "per kg",
    image: "salmon",
    prices: { loblaws: 22.99, walmart: 19.97, metro: 24.49, sobeys: 21.99, nofrills: 18.99 },
  },
  {
    id: "9",
    name: "Pasta (900g)",
    category: "Pantry",
    unit: "per box",
    image: "pasta",
    prices: { loblaws: 2.99, walmart: 1.97, metro: 3.29, sobeys: 2.79, nofrills: 1.69 },
  },
  {
    id: "10",
    name: "Olive Oil (1L)",
    category: "Pantry",
    unit: "per bottle",
    image: "olive-oil",
    prices: { loblaws: 12.99, walmart: 10.97, metro: 13.49, sobeys: 12.49, nofrills: 9.99 },
  },
  {
    id: "11",
    name: "Orange Juice (1.75L)",
    category: "Beverages",
    unit: "per carton",
    image: "oj",
    prices: { loblaws: 4.99, walmart: 3.97, metro: 5.29, sobeys: 4.79, nofrills: 3.49 },
  },
  {
    id: "12",
    name: "Greek Yogurt (750g)",
    category: "Dairy & Eggs",
    unit: "per tub",
    image: "yogurt",
    prices: { loblaws: 5.99, walmart: 4.97, metro: 6.49, sobeys: 5.79, nofrills: 4.49 },
  },
  {
    id: "13",
    name: "Ground Beef (lean)",
    category: "Meat & Seafood",
    unit: "per kg",
    image: "beef",
    prices: { loblaws: 11.99, walmart: 9.97, metro: 12.49, sobeys: 11.49, nofrills: 8.99 },
  },
  {
    id: "14",
    name: "Broccoli",
    category: "Fruits & Vegetables",
    unit: "per bunch",
    image: "broccoli",
    prices: { loblaws: 2.99, walmart: 2.47, metro: 3.29, sobeys: 2.79, nofrills: 1.99 },
  },
  {
    id: "15",
    name: "Potato Chips (200g)",
    category: "Snacks",
    unit: "per bag",
    image: "chips",
    prices: { loblaws: 3.99, walmart: 3.47, metro: 4.29, sobeys: 3.79, nofrills: 2.99 },
  },
  {
    id: "16",
    name: "Frozen Pizza",
    category: "Frozen",
    unit: "each",
    image: "pizza",
    prices: { loblaws: 6.99, walmart: 5.47, metro: 7.49, sobeys: 6.79, nofrills: 4.99 },
  },
  {
    id: "17",
    name: "Apples (3 lb bag)",
    category: "Fruits & Vegetables",
    unit: "per bag",
    image: "apples",
    prices: { loblaws: 5.49, walmart: 4.47, metro: 5.99, sobeys: 5.29, nofrills: 3.99 },
  },
  {
    id: "18",
    name: "Butter (454g)",
    category: "Dairy & Eggs",
    unit: "per block",
    image: "butter",
    prices: { loblaws: 5.99, walmart: 5.27, metro: 6.49, sobeys: 5.79, nofrills: 4.99 },
  },
  {
    id: "19",
    name: "Coffee (340g)",
    category: "Beverages",
    unit: "per bag",
    image: "coffee",
    prices: { loblaws: 9.99, walmart: 8.47, metro: 10.49, sobeys: 9.79, nofrills: 7.99 },
  },
  {
    id: "20",
    name: "Rice (2kg)",
    category: "Pantry",
    unit: "per bag",
    image: "rice",
    prices: { loblaws: 5.49, walmart: 4.47, metro: 5.99, sobeys: 5.29, nofrills: 3.99 },
  },
  {
    id: "21",
    name: "Tomatoes (on vine)",
    category: "Fruits & Vegetables",
    unit: "per lb",
    image: "tomatoes",
    prices: { loblaws: 2.99, walmart: 2.47, metro: 3.49, sobeys: 2.79, nofrills: 1.99 },
  },
  {
    id: "22",
    name: "Maple Syrup (500ml)",
    category: "Pantry",
    unit: "per bottle",
    image: "maple-syrup",
    prices: { loblaws: 9.99, walmart: 8.97, metro: 10.99, sobeys: 9.49, nofrills: 7.99 },
  },
  {
    id: "23",
    name: "Ice Cream (1.5L)",
    category: "Frozen",
    unit: "per tub",
    image: "ice-cream",
    prices: { loblaws: 5.99, walmart: 4.97, metro: 6.49, sobeys: 5.79, nofrills: 4.49 },
  },
  {
    id: "24",
    name: "Cereal (450g)",
    category: "Pantry",
    unit: "per box",
    image: "cereal",
    prices: { loblaws: 5.49, walmart: 4.47, metro: 5.99, sobeys: 5.29, nofrills: 3.99 },
  },
]

export function getLowestPrice(item: GroceryItem): { retailerId: string; price: number } {
  let lowest = { retailerId: "", price: Infinity }
  for (const [retailerId, price] of Object.entries(item.prices)) {
    if (price < lowest.price) {
      lowest = { retailerId, price }
    }
  }
  return lowest
}

export function getHighestPrice(item: GroceryItem): { retailerId: string; price: number } {
  let highest = { retailerId: "", price: -Infinity }
  for (const [retailerId, price] of Object.entries(item.prices)) {
    if (price > highest.price) {
      highest = { retailerId, price }
    }
  }
  return highest
}

export function getSavings(item: GroceryItem): number {
  const lowest = getLowestPrice(item)
  const highest = getHighestPrice(item)
  return highest.price - lowest.price
}

export function getRetailerById(id: string): Retailer | undefined {
  return retailers.find((r) => r.id === id)
}
