"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "products");
        const productsSnapshot = await getDocs(productsCol);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-gray-100">
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
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 hover:shadow-xl hover:scale-105 transition text-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>

        {/* Floating Blurred Circles */}
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-pink-400 opacity-30 rounded-full blur-3xl -z-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-3xl -z-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Featured / Search Results */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          {query ? "Search Results" : "Featured Products"}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {(query ? filteredProducts : products.slice(0, 4)).map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <motion.div
                  className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Product Image */}
                  <motion.img
                    src={product.images && product.images.length > 0 ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Price Badge */}
                  <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg">
                    ₹{product.price}
                  </span>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}

        {!query && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition text-lg"
            >
              View All Products →
            </Link>
          </motion.div>
        )}
      </section>
    </div>
  );
}
