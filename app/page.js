"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

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

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
  );

  const isSearching = query.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hide Hero on Mobile if Searching */}
      {!isSearching && (
        <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-16 sm:py-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg leading-tight"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to <span className="text-yellow-300">Max Wholesaler</span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 drop-shadow-md px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Discover the best deals on electronics, gadgets, and more!
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="/products"
                className="bg-white text-blue-700 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-gray-200 hover:shadow-xl hover:scale-105 transition text-base sm:text-lg"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ✅ Search Results / Featured Section */}
      <section
        className={`container mx-auto px-4 sm:px-6 ${
          isSearching ? "py-6" : "py-12 sm:py-16"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900">
          {isSearching ? `Results for “${query}”` : "Featured Products"}
        </h2>

        {/* If no results */}
        {filteredProducts.length === 0 && isSearching ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-600">
            <Image
              src="https://illustrations.popsy.co/gray/shopping-bag.svg"
              alt="No results"
              width={150}
              height={150}
              className="mb-4"
            />
            <p className="text-base sm:text-lg font-medium text-center">
              No products found for “{query}”.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
              Try searching with a different keyword.
            </p>
          </div>
        ) : (
          <motion.div
            className={`grid 
              grid-cols-1   /* ✅ Always 1 product per row on mobile */
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 gap-6`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {(isSearching ? filteredProducts : products.slice(0, 4)).map(
              (product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Product Image */}
                    <Image
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-56 object-contain bg-gray-50"
                      width={400}
                      height={400}
                    />

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            )}
          </motion.div>
        )}

        {/* View All Button (only if not searching) */}
        {!isSearching && (
          <motion.div
            className="text-center mt-8 sm:mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition text-base sm:text-lg"
            >
              View All Products →
            </Link>
          </motion.div>
        )}
      </section>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/918530619001"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center z-50 "
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={32}
          height={32}
        />
      </a>
    </div>
  );
}
