let products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest smartphone",
    price: 12000,
    image: "/images/smartphone.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Headphones",
    description: "Noise-cancelling headphones",
    price: 2500,
    image: "/images/headphones.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Laptop",
    description: "High-performance laptop",
    price: 55000,
    image: "/images/laptop.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "Smartwatch",
    description: "Fitness & notifications",
    price: 7000,
    image: "/images/smartwatch.jpg",
    featured: false,
  },
];

export async function GET(req) {
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  const newProduct = await req.json();
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);
  return new Response(JSON.stringify(newProduct), { status: 201 });
}

export async function PUT(req) {
  const updatedProduct = await req.json();
  products = products.map((p) =>
    p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
  );
  return new Response(JSON.stringify(updatedProduct), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  products = products.filter((p) => p.id !== id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
