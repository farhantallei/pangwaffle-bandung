import profile from "@/constants/profile"
import { Button } from "./ui/button"

export default function Headline() {
  return (
    <section className="relative bg-gradient-to-br from-primary/20 to-accent/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl text-foreground font-bold text-balance font-[family-name:var(--font-fredoka)]">
          Thailand {profile.NAME}
        </h2>
        <h3 className="text-2xl mb-4 text-secondary font-semibold font-[family-name:var(--font-fredoka)]">
          Hadir di Bandung!
        </h3>
        <p className="text-sm text-foreground/80 mb-6 text-pretty">
          Thailand {profile.NAME}: waffle isi keju mozzarella, topping es krim
          vanila, dan saus karamel. Kombinasi sempurna untuk momen manis Anda!
        </p>

        {/* <div className="mb-6"> */}
        {/*   <p className="text-sm font-semibold text-foreground mb-4"> */}
        {/*     🚀 Pesan langsung via aplikasi favorit Anda! */}
        {/*   </p> */}
        {/*   <div className="flex flex-wrap justify-center gap-3"> */}
        {/*     <Button */}
        {/*       size="sm" */}
        {/*       className="bg-green-600 hover:bg-green-700 text-white font-semibold" */}
        {/*       onClick={() => */}
        {/*         window.open( */}
        {/*           "https://r.grab.com/g/2-1-6-C7MDLPNFCN3XAX", */}
        {/*           "_blank" */}
        {/*         ) */}
        {/*       }> */}
        {/*       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center mr-2"> */}
        {/*         <span className="text-green-600 font-bold text-xs">G</span> */}
        {/*       </div> */}
        {/*       GrabFood */}
        {/*     </Button> */}
        {/*     <Button */}
        {/*       size="sm" */}
        {/*       className="bg-green-500 hover:bg-green-600 text-white font-semibold" */}
        {/*       onClick={() => window.open("#", "_blank")}> */}
        {/*       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center mr-2"> */}
        {/*         <span className="text-green-500 font-bold text-xs">G</span> */}
        {/*       </div> */}
        {/*       GoFood */}
        {/*     </Button> */}
        {/*     <Button */}
        {/*       size="sm" */}
        {/*       className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" */}
        {/*       onClick={() => window.open("#", "_blank")}> */}
        {/*       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center mr-2"> */}
        {/*         <span className="text-orange-500 font-bold text-xs">S</span> */}
        {/*       </div> */}
        {/*       ShopeeFood */}
        {/*     </Button> */}
        {/*   </div> */}
        {/* </div> */}

        <Button
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          onClick={() =>
            document
              .getElementById("menu")
              ?.scrollIntoView({ behavior: "smooth" })
          }>
          Pesan Sekarang
        </Button>
      </div>
    </section>
  )
}
