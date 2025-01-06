import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const products = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Elegant timepiece with premium leather strap",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 129,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description: "Handcrafted genuine leather bifold wallet",
  },
  {
    id: "3",
    name: "Silk Scarf",
    price: 189,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Pure silk scarf with artistic pattern",
  },
  {
    id: "4",
    name: "Gold Bracelet",
    price: 459,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0",
    description: "18k gold-plated minimalist bracelet",
  },
];

interface ProductGridProps {
  searchQuery: string;
  sortBy: string;
}

export function ProductGrid({ searchQuery, sortBy }: ProductGridProps) {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {sortedProducts.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No products found matching your search.
        </div>
      ) : (
        sortedProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-brown">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gold font-medium">${product.price}</span>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="px-4 py-2 bg-brown text-cream rounded hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))
      )}
    </div>
  );
}