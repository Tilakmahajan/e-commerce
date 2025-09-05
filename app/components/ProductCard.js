"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-500">{product.description}</p>
      <p className="text-blue-600 font-semibold mt-2">₹{product.price}</p>

      {/* View Details Button */}
      <Link
        href={`/products/${product.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        View Details
      </Link>
    </div>
  );
}
