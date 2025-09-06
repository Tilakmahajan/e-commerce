"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setIsLoggedIn(adminStatus !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setIsLoggedIn(false);
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Max Wholesaler
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/products" className="hover:text-blue-600 transition">
          Products
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-blue-600 transition">
          <ShoppingCart size={20} /> Cart
        </Link>

        {/* Admin link only for admins */}
        {isAdmin && (
          <Link href="/admin" className="hover:text-blue-600 font-semibold transition">
            Admin
          </Link>
        )}

        {/* Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
