"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(list);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    let tempProducts = products;
    if (selectedCategory) tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    if (searchTerm.trim() !== "") tempProducts = tempProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(tempProducts);
  }, [products, selectedCategory, searchTerm]);

  const categories = [
    "Insulator",
    "Solar French guard",
    "Solar zatka machine",
    "Torch",
    "Solar plate",
    "Battery",
    "Solar charge control",
    "Light",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">
          Explore Our Products
        </h1>

        {/* Category Filter */}
        <div className="mb-10 flex justify-center gap-4 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 text-gray-700 shadow-md"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
        >
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <motion.div
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={product.images && product.images.length > 0 ? product.images[0] : product.image}
                  alt={product.name}
                  className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg">
                  ₹{product.price}
                </span>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-500 mb-1 text-sm">Category: {product.category}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                </div>
              </motion.div>
            </Link>
          )) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
