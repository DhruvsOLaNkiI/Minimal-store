import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Elegant timepiece with premium leather strap",
    details: "This minimalist watch features a clean dial design, premium leather strap, and precise Japanese movement. Perfect for both casual and formal occasions.",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 129,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description: "Handcrafted genuine leather bifold wallet",
    details: "Crafted from full-grain leather, this wallet features multiple card slots, a bill compartment, and RFID protection technology.",
  },
  {
    id: "3",
    name: "Silk Scarf",
    price: 189,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Pure silk scarf with artistic pattern",
    details: "Made from 100% pure silk, this scarf features a unique artistic pattern. The lightweight fabric drapes beautifully and adds elegance to any outfit.",
  },
  {
    id: "4",
    name: "Gold Bracelet",
    price: 459,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0",
    description: "18k gold-plated minimalist bracelet",
    details: "This elegant bracelet is plated with 18k gold and features a minimalist design. Perfect for everyday wear or special occasions.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-brown">Product not found</h1>
        <Link to="/" className="text-brown hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-brown hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to products
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="aspect-square overflow-hidden rounded-lg bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl font-medium text-brown mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gold font-medium mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 mb-6">{product.details}</p>
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-6 py-3 bg-brown text-cream rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;