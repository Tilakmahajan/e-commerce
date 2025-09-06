"use client";

import { useCart } from "@/app/components/CartContext";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  if (!product) return null;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="h-48 w-full object-cover rounded-lg mb-4"
      />

      {/* Info */}
      <h2 className="text-gray-900 font-semibold text-lg mb-1">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
      <p className="text-blue-600 font-bold text-lg mb-4">₹{product.price}</p>

      {/* Add to Cart */}
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
