'use client';

import React, { useState } from 'react';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// Sample news data
const sampleNews = [
  {
    id: 1,
    publisher: {
      name: 'abc7NY',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Local publisher'
    },
    timePosted: '17 hr ago',
    headline: '7 On Your Side helps Brooklyn man secure late father\'s retirement funds',
    image: '/api/placeholder/600/400',
    content: 'A Brooklyn man struggled for months to access his late father\'s retirement funds until 7 On Your Side stepped in to help navigate the complex process.',
    likes: 18,
    comments: 4,
    isLiked: false,
    source: 'abc7ny.com'
  },
  {
    id: 2,
    publisher: {
      name: 'Amazon Hub',
      logo: '/api/placeholder/40/40',
      verified: false,
      type: 'Sponsored'
    },
    timePosted: '',
    headline: 'Discover new income for your business, right next door',
    image: '/api/placeholder/600/300',
    content: 'Amazon Hub Delivery is looking for New York partners to make local deliveries and earn extra money for their businesses.',
    likes: 0,
    comments: 0,
    isLiked: false,
    isSponsored: true,
    ctaText: 'see more'
  },
  {
    id: 3,
    publisher: {
      name: 'NY1 News',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Local publisher'
    },
    timePosted: '2 hr ago',
    headline: 'MTA announces weekend service changes affecting Brooklyn and Queens lines',
    image: '/api/placeholder/600/400',
    content: 'Subway riders should expect delays this weekend as the MTA performs maintenance work on several key lines connecting Brooklyn and Queens.',
    likes: 32,
    comments: 12,
    isLiked: false,
    source: 'ny1.com'
  },
  {
    id: 4,
    publisher: {
      name: 'Brooklyn Paper',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Local publisher'
    },
    timePosted: '4 hr ago',
    headline: 'New community garden opens in Prospect Heights, residents celebrate',
    image: '/api/placeholder/600/400',
    content: 'Local residents gathered yesterday to celebrate the opening of a new community garden that will provide fresh produce and green space for the neighborhood.',
    likes: 45,
    comments: 8,
    isLiked: false,
    source: 'brooklynpaper.com'
  },
  {
    id: 5,
    publisher: {
      name: 'PIX11 News',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Local publisher'
    },
    timePosted: '6 hr ago',
    headline: 'Local restaurant owner creates scholarship fund for neighborhood students',
    image: '/api/placeholder/600/400',
    content: 'Maria Rodriguez, owner of Casa Bella restaurant, announced a new scholarship program to help local high school students pursue higher education.',
    likes: 89,
    comments: 23,
    isLiked: true,
    source: 'pix11.com'
  },
  {
    id: 6,
    publisher: {
      name: 'Community Board 8',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Official announcement'
    },
    timePosted: '8 hr ago',
    headline: 'Street cleaning schedule changes for holiday weekend',
    image: '/api/placeholder/600/400',
    content: 'Please note that alternate side parking rules will be suspended on Monday, October 14th in observance of Columbus Day. Regular schedule resumes Tuesday.',
    likes: 12,
    comments: 3,
    isLiked: false,
    isPinned: true
  },
  {
    id: 7,
    publisher: {
      name: 'Gothamist',
      logo: '/api/placeholder/40/40',
      verified: true,
      type: 'Local publisher'
    },
    timePosted: '10 hr ago',
    headline: 'NYC launches new initiative to improve neighborhood safety',
    image: '/api/placeholder/600/400',
    content: 'The city announced a comprehensive plan to increase lighting, improve crosswalks, and add more community liaisons in residential areas.',
    likes: 156,
    comments: 34,
    isLiked: false,
    source: 'gothamist.com'
  }
];

export default function LocalNewsPage() {
  const [news, setNews] = useState(sampleNews);

  const toggleLike = (id) => {
    setNews(news.map(item => 
      item.id === id ? { 
        ...item, 
        isLiked: !item.isLiked,
        likes: item.isLiked ? item.likes - 1 : item.likes + 1
      } : item
    ));
  };

  const NewsCard = ({ newsItem }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {/* Publisher Logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {newsItem.publisher.name.charAt(0)}
                  </span>
                </div>
                {newsItem.publisher.verified && (
                  <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-blue-500 bg-white rounded-full" />
                )}
              </div>
              
              {/* Publisher Info */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {newsItem.publisher.name}
                  </span>
                  {newsItem.publisher.verified && (
                    <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>{newsItem.publisher.type}</span>
                  {newsItem.timePosted && (
                    <>
                      <span>•</span>
                      <span>{newsItem.timePosted}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* More Options */}
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Sponsored Badge */}
          {newsItem.isSponsored && (
            <div className="mt-2">
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                Sponsored
              </span>
            </div>
          )}

          {/* Pinned Badge */}
          {newsItem.isPinned && (
            <div className="mt-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                📌 Pinned
              </span>
            </div>
          )}
        </div>

        {/* Headline */}
        <div className="px-4 pb-3">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {newsItem.headline}
          </h2>
        </div>

        {/* News Image */}
        {newsItem.image && (
          <div className="px-4 pb-3">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center">
                <span className="text-white text-sm">News Image</span>
              </div>
              {newsItem.source && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {newsItem.source}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Preview */}
        <div className="px-4 pb-3">
          <p className="text-gray-700 text-sm leading-relaxed">
            {newsItem.content}
          </p>
          {newsItem.ctaText && (
            <button className="text-blue-600 text-sm font-medium hover:underline mt-2">
              {newsItem.ctaText}
            </button>
          )}
        </div>

        {/* Actions */}
        {!newsItem.isSponsored && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => toggleLike(newsItem.id)}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  newsItem.isLiked 
                    ? "text-red-600" 
                    : "text-gray-500 hover:text-red-600"
                }`}
              >
                {newsItem.isLiked ? (
                  <HeartSolidIcon className="h-5 w-5" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                <span className="font-medium">{newsItem.likes}</span>
              </button>

              <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span className="font-medium">{newsItem.comments}</span>
              </button>

              <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
                <ShareIcon className="h-5 w-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Local news</h1>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Load More News
        </button>
      </div>
    </div>
  );
}