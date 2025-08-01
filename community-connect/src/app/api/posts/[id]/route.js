// app/api/posts/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true },
  });
  return NextResponse.json(post);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.post.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await prisma.post.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}