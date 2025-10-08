import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ProductDetail({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="rounded-lg mb-4 w-full h-64 object-cover"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-1 text-green-600">
        Price: ${product.price}
      </p>
      <p className="text-sm text-gray-500">
        Seller: {product.seller?.name} ({product.seller?.email})
      </p>
    </div>
  );
}
