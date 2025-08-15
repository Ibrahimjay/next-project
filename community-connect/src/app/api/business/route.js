import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/business
export async function GET(req) {
  try {
    const business = await prisma.business.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        image: true,
        location: true,
        timePosted: true,
        distance: true,
        isFavorited: true,
        isFree: true,
        isAd: true,
        originalPrice: true,
      },
      orderBy: {
        timePosted: "desc", // optional: order by most recent
      },
    });

    return NextResponse.json(business, { status: 200 });
  } catch (error) {
    console.error("Fetch business error:", error);
    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }
}
