"use client";
import { useCart } from "@/app/components/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
        <Link href="/products" className="text-blue-600 underline">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="divide-y">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="text-right pt-4">
          <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
        </div>
      </div>

      {/* Mock Payment / Confirm Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
}
