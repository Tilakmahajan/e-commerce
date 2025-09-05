"use client";
import { useCart } from "@/app/components/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-6 py-12 text-center text-black">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      {!orderPlaced ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

          <div className="grid gap-6 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between bg-white rounded-xl shadow-md p-4"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-right mb-6">
            <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed!</h1>
          <p className="text-gray-700 text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
      )}
    </div>
  );
}
