"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersCol = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCol);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "Pending"
        ? "Shipped"
        : currentStatus === "Shipped"
        ? "Delivered"
        : "Delivered";
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, { status: nextStatus });
    fetchOrders();
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading orders...</p>;

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Admin Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-2">Order ID: {order.id}</h2>
                <p className="text-gray-700 mb-2">
                  Customer: {order.userName || order.userEmail || "Unknown"}
                </p>
                <p className="text-gray-700 mb-2">Status: <span className="font-bold">{order.status || "Pending"}</span></p>

                <h3 className="font-semibold text-gray-800 mt-2 mb-1">Items:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {(order.cart || []).map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity} → ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-gray-900 text-lg mb-4">
                Total: ₹{(order.cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0)}
              </p>

              <button
                onClick={() => updateStatus(order.id, order.status || "Pending")}
                className={`w-full py-2 rounded-lg font-semibold text-white ${
                  order.status === "Delivered"
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={order.status === "Delivered"}
              >
                {order.status === "Delivered"
                  ? "Delivered"
                  : order.status === "Shipped"
                  ? "Mark as Delivered"
                  : "Mark as Shipped"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
