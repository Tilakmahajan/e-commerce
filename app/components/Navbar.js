"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 text-black">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
         MAX WHOLESALER
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="block hover:text-blue-600">
            Products
          </Link>
          <Link href="/cart" className="block hover:text-blue-600">
            Cart
          </Link>
          <Link href="/login" className="block hover:text-blue-600">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
