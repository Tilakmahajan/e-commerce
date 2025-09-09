"use client";
import { useState } from "react";
import { useCart } from "@/app/components/CartContext";
import { useAuth } from "@/app/components/AuthContext";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAdd = () => {
    if (!user) {
      alert("⚠️ You must login to add items to cart.");
      return;
    }
    addToCart(product);
    alert("✅ Added to cart!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <Image src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-lg" />
      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAdd}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
