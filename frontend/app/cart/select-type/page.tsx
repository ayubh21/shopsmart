"use client"

import { useState } from "react"
import { useCartStore, getCartTotal, getCartItemCount } from "../../../lib/cart-store"
import { retailers } from "../../../lib/grocery-data"
import { GroceryIcon } from "../../../components/grocery-icon"
import { RetailerBadge } from "../../../components/retailer-badge"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Users,
  User,
  UserPlus,
  X,
  Crown,
  ArrowRight,
} from "lucide-react"

const SUGGESTED_NAMES = ["Mom", "Dad", "Alex", "Sam", "Partner"]

/* ─── Setup Prompt ─── */

function CartSetupPrompt({
  onSelect,
}: {
  onSelect: (mode: "personal" | "shared", name: string) => void
}) {
  const [step, setStep] = useState<"choose" | "name">("choose")
  const [name, setName] = useState("")

  if (step === "name") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-sm flex flex-col gap-5">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mx-auto">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              What should we call you?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {"This name will identify your items in the shared cart."}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSelect("shared", name || "You")
            }}
            className="flex flex-col gap-3"
          >
            <Input
              placeholder="Your name (e.g. Mom, Alex)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create shared cart
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setStep("choose")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Go back
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mx-auto mb-4">
            <ShoppingCart className="h-7 w-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            How do you want to shop?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {"You can always change this later."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSelect("personal", "You")}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
              <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-card-foreground">
                Personal cart
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Shop on your own
              </p>
            </div>
          </button>
          <button
            onClick={() => setStep("name")}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
              <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-card-foreground">
                Shared cart
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Invite family or friends
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Member Avatar ─── */

function MemberAvatar({
  name,
  isActive,
  isOwner,
  canRemove,
  onClick,
  onRemove,
}: {
  name: string
  isActive: boolean
  isOwner: boolean
  canRemove: boolean
  onClick: () => void
  onRemove?: () => void
}) {
  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <button
        onClick={onClick}
        className={`relative flex items-center justify-center h-11 w-11 rounded-full transition-all ${
          isActive
            ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
            : "bg-muted text-muted-foreground opacity-60 hover:opacity-90"
        }`}
      >
        <User className="h-5 w-5" />
        {isOwner && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-accent text-accent-foreground">
            <Crown className="h-2.5 w-2.5" />
          </span>
        )}
      </button>
      {canRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute -top-1 -left-1 flex items-center justify-center h-4 w-4 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          aria-label={`Remove ${name}`}
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
      <span
        className={`text-xs font-medium ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {name}
      </span>
    </div>
  )
}

/* ─── Add Member Inline ─── */

function AddMemberInline({
  existingMembers,
  onAdd,
  onCancel,
}: {
  existingMembers: string[]
  onAdd: (name: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState("")
  const filteredSuggestions = SUGGESTED_NAMES.filter(
    (s) => !existingMembers.some((m) => m.toLowerCase() === s.toLowerCase())
  )

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    if (existingMembers.some((m) => m.toLowerCase() === trimmed.toLowerCase())) return
    onAdd(trimmed)
    setValue("")
  }

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3 flex flex-col gap-2.5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex items-center gap-2"
      >
        <Input
          placeholder="Type a name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className="h-8 text-sm"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex items-center justify-center shrink-0 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center shrink-0 h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Cancel"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </form>
      {filteredSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filteredSuggestions.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onAdd(s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Cart Items (flat list for personal, grouped for shared) ─── */

function CartItemRow({
  ci,
  onUpdateQty,
  onRemove,
}: {
  ci: ReturnType<typeof useCartStore>["items"][number]
  onUpdateQty: (qty: number) => void
  onRemove: () => void
}) {
  const price = ci.item.prices[ci.preferredRetailer] ?? 0
  const retailer = retailers.find((r) => r.id === ci.preferredRetailer)
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary shrink-0">
        <GroceryIcon image={ci.item.image} className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground leading-tight truncate">
          {ci.item.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <RetailerBadge retailerId={ci.preferredRetailer} size="sm" />
          <span className="text-xs text-muted-foreground">
            {retailer?.name}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onUpdateQty(ci.quantity - 1)}
          className="flex items-center justify-center h-7 w-7 rounded-md bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="text-sm font-semibold text-card-foreground w-6 text-center tabular-nums">
          {ci.quantity}
        </span>
        <button
          onClick={() => onUpdateQty(ci.quantity + 1)}
          className="flex items-center justify-center h-7 w-7 rounded-md bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="text-right shrink-0 ml-1">
        <p className="text-sm font-bold text-card-foreground tabular-nums">
          ${(price * ci.quantity).toFixed(2)}
        </p>
        {ci.quantity > 1 && (
          <p className="text-[10px] text-muted-foreground tabular-nums">
            ${price.toFixed(2)} each
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
        aria-label={`Remove ${ci.item.name} from cart`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/* ─── Main Cart View ─── */

export function FamilyCartView() {
  const {
    items,
    familyMembers,
    currentMember,
    cartMode,
    owner,
    removeFromCart,
    updateQuantity,
    setCurrentMember,
    clearCart,
    setCartMode,
    addFamilyMember,
    removeFamilyMember,
    upgradeToShared,
  } = useCartStore()

  const [showAddMember, setShowAddMember] = useState(false)

  const total = getCartTotal(items)
  const itemCount = getCartItemCount(items)

  /* ─── Unset: show setup prompt ─── */
  if (cartMode === "unset") {
    return (
      <CartSetupPrompt
        onSelect={(mode, name) => setCartMode(mode, name)}
      />
    )
  }

  const isShared = cartMode === "shared"

  const groupedByMember = items.reduce(
    (acc, ci) => {
      if (!acc[ci.addedBy]) acc[ci.addedBy] = []
      acc[ci.addedBy].push(ci)
      return acc
    },
    {} as Record<string, typeof items>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Family Members Switcher (shared mode only) */}
      {isShared && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4.5 w-4.5 text-primary" />
            <span className="text-sm font-semibold text-card-foreground">
              Cart Members
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              Shopping as{" "}
              <span className="font-semibold text-primary">{currentMember}</span>
            </span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            {familyMembers.map((member) => (
              <MemberAvatar
                key={member}
                name={member}
                isActive={member === currentMember}
                isOwner={member === owner}
                canRemove={member !== owner}
                onClick={() => setCurrentMember(member)}
                onRemove={() => removeFamilyMember(member)}
              />
            ))}
            {/* Add Member trigger */}
            {!showAddMember && (
              <button
                onClick={() => setShowAddMember(true)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center justify-center h-11 w-11 rounded-full border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
                  <UserPlus className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs text-muted-foreground">Add</span>
              </button>
            )}
          </div>
          {showAddMember && (
            <div className="mt-3">
              <AddMemberInline
                existingMembers={familyMembers}
                onAdd={(name) => {
                  addFamilyMember(name)
                  setShowAddMember(false)
                }}
                onCancel={() => setShowAddMember(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* Cart Summary */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </p>
            <p className="text-xs text-muted-foreground">
              {isShared
                ? `Shared cart \u00B7 ${familyMembers.length} ${familyMembers.length === 1 ? "member" : "members"}`
                : "Personal cart"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-lg font-bold text-card-foreground tabular-nums">
              ${total.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Estimated total</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Upgrade to shared (personal mode only) */}
      {!isShared && (
        <button
          onClick={upgradeToShared}
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Users className="h-4 w-4" />
          Want to share this cart? Invite members
        </button>
      )}

      {/* Cart Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Your cart is empty
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {isShared
              ? "Search for grocery items and compare prices to start adding items to your shared cart."
              : "Search for grocery items and compare prices to start adding items to your cart."}
          </p>
        </div>
      ) : isShared ? (
        /* Grouped by member in shared mode */
        <div className="flex flex-col gap-4">
          {Object.entries(groupedByMember).map(([member, memberItems]) => (
            <div
              key={member}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-card-foreground">
                  {member}{"'"}s items
                </span>
                {member === owner && (
                  <Crown className="h-3 w-3 text-accent" />
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {memberItems.length}{" "}
                  {memberItems.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="divide-y divide-border">
                {memberItems.map((ci) => (
                  <CartItemRow
                    key={`${ci.item.id}-${ci.preferredRetailer}`}
                    ci={ci}
                    onUpdateQty={(qty) =>
                      updateQuantity(ci.item.id, ci.preferredRetailer, qty)
                    }
                    onRemove={() =>
                      removeFromCart(ci.item.id, ci.preferredRetailer)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Flat list in personal mode */
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {items.map((ci) => (
              <CartItemRow
                key={`${ci.item.id}-${ci.preferredRetailer}`}
                ci={ci}
                onUpdateQty={(qty) =>
                  updateQuantity(ci.item.id, ci.preferredRetailer, qty)
                }
                onRemove={() =>
                  removeFromCart(ci.item.id, ci.preferredRetailer)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FamilyCartView