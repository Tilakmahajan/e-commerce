"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/components/CartContext";
import products from "@/app/data/products";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-2xl text-blue-600 font-bold mt-4">
          ₹{product.price}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-6 space-x-4">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 border rounded-md px-2 py-1 text-center"
          />
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product, quantity)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
