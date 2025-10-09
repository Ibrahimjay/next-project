import prisma from "@/lib/prisma";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Heart,
  Share2,
  MessageCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// ✅ Make params async (App Router requirement)
export default async function BusinessDetail({ params }) {
  const { id } = await params; // ✅ await params before using

  // ✅ Use correct relation and select fields that exist in your schema
  const listing = await prisma.business.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true, // ✅ Replaces image (based on your schema)
          address: true,
          neighborhood: true,
        },
      },
    },
  });

  // ✅ Handle missing listing gracefully
  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            This item is no longer available or has been removed.
          </p>
          <a
            href="/business"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(listing.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const sellerInitial = listing.user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a
            href="/business"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Marketplace</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-gray-100">
              {listing.image ? (
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {listing.title}
            </h1>

            <p className="text-xl font-semibold text-gray-700 mb-4">
              Price: ${listing.price}
            </p>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {listing.description || "No description provided."}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle
                size={20}
                className="text-amber-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Safety Tips</p>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Meet in a safe public location</li>
                  <li>• Check the item before making payment</li>
                  <li>• Never send money in advance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Seller Info */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Seller Information
              </h3>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {sellerInitial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {listing.user?.name || "Community Member"}
                  </p>
                  <p className="text-sm text-gray-500">{listing.user?.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2">
                  <MessageCircle size={20} />
                  <span>Send Message</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                  <Heart size={20} />
                  <span>Save Item</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600 flex items-center space-x-2">
                <Clock size={16} />
                <span>Posted {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <a
            href="/business"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <span>Continue Shopping</span>
            <ArrowLeft size={20} className="rotate-180" />
          </a>
        </div>
      </div>
    </div>
  );
}
