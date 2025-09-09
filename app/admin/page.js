"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "@/app/components/AuthContext";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const { user, role, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const productsCollection = collection(db, "products");

  // ✅ Fetch products (memoized for eslint)
  const fetchProducts = useCallback(async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [productsCollection]);

  // ✅ Route protection for admin only
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login"); // not logged in
      } else if (!user.emailVerified) {
        router.push("/"); // logged in but not verified
      } else if (role !== "admin") {
        router.push("/"); // verified but not admin
      } else {
        setMounted(true);
        fetchProducts();
      }
    }
  }, [user, role, loading, router, fetchProducts]);

  // ✅ Handle Add / Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: Math.max(0, Number(form.price)), // prevent negative
    };

    if (editingId) {
      const productDoc = doc(db, "products", editingId);
      await updateDoc(productDoc, productData);
      setEditingId(null);
    } else {
      await addDoc(productsCollection, productData);
    }

    setForm({ name: "", description: "", price: "", image: "" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", price: "", image: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  // ✅ Show loader until checks are done
  if (loading || !mounted) {
    return <p className="text-center mt-20 text-lg">Checking access...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Admin Panel
      </h1>

      <div className="mb-6 flex justify-center">
        <button
          onClick={() => router.push("/admin/orders")}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
        >
          View Orders
        </button>
      </div>

      {/* Product form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8 grid gap-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="border rounded-lg px-4 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border rounded-lg px-4 py-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="border rounded-lg px-4 py-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border rounded-lg px-4 py-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:opacity-90 transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-2 bg-gray-400 text-white rounded-full shadow-lg hover:opacity-90 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products list */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  className="h-48 w-full object-cover rounded-lg mb-4"
  unoptimized
/>

            <h2 className="font-semibold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            <p className="font-semibold text-blue-600 mb-2">₹{product.price}</p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
