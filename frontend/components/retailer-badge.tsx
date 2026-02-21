import { getRetailerById } from "@/lib/grocery-data"

export function RetailerBadge({
  retailerId,
  size = "sm",
}: {
  retailerId: string
  size?: "sm" | "md" | "lg"
}) {
  const retailer = getRetailerById(retailerId)
  if (!retailer) return null

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-card shrink-0 ${sizeClasses[size]}`}
      style={{ backgroundColor: retailer.color }}
      title={retailer.name}
    >
      {retailer.logo}
    </span>
  )
}
