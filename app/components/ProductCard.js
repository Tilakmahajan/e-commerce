"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-blue-600 font-bold">₹{product.price}</p>
      <Link
        href={`/products/${product.id}`}
        className="block mt-3 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}
