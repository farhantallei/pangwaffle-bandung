import { PhoneIcon, UserIcon } from "lucide-react"
import { Label } from "./ui/label"
import { useCartContext } from "@/providers/cart-provider"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { cn, convertPhonePrefix, formatPrice } from "@/lib/utils"
import { Button } from "./ui/button"
import { useRef, useState } from "react"
import { z } from "zod/v4"
import type { MenuItem, OrderForm as OrderFormType } from "@/types"
import profile from "@/constants/profile"
import storeItems from "@/data/items.json"

type OrderSummary = {
  items: (MenuItem & { quantity: number })[]
  total: number
  customer: OrderFormType
  timestamp: string
}

const message = (order: OrderSummary) => `Halo, saya ingin memesan:\n
${order.items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n")}
Total: ${formatPrice(order.total)}\n
Nama: ${order.customer.name}
Nomor HP: ${order.customer.phone}
Metode Pengambilan: ${order.customer.deliveryMethod === "pickup" ? "Pickup di Toko" : "GoSend"}
`

interface OrderFormProps {
  onSubmit?: (order: OrderSummary) => void
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const {
    cart,
    orderForm,
    setOrderForm,
    setShowOrderForm,
    getTotalPrice,
    resetCart,
  } = useCartContext()

  // refs
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // errors
  const [errors, setErrors] = useState<{ name: string; phone: string }>({
    name: "",
    phone: "",
  })

  function handleOrderSubmit() {
    // Validate form
    let valid = true
    const newErrors = { name: "", phone: "" }
    if (
      z.string().nonempty().safeParse(orderForm.phone.trim()).success === false
    ) {
      newErrors.phone = "Nomor HP harus diisi"
      valid = false
      phoneRef.current?.focus()
    } else if (
      z
        .string()
        .regex(/^08\d{8,13}$/, "Nomor HP tidak valid.")
        .safeParse(orderForm.phone.trim()).success === false
    ) {
      newErrors.phone = "Nomor HP tidak valid"
      valid = false
      phoneRef.current?.focus()
    }
    if (
      z.string().nonempty().safeParse(orderForm.name.trim()).success === false
    ) {
      newErrors.name = "Nama lengkap harus diisi"
      valid = false
      nameRef.current?.focus()
    }

    setErrors(newErrors)
    if (!valid) return

    // Here you would typically send the order to your backend
    const orderSummary: OrderSummary = {
      items: cart.map((cartItem) => {
        const item = storeItems.find((i) => i.id === cartItem.id)
        return {
          ...item!,
          quantity: cartItem.quantity,
        }
      }),
      total: getTotalPrice(),
      customer: orderForm,
      timestamp: new Date().toISOString(),
    }

    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(message(orderSummary))
    const whatsappURL = `https://wa.me/${convertPhonePrefix(profile.PHONE, "62")}?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    resetCart()

    onSubmit?.(orderSummary)
  }

  return (
    <div className="space-y-4 px-4">
      <h3 className="font-semibold text-lg text-foreground">Data Pemesan</h3>

      <div className="space-y-2">
        <Label
          htmlFor="name"
          className={cn("text-foreground", errors.name && "text-destructive")}>
          Nama Lengkap
        </Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            className={cn(
              "pl-10 bg-background text-foreground",
              errors.name &&
              "border-destructive focus-visible:ring-destructive/20 focus-visible:ring-offset-destructive/20 focus-visible:border-destructive"
            )}
            value={orderForm.name}
            onChange={(e) => {
              setOrderForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }))
              }
            }}
            ref={nameRef}
          />
          {errors.name ? (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className={cn("text-foreground", errors.phone && "text-destructive")}>
          Nomor HP
        </Label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            className={cn(
              "pl-10 bg-background text-foreground",
              errors.phone &&
              "border-destructive focus-visible:ring-destructive/20 focus-visible:ring-offset-destructive/20 focus-visible:border-destructive"
            )}
            value={orderForm.phone}
            onChange={(e) => {
              setOrderForm((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: "" }))
              }
            }}
            ref={phoneRef}
          />
          {errors.phone ? (
            <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-foreground">Metode Pengambilan</Label>
        <RadioGroup
          value={orderForm.deliveryMethod}
          onValueChange={(value: "pickup" | "gosend") =>
            setOrderForm((prev) => ({
              ...prev,
              deliveryMethod: value,
            }))
          }>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="text-foreground">
              Pickup di Toko
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gosend" id="gosend" />
            <Label htmlFor="gosend" className="text-foreground">
              GoSend
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Total Pesanan:</span>
          <span className="font-semibold text-lg text-foreground">
            {formatPrice(getTotalPrice())}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => setShowOrderForm(false)}>
            Kembali
          </Button>
          <Button
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={handleOrderSubmit}>
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
