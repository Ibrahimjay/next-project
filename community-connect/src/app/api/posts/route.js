import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/posts
export async function GET(req) {
  try {
    const posts = await prisma.post.findMany({
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

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const content = formData.get("content");
  const imageUrl = formData.get("imageUrl") || null;

  // if (files.length > 0) {
  //   // You need to upload the file(s) to storage (e.g., S3, Cloudinary)
  //   // Here's a placeholder:
  //   imageUrl = await uploadFileToStorage(files[0]); // Implement this
  // }

  const post = await prisma.post.create({
    data: {
      content,
      imageUrl,
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
}
