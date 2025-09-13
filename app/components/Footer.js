export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <h2 className="text-xl font-bold">MyShop</h2>

        {/* Copy */}
        <p className="mt-4 md:mt-0 text-sm text-gray-400">
          © {new Date().getFullYear()} Max Wholesaler. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
