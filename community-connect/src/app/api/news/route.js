// src/app/api/news/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/** GET /api/news — return all news */
export async function GET() {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(allNews);
  } catch (err) {
    console.error("Fetch news error:", err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

/** POST /api/news — create a news item */
export async function POST(req) {
  try {
    const data = await req.json();

    // validate minimal required fields
    if (!data.headline || !data.content) {
      return NextResponse.json({ error: "Missing headline or content" }, { status: 400 });
    }

    // Determine publisherId:
    // - Ideally this comes from authenticated user (session)
    // - Fallback: use first user in DB (dev only) or require publisherId in the request
    let publisherId = data.publisherId;
    if (!publisherId) {
      const someUser = await prisma.user.findFirst();
      if (!someUser) {
        return NextResponse.json(
          { error: "No publisherId provided and no users in DB. Create a user first." },
          { status: 400 }
        );
      }
      publisherId = someUser.id;
    }

    const news = await prisma.news.create({
      data: {
        headline: data.headline,
        image: data.image || "/images/placeholder.png",
        content: data.content,
        timePosted: data.timePosted || new Date().toISOString(),
        source: data.source || null,
        likes: data.likes ?? 0,
        comments: data.comments ?? 0,
        isLiked: data.isLiked ?? false,
        publisherId,
        ctaText: data.ctaText || null,
        isPinned: data.isPinned ?? false,
        isSponsored: data.isSponsored ?? false,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (err) {
    console.error("Create news error:", err);
    return NextResponse.json({ error: "Failed to create news", details: err.message }, { status: 500 });
  }
}
