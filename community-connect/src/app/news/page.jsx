"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { Search, Plus, Clock, User, Bookmark, Share2, TrendingUp, AlertCircle } from "lucide-react";

export default function NewsPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  const { data: newsList, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch(`/api/news/`);
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  useEffect(() => {
    if (newsList) {
      const filtered = newsList.filter(
        (news) =>
          news.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  }, [searchTerm, newsList]);

  const formatDate = (date) => {
    const now = new Date();
    const newsDate = new Date(date);
    const diff = now - newsDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return newsDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: newsDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">News</h1>
              <p className="text-gray-600 mt-1">Stay updated with the latest community stories</p>
            </div>
            {session?.user?.role === UserRole.admin && (
              <a
                href="/news/new"
                className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
              >
                <Plus size={20} />
                <span>Post News</span>
              </a>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading news...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error loading news</h3>
              <p className="text-red-700">Unable to load news articles. Please try again later.</p>
            </div>
          </div>
        ) : filteredNews?.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search terms" : "Check back soon for community updates"}
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredNews.length}</span> article
                {filteredNews.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Featured Article (First one) */}
            {filteredNews[0] && (
              <a
                href={`/news/${filteredNews[0].id}`}
                className="block mb-8 group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                  {filteredNews[0].image && (
                    <div className="relative overflow-hidden bg-gray-100 aspect-video">
                      <img
                        src={filteredNews[0].image}
                        alt={filteredNews[0].headline}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%23e5e7eb' width='400' height='225'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center space-x-1 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          <TrendingUp size={14} />
                          <span>Featured</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {filteredNews[0].headline}
                    </h2>
                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {filteredNews[0].content.length > 300
                        ? `${filteredNews[0].content.slice(0, 300)}…`
                        : filteredNews[0].content}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{formatDate(filteredNews[0].createdAt)}</span>
                      </div>
                      {filteredNews[0].source && (
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{filteredNews[0].source}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* News Grid */}
            {filteredNews.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.slice(1).map((news) => (
                  <a
                    key={news.id}
                    href={`/news/${news.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group"
                  >
                    {news.image && (
                      <div className="relative overflow-hidden bg-gray-100 aspect-video">
                        <img
                          src={news.image}
                          alt={news.headline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%23e5e7eb' width='400' height='225'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {news.headline}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {news.content.length > 200
                          ? `${news.content.slice(0, 200)}…`
                          : news.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{formatDate(news.createdAt)}</span>
                        </div>
                        {news.source && (
                          <span className="text-gray-600 font-medium">{news.source}</span>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      {session?.user?.role === UserRole.admin && (
        <a
          href="/news/new"
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition lg:hidden"
        >
          <Plus size={24} />
        </a>
      )}
    </div>
  );
}