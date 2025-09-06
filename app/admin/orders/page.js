"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
      {orders.length === 0 && <p className="text-center">No orders found.</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow-md space-y-2"
          >
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p><strong>Customer:</strong> {order.customerInfo?.name || "N/A"}</p>
            <p><strong>Email:</strong> {order.customerInfo?.email || "N/A"}</p>
            <p><strong>Address:</strong> {order.customerInfo?.address || "N/A"}</p>
            <p><strong>Phone:</strong> {order.customerInfo?.phone || "N/A"}</p>
            <p><strong>Total:</strong> ₹{order.total || 0}</p>
            <p><strong>Status:</strong> {order.status || "pending"}</p>

            <div className="flex gap-2 mt-2">
              {["pending", "shipped", "delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(order.id, status)}
                  className={`px-3 py-1 rounded-lg text-white ${
                    order.status === status
                      ? "bg-gray-500 cursor-not-allowed"
                      : status === "pending"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : status === "shipped"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={order.status === status}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <h3 className="font-semibold">Items:</h3>
              <ul className="list-disc ml-5">
                {order.items?.map((item) => (
                  <li key={item.productId}>
                    {item.name || "Item"} x {item.quantity || 1} - ₹{(item.price || 0) * (item.quantity || 1)}
                  </li>
                )) || <li>No items</li>}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
