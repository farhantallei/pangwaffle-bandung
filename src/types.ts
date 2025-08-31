export interface OrderForm {
  name: string
  phone: string
  deliveryMethod: "pickup" | "gosend"
}

export interface MenuItem {
  id: string
  name: string
  image: string
  price: number
  category: string
}

export interface CartItem {
  id: string
  quantity: number
}
