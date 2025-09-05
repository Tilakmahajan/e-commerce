"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products; // Show all products

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-yellow-300">Max Wholesaler</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 opacity-95 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover the best deals on electronics, gadgets, and more!
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/products"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition text-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400 opacity-30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Featured Products
        </h2>

        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Products Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/products"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition text-lg font-semibold"
          >
            View All Products →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
