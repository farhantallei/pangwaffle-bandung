import { ShoppingCartIcon } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import profile from "@/constants/profile"
import { useCartContext } from "@/providers/cart-provider"
import OrderForm from "./order-form"
import CartList from "./cart-list"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { cart, showOrderForm, getTotalItems } = useCartContext()

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-muted/50 rounded-full flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="size-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white text-balance font-[family-name:var(--font-fredoka)]">
              {profile.NAME}
            </h1>
            <p className="text-sm text-white/90 text-balance">
              {profile.BRANCH}
            </p>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-white/10 border-white/20 hover:bg-white/20">
              <ShoppingCartIcon className="h-5 w-5 text-white" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md gap-0">
            <SheetHeader className="border-b">
              <SheetTitle>Keranjang Belanja</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 overflow-y-auto pb-12 pt-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Keranjang masih kosong
                </p>
              ) : (
                <>
                  {!showOrderForm ? (
                    <CartList />
                  ) : (
                    <OrderForm
                      onSubmit={() => {
                        setOpen(false)
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
