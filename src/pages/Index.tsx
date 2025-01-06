import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { ShoppingBag, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const trendingProducts = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 129,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
  }
];

const promotionalOffers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "New Collection",
    description: "Check out our latest arrivals",
  }
];

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium text-brown">Minimal Store</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-brown" />
            </motion.button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brown/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brown/20 text-brown"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {/* Promotional Offers Carousel */}
        <section className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {promotionalOffers.map((offer) => (
                <CarouselItem key={offer.id}>
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-lg">{offer.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </section>

        {/* Trending Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-medium text-brown mb-6">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-brown">{product.name}</h3>
                    <p className="text-gold font-medium mt-2">${product.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-medium text-brown mb-6">All Products</h2>
          <ProductGrid searchQuery={searchQuery} sortBy={sortBy} />
        </section>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;