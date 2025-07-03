// components/Layout.js

"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold flex gap-3 text-green-600"
              >
                <Image src="/logo.svg" width={24} height={24} />
                CConnect
              </Link>
            </div>

            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your neighborhood..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>

              {session ? (
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-gray-500">{session.user.neighborhood}</p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium text-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden md:block w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <HomeIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/neighbors"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <UserGroupIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">Neighbors</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/messages"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">Settings</span>
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Categories
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    General
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    Safety & Crime
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    For Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    Lost & Found
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    Recommendations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600">
                    Events
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto p-6">{children}</main>
      </div>
    </div>
  );
}
