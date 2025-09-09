/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com", // ✅ Amazon product images
      "firebasestorage.googleapis.com", // ✅ Firebase storage
      "images.unsplash.com", // ✅ Unsplash (optional)
    ],
  },
};

export default nextConfig;
