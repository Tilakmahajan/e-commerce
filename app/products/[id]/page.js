"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/components/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setToast(`${quantity} × ${product.name} added to cart!`);
    setTimeout(() => setToast(null), 2000);
  };

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-gray-800">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-6 py-2 text-gray-900 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition text-lg"
          >
            Add {quantity} to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
