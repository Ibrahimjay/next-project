"use client";
import { useState, useEffect } from "react";
import { Search, Plus, MapPin, Star, Heart, ChevronRight } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "sale", label: "For Sale", icon: "🛍️" },
  { id: "free", label: "Free Items", icon: "🎁" },
  { id: "job", label: "Jobs & Skills", icon: "💼" },
  { id: "services", label: "Services", icon: "🔧" },
];

const getCategoryBadge = (category) => {
  const badges = {
    sale: { bg: "bg-blue-50", text: "text-blue-700", label: "For Sale" },
    free: { bg: "bg-green-50", text: "text-green-700", label: "Free" },
    job: { bg: "bg-purple-50", text: "text-purple-700", label: "Job" },
    services: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      label: "Service",
    },
  };
  console.log("category", category);
  return badges[category] || badges.sale;
};

export const ListingCard = ({ item, favorites, toggleFavorite }) => {
  console.log("item: ", item);
  const badge = getCategoryBadge(item.category);
  const isFavorite = favorites.has(item.id);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Category Badge */}
        <div
          className={`absolute top-3 left-3 ${badge.bg} ${badge.text} text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {badge.label}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(item.id)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition"
        >
          <Heart
            size={18}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-base text-gray-900 line-clamp-2 mb-1">
          {item.title}
        </h3>

        {/* Price or Status */}
        <div className="mb-2">
          {item.category === "sale" && (
            <p className="text-lg font-bold text-gray-900">
              ${item.price?.toLocaleString() || "N/A"}
            </p>
          )}
          {item.category === "free" && (
            <p className="text-lg font-bold text-green-600">Free</p>
          )}
          {item.category === "job" && (
            <p className="text-sm text-purple-600 font-semibold">
              {item.salary || "Competitive"}
            </p>
          )}
          {item.category === "services" && (
            <p className="text-sm text-orange-600 font-semibold">
              {item.rate || "Contact for rates"}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">
            {item.location || "Sierra Leone"}
          </span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {item?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-xs font-medium text-gray-700">
              {item?.user?.name || "Community Member"}
            </span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default function BusinessPage() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/business");
        const data = await res.json();
        setListings(data || []);
        setFilteredListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
        setFilteredListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  }, [activeCategory, searchTerm, listings]);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-sm text-gray-500 mt-1">
                Buy, sell, and discover services in your community
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/business/new")}
              className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-md cursor-pointer"
            >
              <Plus size={20} />
              <span>Post</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items, services, jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading listings...</p>
            </div>
          </div>
        ) : filteredListings.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredListings.length}</span>{" "}
                listing
                {filteredListings.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    (window.location.href = `/business/${item.id}`)
                  }
                  className="cursor-pointer no-underline"
                >
                  <ListingCard
                    item={item}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Be the first to post in this category"}
            </p>
            <button
              onClick={() => (window.location.href = "/business/new")}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
            >
              <Plus size={20} />
              <span>Create Listing</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => (window.location.href = "/business/new")}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition lg:hidden cursor-pointer"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
