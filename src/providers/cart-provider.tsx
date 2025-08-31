import { useLocalStorage } from "@/hooks/use-local-storage"
import type { CartItem, MenuItem, OrderForm } from "@/types"
import { createContext, useContext, useState } from "react"
import storeItems from "@/data/items.json"

interface CartContextProps {
  cart: CartItem[]
  orderForm: OrderForm
  setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>
  showOrderForm: boolean
  setShowOrderForm: React.Dispatch<React.SetStateAction<boolean>>
  addToCart: (item: MenuItem) => void
  getItemQuantity: (id: string) => number
  updateQuantity: (id: string, newQuantity: number) => void
  removeFromCart: (id: string) => void
  getTotalItems: () => number
  getTotalPrice: () => number
  handleCheckout: () => void
  resetCart: () => void
}

const CartContext = createContext<CartContextProps>(null!)

export function useCartContext() {
  return useContext(CartContext) || {}
}

interface CartProviderProps extends React.PropsWithChildren { }

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderForm, setOrderForm] = useLocalStorage<OrderForm>("order-form", {
    name: "",
    phone: "",
    deliveryMethod: "pickup",
  })

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const getItemQuantity = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id)
    return item ? item.quantity : 0
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
    setShowOrderForm(false)
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    setShowOrderForm(true)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id)
      return total + (item?.price || 0) * cartItem.quantity
    }, 0)
  }

  function resetCart() {
    setCart([])
    setOrderForm((prev) => ({ ...prev, deliveryMethod: "pickup" }))
    setShowOrderForm(false)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orderForm,
        setOrderForm,
        showOrderForm,
        setShowOrderForm,
        addToCart,
        getItemQuantity,
        updateQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
        handleCheckout,
        resetCart,
      }}>
      {children}
    </CartContext.Provider>
  )
}
