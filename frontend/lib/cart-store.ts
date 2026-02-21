import { useSyncExternalStore, useCallback } from "react"
import type { GroceryItem } from "./grocery-data"

export type CartItem = {
  item: GroceryItem
  quantity: number
  preferredRetailer: string
  addedBy: string
}

export type CartMode = "unset" | "personal" | "shared"

type CartStore = {
  items: CartItem[]
  familyMembers: string[]
  currentMember: string
  cartMode: CartMode
  owner: string
}

const INITIAL_STATE: CartStore = {
  items: [],
  familyMembers: [],
  currentMember: "",
  cartMode: "unset",
  owner: "",
}

let state: CartStore = { ...INITIAL_STATE }
let listeners: Set<() => void> = new Set()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return state
}

export function setCartMode(mode: "personal" | "shared", ownerName: string) {
  const name = ownerName.trim() || "You"
  if (mode === "personal") {
    state = {
      ...state,
      cartMode: "personal",
      owner: name,
      currentMember: name,
      familyMembers: [name],
    }
  } else {
    state = {
      ...state,
      cartMode: "shared",
      owner: name,
      currentMember: name,
      familyMembers: [name],
    }
  }
  emitChange()
}

export function upgradeToShared() {
  state = {
    ...state,
    cartMode: "shared",
  }
  emitChange()
}

export function addFamilyMember(name: string) {
  const trimmed = name.trim()
  if (!trimmed) return
  if (state.familyMembers.some((m) => m.toLowerCase() === trimmed.toLowerCase())) return
  state = {
    ...state,
    familyMembers: [...state.familyMembers, trimmed],
  }
  emitChange()
}

export function removeFamilyMember(name: string) {
  if (name === state.owner) return
  state = {
    ...state,
    familyMembers: state.familyMembers.filter((m) => m !== name),
    items: state.items.map((ci) =>
      ci.addedBy === name ? { ...ci, addedBy: state.owner } : ci
    ),
    currentMember: state.currentMember === name ? state.owner : state.currentMember,
  }
  emitChange()
}

export function addToCart(item: GroceryItem, retailerId: string) {
  const existing = state.items.find(
    (ci) => ci.item.id === item.id && ci.preferredRetailer === retailerId
  )
  if (existing) {
    state = {
      ...state,
      items: state.items.map((ci) =>
        ci.item.id === item.id && ci.preferredRetailer === retailerId
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
      ),
    }
  } else {
    state = {
      ...state,
      items: [
        ...state.items,
        { item, quantity: 1, preferredRetailer: retailerId, addedBy: state.currentMember || "You" },
      ],
    }
  }
  emitChange()
}

export function removeFromCart(itemId: string, retailerId: string) {
  state = {
    ...state,
    items: state.items.filter(
      (ci) => !(ci.item.id === itemId && ci.preferredRetailer === retailerId)
    ),
  }
  emitChange()
}

export function updateQuantity(itemId: string, retailerId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(itemId, retailerId)
    return
  }
  state = {
    ...state,
    items: state.items.map((ci) =>
      ci.item.id === itemId && ci.preferredRetailer === retailerId
        ? { ...ci, quantity }
        : ci
    ),
  }
  emitChange()
}

export function setCurrentMember(member: string) {
  state = { ...state, currentMember: member }
  emitChange()
}

export function clearCart() {
  state = { ...state, items: [] }
  emitChange()
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, ci) => {
    const price = ci.item.prices[ci.preferredRetailer] ?? 0
    return total + price * ci.quantity
  }, 0)
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, ci) => count + ci.quantity, 0)
}

export function useCartStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const add = useCallback(
    (item: GroceryItem, retailerId: string) => addToCart(item, retailerId),
    []
  )
  const remove = useCallback(
    (itemId: string, retailerId: string) => removeFromCart(itemId, retailerId),
    []
  )
  const update = useCallback(
    (itemId: string, retailerId: string, qty: number) =>
      updateQuantity(itemId, retailerId, qty),
    []
  )
  const switchMember = useCallback((member: string) => setCurrentMember(member), [])
  const clear = useCallback(() => clearCart(), [])
  const setMode = useCallback(
    (mode: "personal" | "shared", ownerName: string) => setCartMode(mode, ownerName),
    []
  )
  const addMember = useCallback((name: string) => addFamilyMember(name), [])
  const removeMember = useCallback((name: string) => removeFamilyMember(name), [])
  const upgrade = useCallback(() => upgradeToShared(), [])

  return {
    items: snapshot.items,
    familyMembers: snapshot.familyMembers,
    currentMember: snapshot.currentMember,
    cartMode: snapshot.cartMode,
    owner: snapshot.owner,
    addToCart: add,
    removeFromCart: remove,
    updateQuantity: update,
    setCurrentMember: switchMember,
    clearCart: clear,
    setCartMode: setMode,
    addFamilyMember: addMember,
    removeFamilyMember: removeMember,
    upgradeToShared: upgrade,
  }
}
