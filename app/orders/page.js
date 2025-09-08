"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "@/app/components/AuthContext";

export default function OrdersPage() {
  const { user, role, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setError("❌ You must be logged in to view orders.");
      return;
    }

    const fetchOrders = async () => {
      try {
        let q;

        if (role === "admin") {
          q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        } else {
          q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
        }

        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            items: data.items || [], // ✅ default empty array
          };
        });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, [user, role, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {role === "admin" ? "All Orders" : "My Orders"}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-md">
              <p className="font-semibold mb-2">
                Order ID: {order.id} | Status: {order.status || "Pending"}
              </p>

              <ul className="divide-y">
                {order.items.map((item, idx) => (
                  <li key={idx} className="py-2 flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 font-bold">
                Total: ₹{order.items.reduce((acc, i) => acc + (i.price * i.quantity || 0), 0)}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Placed on: {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
