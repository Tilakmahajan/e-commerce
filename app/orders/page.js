"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebaseConfig";
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "@/app/components/AuthContext";
import { Package, Truck, CheckCircle } from "lucide-react";

// Steps for progress bar
const STEPS = [
  { label: "Pending", icon: Package },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

// Normalize status (remove case/space issues)
function normalizeStatus(s) {
  if (!s) return "pending";
  return String(s).trim().toLowerCase();
}

export default function CustomerOrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    setFetching(true);
    const ordersCol = collection(db, "orders");
    const q = query(
      ordersCol,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setFetching(false);
      },
      (error) => {
        console.error("❌ Failed to fetch customer orders:", error);
        setFetching(false);
      }
    );

    return () => unsubscribe();
  }, [user, loading, router]);

  if (loading || fetching)
    return <p className="text-center mt-20 text-lg">Loading your orders...</p>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const norm = normalizeStatus(order.status);
            const currentStep = ["pending", "shipped", "delivered"].indexOf(norm);
            const createdAtLabel =
              order.createdAt?.toDate?.() &&
              order.createdAt.toDate().toLocaleString();

            return (
              <motion.div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                      Order #{String(order.id).slice(0, 8).toUpperCase()}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">{createdAtLabel}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    ₹{order.amount || 0}
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mb-4">
                  <div className="flex items-center">
                    {STEPS.map((step, idx) => {
                      const Icon = step.icon;
                      const active = idx <= currentStep;
                      return (
                        <div key={step.label} className="flex-1 flex items-center">
                          <div className="flex flex-col items-center w-full">
                            <div
                              className={`w-9 h-9 flex items-center justify-center rounded-full ${
                                active
                                  ? "bg-blue-600 text-white"
                                  : "bg-white ring-1 ring-gray-200 text-gray-500"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div
                              className={`mt-2 text-xs font-medium ${
                                active ? "text-blue-600" : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </div>
                          </div>
                          {/* Connector */}
                          {idx < STEPS.length - 1 && (
                            <div
                              className={`h-1 flex-1 mx-3 rounded transition-all ${
                                idx < currentStep ? "bg-blue-600" : "bg-gray-200"
                              }`}
                              aria-hidden
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items */}
                <ul className="text-sm text-gray-700 space-y-1 mb-3">
                  {(order.cart || []).map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-800">
                        ₹{Number(item.price) * Number(item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500">
                    Payment:{" "}
                    <span className="text-gray-700">
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : order.paymentId || "—"}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      norm === "delivered"
                        ? "text-green-600"
                        : norm === "shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status || "Pending"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
