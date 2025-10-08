import prisma from "@/lib/prisma";

export default async function NewsDetail({ params }) {
  const news = await prisma.news.findUnique({
    where: { id: parseInt(params.id) }, // convert to number if ID is Int
  });

  if (!news) return <p className="text-center text-red-500">News not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <img
        src={news.image}
        alt={news.headline}
        className="rounded-lg mb-4 w-full h-64 object-cover"
      />
      <h1 className="text-3xl font-bold mb-2">{news.headline}</h1>
      <p className="text-gray-800 leading-relaxed">{news.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Published on {new Date(news.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
