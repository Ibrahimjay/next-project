import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/posts
export async function GET(req) {

  try {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const authorId = searchParams.get('authorId');
  const urgent = searchParams.get('urgent');
  const neighborhood = searchParams.get('neighborhood');

    const posts = await prisma.post.findMany({
      where: {
        category: category || undefined,
        authorId: authorId || undefined,
        urgent: urgent === 'true' ? true : urgent === 'false' ? false : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            neighborhood: true,
            verified: true,
          },
        },
        comments: {
          include: {
            author: {
              select: { id: true, name: true, avatar: true },
            },
          },
          orderBy: { createdAt: "asc" },
        },
        likes: true,
        _count: {
          select: { comments: true, likes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Fetch posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, category, urgent } = body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        urgent: urgent || false,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            neighborhood: true,
            verified: true,
          },
        },
        _count: {
          select: { comments: true, likes: true },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
