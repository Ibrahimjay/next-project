import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET - fetch all listings
export async function GET() {
  try {
    const listings = await prisma.business.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

// ✅ POST - create new listing
export async function POST(req) {
  try {
    const data = await req.json();

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
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to add listing" },
      { status: 500 }
    );
  }
}
