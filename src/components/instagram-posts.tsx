import { InstagramIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const instagramPosts = [
  {
    id: 1,
    image: "/delicious-waffle-with-cheese-and-ice-cream.png",
    caption:
      "Thailand Pang Waffle dengan keju mozzarella yang melted sempurna! 🧀✨ #PangWaffle #ThailandWaffle #Bandung",
    likes: 245,
    date: "3 hari yang lalu",
  },
  {
    id: 2,
    image: "/red-velvet-waffle-with-chocolate-topping.png",
    caption:
      "Red Velvet Mix yang selalu jadi favorit! Siapa yang udah pernah coba? 🔴❤️ #RedVelvet #PangWaffle #Yummy",
    likes: 189,
    date: "1 minggu yang lalu",
  },
  {
    id: 3,
    image: "/pandan-waffle-with-green-color-and-srikaya.png",
    caption:
      "Pandan Srikaya - kombinasi rasa Indonesia yang autentik! 🌿💚 #PandanWaffle #Srikaya #LocalFlavor",
    likes: 156,
    date: "2 minggu yang lalu",
  },
]

export default function InstagramPosts() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground font-[family-name:var(--font-fredoka)] mb-2">
            Follow Instagram Kami
          </h3>
          <p className="text-muted-foreground">@pangwaffle_metrobdg</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {instagramPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Instagram post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <InstagramIcon className="h-5 w-5 text-white drop-shadow-lg" />
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-foreground mb-3 text-pretty leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>❤️ {post.likes} likes</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 hover:from-pink-600 hover:to-purple-700"
            onClick={() =>
              window.open(
                "https://www.instagram.com/pangwaffle_metrobdg",
                "_blank"
              )
            }>
            <InstagramIcon className="h-4 w-4 mr-2" />
            Lihat Lebih Banyak
          </Button>
        </div>
      </div>
    </section>
  )
}
