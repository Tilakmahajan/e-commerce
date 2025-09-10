import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Script from "next/script";
import { CartProvider } from "@/app/components/CartContext";
import { AuthProvider } from "./components/AuthContext";

export const metadata = {
  title: "max-wholesaler",
  description: "Frontend-only E-commerce website with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>
    
        <CartProvider>
          <Navbar />
         
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        
          <Footer />
        </CartProvider>
</AuthProvider>
      </body>
    </html>
  );
}
