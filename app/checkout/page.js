"use client";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (!user) {
      alert("⚠️ Please login first to place order.");
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // Create Razorpay order from backend
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My E-Commerce Store",
        description: "Purchase",
        order_id: order.id,
        handler: async function (response) {
          // Save order in Firestore via API
          await fetch("/api/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-user-id": user.uid,
            },
            body: JSON.stringify({
              cart,
              amount: total,
              paymentId: response.razorpay_payment_id,
            }),
          });

          clearCart();
          alert("✅ Payment Successful!");
          router.push("/orders");
        },
        prefill: {
          name: user.displayName || "Customer",
          email: user.email,
          contact: user.phoneNumber || "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Checkout</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600 bg-white shadow-md p-8 rounded-xl">
          <p className="text-lg">🛒 Your cart is empty.</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between py-3 text-gray-700">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold mt-6 text-gray-900">
              Total: ₹{total}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <p className="text-gray-600 mb-6">
                Complete your payment securely with Razorpay.
              </p>
            </div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg font-semibold text-lg shadow-md ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : `Pay ₹${total} with Razorpay`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
