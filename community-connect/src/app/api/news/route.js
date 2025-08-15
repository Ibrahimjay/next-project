import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/news
export async function GET(req) {
  try {
    const news = await prisma.news.findMany({
      select: {
        id: true,
        timePosted: true,
        headline: true,
        image: true,
        content: true,
        likes: true,
        comments: true,
        isLiked: true,
        source: true,
        publisher: {
          select: {
            name: true,
            avatar: true,
            verified: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", // optional: newest first
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Fetch news error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
