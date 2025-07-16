// components/Layout.js

"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  HomeIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold flex items-center gap-2 text-green-600"
              >
                <Image src="/logo.svg" width={32} height={32} alt="CConnect Logo" />
                CConnect
              </Link>
            </div>

            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your neighborhood..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
                <BellIcon className="h-6 w-6" />
                {/* Notification badge */}
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {session ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-sm text-right">
                    <p className="font-medium text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-gray-500 text-xs">{session.user.neighborhood}</p>
                  </div>
                  <div className="relative">
                    <Image
                      src={session.user.image || "/default-avatar.png"}
                      alt={session.user.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-green-500"
                    />
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <nav className="hidden md:block w-64 bg-white min-h-screen sticky top-16">
          <div className="p-4">
            {/* Post Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Post
            </button>

            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-900 font-medium"
                >
                  <HomeIcon className="h-5 w-5 text-gray-600" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/neighbors"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-900"
                >
                  <UserGroupIcon className="h-5 w-5 text-gray-600" />
                  <span>Community Updates</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-900"
                >
                  <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
                  <span>For Sale & Free</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/issues"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-900"
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-gray-600" />
                  <span>Issue Reporting</span>
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Categories
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    General
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    Safety & Crime
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    For Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    Lost & Found
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    Recommendations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 block py-1">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            {/* Settings at bottom */}
            <div className="mt-8 pt-8 border-t">
              <Link
                href="/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                <span>Settings</span>
              </Link>
              <Link
                href="/help"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span className="text-gray-600">Help Center</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-2xl mx-auto">
            <main className="p-6">{children}</main>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 bg-white min-h-screen sticky top-16">
          <div className="p-4">
            {/* Location Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">
                  {session?.user?.neighborhood || "East Village (E4-1st-Et-Bwry)"}
                </span>
              </div>
              <p className="text-sm text-gray-500">New York</p>
            </div>

            {/* Invite Neighbors */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Invite nearby neighbors
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your invitation will include your first name, your neighborhood, and helpful information about CConnect.
              </p>
              
              <div className="space-y-2 mb-4">
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <span className="text-sm">25 2nd Ave</span>
    <span className="text-xs text-gray-500">&lt; 1 mi away</span>
  </div>
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <span className="text-sm">33 2nd Ave Apt 2C</span>
    <span className="text-xs text-gray-500">&lt; 1 mi away</span>
  </div>
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
    <span className="text-sm">33 2nd Ave Apt 4D</span>
    <span className="text-xs text-gray-500">&lt; 1 mi away</span>
  </div>
</div>
              
              <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800">
                Send 3 invitations
              </button>
            </div>

            {/* Recent Activity or Ads */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Local Business</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Gotham Dental</p>
                  <p className="text-gray-600">
                    Five star reviews. Schedule your six month cleaning today.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Located on 19th street between 5th and Broadway
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}