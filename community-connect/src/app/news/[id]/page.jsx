import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default async function NewsDetail({ params }) {
  const { id } = await params;
  const news = await prisma.news.findUnique({
    where: { id: parseInt(id) },
  });

  const relatedNews = await prisma.news.findMany({
    where: {
      id: { not: parseInt(id) },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (!news) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              News Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              <ArrowLeft size={20} />
              <span>Back to News</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(news.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = Math.ceil(news.content.split(" ").length / 200);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition font-medium"
            >
              <ArrowLeft size={20} />
              <span>Back to News</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            {news.image ? (
              <img
                src={news.image}
                alt={news.headline}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-6xl">📰</span>
              </div>
            )}
          </div>

          {/* Article Metadata */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {news.headline}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={18} />
                <span>{readTime} min read</span>
              </div>
              {news.author && (
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span className="font-medium">{news.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              {news.content.split("\n").map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="py-8 border-t border-b border-gray-200 bg-gray-50 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-lg sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Share this article
              </h3>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full bg-white border border-gray-200 hover:border-blue-500 text-blue-600 transition">
                  <Share2 size={20} />
                </button>
                <button className="p-2 rounded-full bg-white border border-gray-200 hover:border-red-500 text-gray-400 hover:text-red-500 transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles Placeholder */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((i) => (
                <a href={`/news/${i.id}`} className="block mb-8 group">
                  <div
                    key={i.id}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 flex items-center justify-center">
                      <img
                        src={i.image}
                        alt={i.headline}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        // onError={(e) => {
                        //   e.target.src =
                        //     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%23e5e7eb' width='400' height='225'/%3E%3C/svg%3E";
                        // }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {i.headline}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {i.content.length > 200
                          ? `${i.content.slice(0, 200)}…`
                          : i.content}
                      </p>
                      <p className="text-xs text-gray-500">5 min read</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <span>Back to All News</span>
              <ArrowLeft size={20} />
            </Link>
          </div>
        </article>

        {/* Footer Info */}
        <div className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-sm text-gray-600 text-center">
              Last updated on {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
