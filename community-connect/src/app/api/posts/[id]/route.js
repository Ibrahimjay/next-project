// app/api/posts/[id]/route.ts
import { storage } from "@/lib/appwrite";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = await params;
  if (id) {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true },
    });
    return NextResponse.json(post);
  } else {
    return new NextResponse(null, { status: 404 });
  }
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
  const { id } = await params;
  if (id) {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { imageStoreID: true },
    });
    console.log("post: ", post);
    await prisma.post.delete({ where: { id } });
    await storage.deleteFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
      post.imageStoreID
    );
    return new NextResponse(null, { status: 204 });
  } else {
    return new NextResponse(null, { status: 400 });
  }
}
