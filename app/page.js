import products from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to MyShop</h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover the best deals on electronics, gadgets, and more!
        </p>
        <a
          href="/products"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100"
        >
          Shop Now
        </a>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
