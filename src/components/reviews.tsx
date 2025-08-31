import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment:
      "Waffle nya enak banget! Keju mozzarella nya melted sempurna, es krim vanila nya juga creamy. Pokoknya recommended deh!",
    date: "2 hari yang lalu",
  },
  {
    id: 2,
    name: "Budi S.",
    rating: 5,
    comment:
      "Pertama kali coba Thailand Pang Waffle dan langsung jatuh cinta! Tekstur waffle nya crispy di luar, soft di dalam. Mantap!",
    date: "1 minggu yang lalu",
  },
  {
    id: 3,
    name: "Rina K.",
    rating: 4,
    comment:
      "Tempatnya cozy, pelayanan ramah, dan yang paling penting waffle nya juara! Harga juga masih reasonable.",
    date: "2 minggu yang lalu",
  },
  {
    id: 4,
    name: "Dimas A.",
    rating: 5,
    comment:
      "Udah langganan di sini! Waffle red velvet mix favorit banget. Selalu fresh dan rasanya konsisten.",
    date: "3 minggu yang lalu",
  },
  {
    id: 5,
    name: "Maya L.",
    rating: 5,
    comment:
      "Waffle pandan srikaya nya unik dan enak! Beda dari yang lain. Pasti balik lagi deh!",
    date: "1 bulan yang lalu",
  },
]

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 4000) // Change review every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-8 text-foreground font-[family-name:var(--font-fredoka)]">
          Apa Kata Pelanggan
        </h3>
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {reviews[currentReview].date}
              </span>
            </div>
            <p className="text-foreground mb-4 text-pretty leading-relaxed">
              "{reviews[currentReview].comment}"
            </p>
            <p className="font-semibold text-foreground">
              - {reviews[currentReview].name}
            </p>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-md"
            onClick={prevReview}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-md"
            onClick={nextReview}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentReview
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                  }`}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
