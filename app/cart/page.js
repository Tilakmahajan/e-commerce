"use client";

import { useCart } from "@/app/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart) return null;

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        🛒 Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-[60vh] text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ShoppingCart className="w-20 h-20 text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Browse Products →
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {cart.map((item) => {
                // New logic: pick first image from images array if available
                const mainImage =
                  item.images && item.images.length > 0 ? item.images[0] : item.image;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-5">
                      <Image
                        src={mainImage}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-contain rounded-xl shadow"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h2>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border rounded-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:w-96 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>

            <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700 text-sm hover:bg-gray-50 px-3 py-2 rounded transition"
                >
                  <span className="truncate">{item.name} × {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xl font-bold mb-6 text-gray-900">
              <span>Total:</span>
              <motion.span
                key={total}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-green-600"
              >
                ₹{total.toFixed(2)}
              </motion.span>
            </div>

            <Link href="/checkout">
              <button className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition">
                Proceed to Checkout →
              </button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
