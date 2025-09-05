"use client";
import { useCart } from "@/app/components/CartContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-1 border rounded-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </motion.div>
          ))}

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-right">
            <h2 className="text-xl font-semibold mb-4">
              Total: ₹{total.toFixed(2)}
            </h2>
          <Link href={"/checkout"}>
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
              Checkout
            </button>
</Link>

          </div>
        </div>
      )}
    </div>
  );
}
