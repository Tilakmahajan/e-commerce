"use client";
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

  // Only show the first image on Home/Product page
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : product.image;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          className="object-contain w-full h-full"
          width={400}
          height={300}
          unoptimized
          priority
        />
      </div>

      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAdd}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
      >
        Add to Cart
      </button>
    </div>
  );
}
