import type { MenuItem } from "@/types"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { useCartContext } from "@/providers/cart-provider"
import { useFilterContext } from "@/providers/filter-provider"
import menuItems from "@/data/items.json"
import { useAnalyticsContext } from "@/providers/analytics-provider"

export default function MenuList() {
  const { selectedCategory } = useFilterContext()

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="menu" className="mt-2">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-8 text-foreground font-[family-name:var(--font-fredoka)]">
          Menu Waffle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ItemCard({ item }: { item: MenuItem }) {
  const { trackEvent } = useAnalyticsContext()
  const { getItemQuantity, addToCart, updateQuantity } = useCartContext()
  const quantity = getItemQuantity(item.id)

  return (
    <Card
      key={item.id}
      className="overflow-hidden hover:shadow-lg py-0 gap-0 transition-shadow">
      <div className="aspect-[4/5] w-full h-auto relative">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="size-full aspect-[4/5] object-cover"
        />
        <Badge
          className={cn(
            "absolute top-2 right-2 bg-accent text-accent-foreground",
            item.category === "Red Velvet" && "bg-rose-700 text-white",
            item.category === "Pandan" && "bg-lime-600 text-white",
            item.category === "Ice Cream" && "bg-amber-200 text-foreground"
          )}>
          {item.category}
        </Badge>
      </div>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex-1 mb-3">
          <h4 className="font-semibold text-lg text-foreground">{item.name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-primary">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
        {quantity === 0 ? (
          <Button
            onClick={() => {
              addToCart(item)
              trackEvent("add_to_cart", "menu", item.name)
            }}
            variant="secondary"
            className="w-full">
            <PlusIcon className="h-4 w-4" />
            Tambah
          </Button>
        ) : (
          <div className="inline-flex self-end -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Upvote"
              onClick={() => {
                updateQuantity(item.id, quantity - 1)
                if (quantity - 1 === 0) {
                  trackEvent("remove_from_cart", "menu", item.name)
                }
              }}>
              <MinusIcon size={16} aria-hidden="true" />
            </Button>
            <span className="flex items-center border w-16 justify-center text-muted-foreground/80 px-3 text-sm font-medium">
              {quantity}
            </span>
            <Button
              className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Downvote"
              onClick={() => updateQuantity(item.id, quantity + 1)}>
              <PlusIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
