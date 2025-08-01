import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params }) {
  await prisma.like.delete({
    where: {
      userId_postId: {
        userId: params.userId,
        postId: params.postId,
      },
    },
  });
  return new NextResponse(null, { status: 204 });
}
