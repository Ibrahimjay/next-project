'use client';

import React, { useState } from 'react';
import { HeartIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Layout from '@/components/Layout';

// Sample marketplace data
const sampleListings = [
  {
    id: 1,
    title: 'Free Dining Room Table',
    price: 'FREE',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '5 min ago',
    distance: '8.9 mi',
    isFavorited: false,
    isFree: true
  },
  {
    id: 2,
    title: 'Hydrofarm FLT44 System 4...',
    price: '$50',
    image: '/api/placeholder/300/200',
    location: 'Queens',
    timePosted: '51 min ago',
    distance: '9.0 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 3,
    title: 'Take a swing on the flying trapeze! All-levels classes...',
    price: '',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '',
    distance: '',
    isFavorited: false,
    isFree: false,
    isAd: true
  },
  {
    id: 4,
    title: 'Black Wooden Cabinet',
    price: 'FREE',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '1 hr ago',
    distance: '0.4 mi',
    isFavorited: false,
    isFree: true
  },
  {
    id: 5,
    title: 'Dunkin Donuts $50 Gift...',
    price: '$40',
    image: '/api/placeholder/300/200',
    location: 'Brooklyn',
    timePosted: '1 hr ago',
    distance: '5.0 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 6,
    title: 'Vitrola',
    price: '$50',
    image: '/api/placeholder/300/200',
    location: 'Queens',
    timePosted: '4 min ago',
    distance: '6.2 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 7,
    title: 'Brand Out Loud, personal...',
    price: '$90',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '46 min ago',
    distance: '0.5 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 8,
    title: 'Dunkin\' Donuts Gift Card',
    price: '$20',
    image: '/api/placeholder/300/200',
    location: 'Brooklyn',
    timePosted: '1 hr ago',
    distance: '5.0 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 9,
    title: 'Home Gym Equipment',
    price: '$250',
    image: '/api/placeholder/300/200',
    location: 'Ridgefield',
    timePosted: '29 min ago',
    distance: '9.4 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 10,
    title: 'SW Admissions',
    price: 'From "Where do I start?" to "I got in!"',
    image: '/api/placeholder/300/200',
    location: '',
    timePosted: '',
    distance: '',
    isFavorited: false,
    isFree: false,
    isAd: true
  },
  {
    id: 11,
    title: 'Black Desk with Chair and...',
    price: '$50',
    originalPrice: '$75',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '17 min ago',
    distance: '5.5 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 12,
    title: 'Wooden leaning Shelf',
    price: '$15',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '1 hr ago',
    distance: '4.5 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 13,
    title: 'Giant Bicycle',
    price: '$100',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '16 min ago',
    distance: '6.9 mi',
    isFavorited: false,
    isFree: false
  },
  {
    id: 14,
    title: 'Brigetta Brianna Navy...',
    price: '$20',
    image: '/api/placeholder/300/200',
    location: 'New York',
    timePosted: '41 min ago',
    distance: '4.2 mi',
    isFavorited: false,
    isFree: false
  }
];

export default function MarketplacePage() {
  const [listings, setListings] = useState(sampleListings);
  const [activeTab, setActiveTab] = useState('All listings');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [priceFilter, setPriceFilter] = useState('Free');
  const [distanceFilter, setDistanceFilter] = useState('10 mi');
  const [sortBy, setSortBy] = useState('Most Relevant');

  const toggleFavorite = (id) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, isFavorited: !listing.isFavorited } : listing
    ));
  };

  const tabs = ['All listings', 'Your listings', 'Saved listings'];

  const MarketplaceCard = ({ listing }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 relative">
        {/* Heart Icon */}
        <button
          onClick={() => toggleFavorite(listing.id)}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-all duration-200"
        >
          {listing.isFavorited ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image placeholder</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Price */}
          <div className="mb-2">
            {listing.isFree ? (
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                FREE
              </span>
            ) : listing.isAd ? (
              <div className="text-blue-600 text-sm font-medium">
                {listing.price}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  {listing.price}
                </span>
                {listing.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {listing.originalPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
            {listing.title}
          </h3>

          {/* Location and Time */}
          {!listing.isAd && (
            <div className="text-xs text-gray-500">
              {listing.timePosted && (
                <span>{listing.timePosted}</span>
              )}
              {listing.timePosted && listing.distance && (
                <span> • </span>
              )}
              {listing.distance && (
                <span>{listing.distance}</span>
              )}
              {(listing.timePosted || listing.distance) && listing.location && (
                <span> • </span>
              )}
              {listing.location && (
                <span>{listing.location}</span>
              )}
            </div>
          )}

          {/* Ad label */}
          {listing.isAd && (
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded mt-2">
              Ad
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Categories */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option>Categories: All categories</option>
            <option>Furniture</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home & Garden</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Price */}
        <div className="relative">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option>Free</option>
            <option>Under $25</option>
            <option>$25 - $100</option>
            <option>$100 - $500</option>
            <option>$500+</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Distance */}
        <div className="relative">
          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option>Distance: 10 mi</option>
            <option>Distance: 5 mi</option>
            <option>Distance: 25 mi</option>
            <option>Distance: 50 mi</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort By */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option>Sort By: Most Relevant</option>
            <option>Sort By: Newest</option>
            <option>Sort By: Price: Low to High</option>
            <option>Sort By: Price: High to Low</option>
            <option>Sort By: Distance</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Discounted Badge */}
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
          Discounted
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {listings.map((listing) => (
          <MarketplaceCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Load More Listings
        </button>
      </div>
    </div> </Layout>
  );
}