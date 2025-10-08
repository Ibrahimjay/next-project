"use client";
// src/app/news/page.jsx
import Layout from "@/components/Layout";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

export default function NewsPage() {
  const { data: session } = useSession();
  // const newsList = await prisma.news.findMany({
  //   orderBy: { createdAt: "desc" },
  // });

  const { data: newsList } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch(`/api/news/`);
      const data = await response.json();

      console.log("use query news: ", data);
      return data;
    },
  });

  console.log("data news: ", newsList);

  console.log("session: ", session);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News</h1>
          <Link
            href="/news/new"
            className={`bg-blue-600 text-white px-4 py-2 rounded ${
              session?.user?.role !== UserRole.admin && "hidden"
            }`}
          >
            + Add
          </Link>
        </div>

        {newsList?.length === 0 && <p>No news yet.</p>}

        <div className="grid gap-6">
          {newsList?.map((n) => (
            <article
              key={n.id}
              className="border rounded-md overflow-hidden shadow-sm"
            >
              {n.image && (
                // use <img> to avoid Next.js external image config issues for now
                <img
                  src={n.image}
                  alt={n.headline}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.log(`Failed to load image: ${n.image}`);
                    // Optionally set a fallback image
                    e.target.src = "/images/fallback.png";
                  }}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{n.headline}</h2>
                <p className="text-gray-700 mb-3">
                  {n.content.length > 300
                    ? `${n.content.slice(0, 300)}…`
                    : n.content}
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
    </Layout>
  );
}
