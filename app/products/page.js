"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">
          Explore Our Products
        </h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <motion.div
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Product Image */}
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                />

                {/* Price Badge */}
                <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg">
                  ₹{product.price}
                </span>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
