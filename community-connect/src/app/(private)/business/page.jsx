"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function BusinessPage() {
  // const [listings, setListings] = useState([]);
  const router = useRouter();
  const { data: listings } = useQuery({
    queryKey: "businessListing",
    queryFn: async () => {
      const response = await fetch("/api/business");
      const data = await response.json();
      return data;
    },
  });

  // useEffect(() => {
  //   // Fetch listings from your API
  //   const fetchListings = async () => {
  //     const res = await fetch("/api/business");
  //     const data = await res.json();
  //     setListings(data);
  //   };
  //   fetchListings();
  // }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Community Marketplace</h1>

        {/* Tabs/Filters */}
        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded">For Sale</button>
          <button className="px-4 py-2 bg-gray-200 rounded">Free Items</button>
          <button className="px-4 py-2 bg-gray-200 rounded">
            Jobs & Skills
          </button>
        </div>

        {/* Listings */}
        <div className="grid md:grid-cols-4 gap-7">
          {listings?.length > 0 ? (
            listings?.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/business/${item.id}`)}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {item.category === "sale" && (
                  <p className="mt-2 text-green-600 font-bold">${item.price}</p>
                )}
                {item.category === "free" && (
                  <p className="mt-2 text-blue-600 font-bold">Free</p>
                )}
                {item.category === "job" && (
                  <p className="mt-2 text-purple-600 font-bold">Job/Skill</p>
                )}
                <p className="text-xs mt-2 text-gray-400">
                  Posted by {item.userId}
                </p>
              </div>
            ))
          ) : (
            <p>No listings yet. Be the first to post!</p>
          )}
        </div>

        {/* Floating button */}
        <Link
          href="/business/new"
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          + Add Listing
        </Link>
      </div>
    </>
  );
}
