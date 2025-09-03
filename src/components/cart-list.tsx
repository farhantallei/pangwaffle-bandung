import { formatPrice } from "@/lib/utils"
import { useCartContext } from "@/providers/cart-provider"
import { Button } from "./ui/button"
import { MinusIcon, PlusIcon, XIcon } from "lucide-react"
import storeItems from "@/data/items.json"
import type { CartItem as CartItemType } from "@/types"
import { useAnalyticsContext } from "@/providers/analytics-provider"

export default function CartList() {
  const { cart, getTotalPrice, handleCheckout } = useCartContext()

  return (
    <div className="px-4">
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-foreground">Total:</span>
          <span className="font-semibold text-lg text-foreground">
            {formatPrice(getTotalPrice())}
          </span>
        </div>
        <Button
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          onClick={handleCheckout}>
          Lanjut ke Pemesanan
        </Button>
      </div>
    </div>
  )
}

function CartItem({ id, quantity }: CartItemType) {
  const { trackEvent } = useAnalyticsContext()
  const { updateQuantity, removeFromCart } = useCartContext()
  const item = storeItems.find((item) => item.id === id)
  if (!item) return null

  return (
    <div
      key={item.id}
      className="flex items-center space-x-3 bg-card p-3 rounded-lg">
      <img
        src={item.image || "/placeholder.svg"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.price)}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-transparent"
            onClick={() => {
              updateQuantity(item.id, quantity - 1)
              if (quantity - 1 === 0) {
                trackEvent("remove_from_cart", "cart", item.name)
              }
            }}>
            <MinusIcon className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-8 text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-transparent"
            onClick={() => updateQuantity(item.id, quantity + 1)}>
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => {
          removeFromCart(item.id)
          trackEvent("remove_from_cart", "cart", item.name)
        }}>
        <XIcon className="h-3 w-3" />
      </Button>
    </div>
  )
}
