// src/app/news/page.jsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function NewsPage() {
  const newsList = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="max-w-5xl mx-auto p-6">     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News</h1>
        <Link href="/news/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</Link>
      </div>

      {newsList.length === 0 && <p>No news yet.</p>}

      <div className="grid gap-6">
        {newsList.map((n) => (
          <article key={n.id} className="border rounded-md overflow-hidden shadow-sm">
            {n.image && (
              // use <img> to avoid Next.js external image config issues for now
              <img src={n.image} alt={n.headline} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{n.headline}</h2>
              <p className="text-gray-700 mb-3">
                {n.content.length > 300 ? `${n.content.slice(0, 300)}…` : n.content}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{n.source || "Unknown source"}</span>
                <span>{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
