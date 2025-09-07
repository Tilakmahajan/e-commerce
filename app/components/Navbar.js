"use client";
import Link from "next/link";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ShoppingCart, Menu } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600 tracking-tight hover:scale-105 transition-transform"
        >
          🛍️ MyStore
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
            Products
          </Link>
          <Link href="/orders" className="text-gray-700 hover:text-blue-600 transition">
            Orders
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact Us
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md hover:opacity-90 transition-all font-medium"
              >
                {user.email.split("@")[0]}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg border animate-fade-in">
                  <Link
                    href="/orders"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-700 text-sm"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md hover:opacity-90 transition-all font-semibold"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t animate-slide-down">
          <Link href="/" className="block px-6 py-3 hover:bg-gray-100">
            Home
          </Link>
          <Link href="/products" className="block px-6 py-3 hover:bg-gray-100">
            Products
          </Link>
          <Link href="/orders" className="block px-6 py-3 hover:bg-gray-100">
            Orders
          </Link>
          <Link href="/contact" className="block px-6 py-3 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
