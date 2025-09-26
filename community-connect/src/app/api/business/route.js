import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure you have prisma client setup

// POST - create new listing
export async function POST(req) {
  try {
    const data = await req.json();

    // later: replace "test-user-id" with session.user.id from NextAuth
   const listing = await prisma.business.create({
  data: {
    title: data.title,
    price: data.price ? String(data.price) : "0",
    image: data.image || "/images/placeholder.png",
    location: data.location || "",
    timePosted: data.timePosted || new Date().toISOString(),
    distance: data.distance || 0,
    isFavorited: false,
    isFree: data.isFree || false,
    isAd: false,
    originalPrice: data.originalPrice || "",
    // remove: description, category, userId
  },
});

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: "Failed to add listing" }, { status: 500 });
  }
}
