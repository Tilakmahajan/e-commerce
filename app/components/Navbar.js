"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(query);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hydratedUser, setHydratedUser] = useState(null);

  // ✅ Keep Navbar in sync with AuthContext
  useEffect(() => {
    setHydratedUser(user); // updates immediately when user changes
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const ordersLink = role === "admin" ? "/admin/orders" : "/orders";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value) params.set("search", value);
    else params.delete("search");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition whitespace-nowrap"
        >
          <span className="md:inline hidden">🛍️ MyStore</span>
          <span className="md:hidden inline">🛍️</span>
        </Link>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 min-w-[140px] max-w-full md:max-w-md px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-500 text-gray-900"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="text-gray-800 hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-800 hover:text-blue-600 transition">
            Products
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition">
            Contact Us
          </Link>
          {hydratedUser?.emailVerified && (
            <Link href={ordersLink} className="text-gray-800 hover:text-blue-600 transition">
              Orders
            </Link>
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-blue-600 transition" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Profile/Login */}
          {hydratedUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
              >
                <User className="w-6 h-6 text-gray-800" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b font-medium text-gray-800">
                    {hydratedUser.email?.split("@")[0]}
                  </div>
                  {hydratedUser.emailVerified && (
                    <Link
                      href={ordersLink}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                    >
                      My Orders
                    </Link>
                  )}
                  {role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 text-red-600 text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
