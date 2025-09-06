"use client";
import { useCart } from "@/app/components/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: total }),
    });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "My E-Commerce Store",
      description: "Secure Payment",
      order_id: order.id,
      handler: function (response) {
        alert("✅ Payment Successful: " + response.razorpay_payment_id);
        clearCart();
        router.push("/"); // redirect to homepage after payment
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#2563eb" }, // Tailwind blue-600
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="container mx-auto px-6 py-12">
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
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between py-3 text-gray-700"
                >
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

          {/* Payment Section */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <p className="text-gray-600 mb-6">
                Complete your payment securely with Razorpay.
              </p>
            </div>
            <button
              onClick={handlePayment}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg shadow-md"
            >
              Pay ₹{total} with Razorpay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
