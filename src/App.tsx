import Header from "./components/header"
import Headline from "./components/headline"
import Categories from "./components/categories"
import MenuList from "./components/menu-list"
// import Reviews from "./components/reviews"
// import InstagramPosts from "./components/instagram-posts"
import Footer from "./components/footer"
import CartProvider from "./providers/cart-provider"
import FilterProvider from "./providers/filter-provider"
import AnalyticsProvider from "./providers/analytics-provider"

export default function App() {
  return (
    <AnalyticsProvider>
      <CartProvider>
        <FilterProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <Headline />

            <Categories />
            <MenuList />

            {/* <Reviews /> */}
            {/* <InstagramPosts /> */}

            <Footer />
          </div>
        </FilterProvider>
      </CartProvider>
    </AnalyticsProvider>
  )
}
