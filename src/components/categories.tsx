import { Button } from "./ui/button"
import { useFilterContext } from "@/providers/filter-provider"

const categories = ["All", "Classic", "Red Velvet", "Pandan"]

export default function Categories() {
  const { selectedCategory, setSelectedCategory } = useFilterContext()

  return (
    <section className="mt-4">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${selectedCategory === category
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "text-foreground"
                }`}
              onClick={() => setSelectedCategory(category)}>
              {category === "All" ? "Semua" : category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
