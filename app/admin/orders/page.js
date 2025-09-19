"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebaseConfig";
import {
  collection,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "@/app/components/AuthContext";

export default function AdminOrdersPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (role === null) return;

    if (role !== "admin") {
      router.push("/");
      return;
    }

    setFetching(true);
    const ordersCol = collection(db, "orders");
    const q = query(ordersCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setFetching(false);
      },
      (error) => {
        console.error("Failed to fetch orders:", error);
        setFetching(false);
      }
    );

    return () => unsubscribe();
  }, [user, role, loading, router]);

  const updateStatus = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "Paid" || currentStatus === "Pending"
        ? "Shipped"
        : currentStatus === "Shipped"
        ? "Delivered"
        : "Delivered";

    try {
      await updateDoc(doc(db, "orders", orderId), { status: nextStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading || role === null || fetching) {
    return <p className="text-center mt-20 text-lg">Loading orders...</p>;
  }

  if (!user || role !== "admin") return null;

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const status = order.status || "Pending";
            const isDelivered = status === "Delivered";
            const isCOD = order.paymentMethod === "COD";

            return (
              <motion.div
                key={order.id}
                className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition ${
                  isCOD ? "border-2 border-yellow-500" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-lg text-gray-800">
                      Customer: {order.customer?.name || "Unknown"}
                    </h2>
                    {isCOD && (
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        COD
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-1">
                    Email: {order.userEmail || "Unknown"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Phone: {order.customer?.phone || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Address: {order.customer?.address || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Payment:{" "}
                    {isCOD ? (
                      <span className="font-semibold text-yellow-600">
                        Cash on Delivery
                      </span>
                    ) : (
                      order.paymentId || "N/A"
                    )}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Status: <span className="font-bold">{status}</span>
                  </p>

                  <h3 className="font-semibold text-gray-800 mt-2 mb-1">
                    Items:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {(order.cart || []).map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} → ₹
                        {Number(item.price) * Number(item.quantity)}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="font-bold text-gray-900 text-lg mb-4">
                  Total: ₹{order.amount || 0}
                </p>

                <button
                  onClick={() => updateStatus(order.id, status)}
                  className={`w-full py-2 rounded-lg font-semibold text-white ${
                    isDelivered
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isDelivered}
                >
                  {isDelivered
                    ? "Delivered"
                    : status === "Shipped"
                    ? "Mark as Delivered"
                    : "Mark as Shipped"}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
