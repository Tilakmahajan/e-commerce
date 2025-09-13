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
    images: [],
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const productsCollection = collection(db, "products");

  const fetchProducts = useCallback(async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }, [productsCollection]);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (!user.emailVerified) router.push("/");
      else if (role !== "admin") router.push("/");
      else {
        setMounted(true);
        fetchProducts();
      }
    }
  }, [user, role, loading, router, fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.images || form.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const productData = {
      ...form,
      price: Math.max(0, Number(form.price)),
      category: form.category || "Uncategorized",
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        setEditingId(null);
      } else {
        await addDoc(productsCollection, productData);
      }

      setForm({ name: "", description: "", price: "", images: [], category: "" });
      document.getElementById("fileInput").value = "";
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      images: product.images || [],
      category: product.category || "",
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", price: "", images: [], category: "" });
    setEditingId(null);
    document.getElementById("fileInput").value = "";
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
        else alert("Upload failed for one image: " + (data.error || "Unknown error"));
      } catch (err) {
        console.error(err);
        alert("Upload failed. Check console.");
      }
    }

    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
  };

  if (loading || !mounted)
    return <p className="text-center mt-20 text-lg">Checking access...</p>;

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Admin Panel</h1>

      <div className="mb-6 flex justify-center">
        <button
          onClick={() => router.push("/admin/orders")}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:opacity-90 transition"
        >
          View Orders
        </button>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg mb-8 grid gap-4 max-w-xl mx-auto">
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
        <select
          className="border rounded-lg px-4 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Insulator">Insulator</option>
          <option value="Solar French guard">Solar French guard</option>
          <option value="Solar zatka machine">Solar zatka machine</option>
          <option value="Torch">Torch</option>
          <option value="Solar plate">Solar plate</option>
          <option value="Battery">Battery</option>
          <option value="Solar charge control">Solar charge control</option>
          <option value="Light">Light</option>
        </select>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="border rounded-lg px-4 py-2"
          onChange={handleImageUpload}
          multiple
        />

        {/* Image Previews */}
        {form.images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-2">
            {form.images.map((img, idx) => (
              <div key={idx} className="relative flex-shrink-0 w-32 h-32">
                <Image
                  src={img}
                  alt={`Preview ${idx}`}
                  className="rounded-lg object-contain w-full h-full"
                  width={128}
                  height={128}
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== idx),
                    }))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm hover:bg-red-600"
                  title="Remove"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={uploading}
            className={`flex-1 px-6 py-2 rounded-full shadow-lg transition ${
              uploading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90"
            }`}
          >
            {uploading ? "Uploading..." : editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="flex-1 px-6 py-2 bg-gray-400 text-white rounded-full shadow-lg hover:opacity-90 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products List */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Show all images in carousel */}
            <div className="flex overflow-x-auto gap-2 mb-4">
              {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-64 h-48 relative">
                  <Image
                    src={img}
                    alt={`${product.name} ${idx}`}
                    className="object-contain w-full h-full rounded-lg"
                    width={256}
                    height={192}
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <h2 className="font-semibold text-gray-900">{product.name}</h2>
            <p className="text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            <p className="font-semibold text-blue-600 mb-2">₹{product.price}</p>

            <div className="flex gap-2 mt-auto">
              <button onClick={() => handleEdit(product)} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
