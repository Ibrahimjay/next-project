import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');

  const likes = await prisma.like.findMany({
    where: {
      postId: postId || undefined,
      userId: userId || undefined,
    },
    include: { user: true, post: true },
  });

  return NextResponse.json(likes);
}

export async function POST(req) {
  const data = await req.json();
  const like = await prisma.like.create({ data });
  return NextResponse.json(like, { status: 201 });
}