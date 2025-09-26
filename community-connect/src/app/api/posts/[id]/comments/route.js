// app/api/post/[id]/comment/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import  prisma  from "@/lib/prisma";

// POST /api/post/[id]/comment
export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();
    const { id } = params; // post ID from URL

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: session.user.id,
        postId: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Comment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
