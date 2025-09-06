"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const productsCollection = collection(db, "products");

  // Fetch products
  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchProducts(); }, []);

  // Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const productDoc = doc(db, "products", editingId);
      await updateDoc(productDoc, { ...form, price: Number(form.price) });
      setEditingId(null);
    } else {
      await addDoc(productsCollection, { ...form, price: Number(form.price) });
    }
    setForm({ name: "", description: "", price: "", image: "" });
    fetchProducts();
  };

  // Edit product
  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  // Delete product
  const handleDelete = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  return (
    <div className="container mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Panel</h1>

      {/* Button to Orders Page */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/orders")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View Orders
        </button>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid gap-4">
        <input type="text" placeholder="Product Name" className="border rounded-lg px-4 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Description" className="border rounded-lg px-4 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="number" placeholder="Price" className="border rounded-lg px-4 py-2" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Image URL" className="border rounded-lg px-4 py-2" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-lg mb-4" />
            <h2 className="font-semibold text-gray-900">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-semibold text-blue-600 mb-2">₹{product.price}</p>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => handleEdit(product)} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
