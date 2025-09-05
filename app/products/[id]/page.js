"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/components/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const prod = data.find((p) => p.id.toString() === id);
        setProduct(prod);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-lg w-full h-96 object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-1 border rounded-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
              added
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
