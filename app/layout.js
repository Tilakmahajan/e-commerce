import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/components/CartContext";

export const metadata = {
  title: "E-Commerce Frontend",
  description: "Frontend-only E-commerce website with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
