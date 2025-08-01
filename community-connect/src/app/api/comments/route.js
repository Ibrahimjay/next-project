// app/api/comments/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const authorId = searchParams.get('authorId');

  const comments = await prisma.comment.findMany({
    where: {
      postId: postId || undefined,
      authorId: authorId || undefined,
    },
    include: { author: true, post: true },
  });

  return NextResponse.json(comments);
}

export async function POST(req) {
  const data = await req.json();
  const comment = await prisma.comment.create({ data });
  return NextResponse.json(comment, { status: 201 });
}