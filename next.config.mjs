/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",               // Amazon product images
      "firebasestorage.googleapis.com",   // Firebase storage
      "images.unsplash.com",              // Unsplash (optional)
      "res.cloudinary.com",               // Cloudinary images
      "cdn.shopify.com",                  // ⭐ Required for CSV Shopify images
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",      // Additional safe rule
      },
    ],
  },
};

export default nextConfig;
