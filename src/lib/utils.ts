import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price)
}

export function convertPhonePrefix(phone: string, format: "08" | "62" | "+62") {
  let normalized = phone.trim().replace(/[^+\d]/g, "")

  if (normalized.startsWith("+62")) {
    normalized = normalized.slice(3)
  } else if (normalized.startsWith("62")) {
    normalized = normalized.slice(2)
  } else if (normalized.startsWith("0")) {
    normalized = normalized.slice(1)
  }

  switch (format) {
    case "08":
      return "0" + normalized
    case "62":
      return "62" + normalized
    case "+62":
      return "+62" + normalized
    default:
      return phone // fallback kalau format tidak dikenali
  }
}
