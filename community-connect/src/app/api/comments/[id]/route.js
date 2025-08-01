import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const comment = await prisma.comment.findUnique({ where: { id: params.id } });
  return NextResponse.json(comment);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.comment.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await prisma.comment.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}