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
        <head>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
        <CartProvider>
          <Navbar />
          <CartProvider>
          <main className="min-h-screen bg-gray-50">{children}</main>
          </CartProvider>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
