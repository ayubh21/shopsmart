import {
  Apple,
  Milk,
  Egg,
  Drumstick,
  Croissant,
  Fish,
  Leaf,
  Coffee,
  IceCream,
  Cherry,
  Wheat,
  Carrot,
  Cookie,
  Pizza,
  Sandwich,
  Droplets,
  CupSoda,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  banana: Apple,
  milk: Milk,
  eggs: Egg,
  chicken: Drumstick,
  bread: Croissant,
  avocado: Leaf,
  cheese: Sandwich,
  salmon: Fish,
  pasta: Wheat,
  "olive-oil": Droplets,
  oj: CupSoda,
  yogurt: Milk,
  beef: Drumstick,
  broccoli: Carrot,
  chips: Cookie,
  pizza: Pizza,
  apples: Cherry,
  butter: Sandwich,
  coffee: Coffee,
  rice: Wheat,
  tomatoes: Apple,
  "maple-syrup": Droplets,
  "ice-cream": IceCream,
  cereal: Wheat,
}

export function GroceryIcon({
  image,
  className,
}: {
  image: string
  className?: string
}) {
  const Icon = iconMap[image] || Apple
  return <Icon className={className} />
}
