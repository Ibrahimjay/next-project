"use client";

import { BellIcon, SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center gap-2 text-green-600"
            >
              <Image
                src="/logo.svg"
                width={32}
                height={32}
                alt="CConnect Logo"
              />
              CConnect
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  <p className="text-gray-500 text-xs">
                    {session.user.neighborhood}
                  </p>
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
  );
};

export default NavHeader;
