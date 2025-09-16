import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/report/[id]
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Fetch report error:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

// PUT /api/report/[id]
export async function PUT(req, { params }) {
  const { id } = await params;
  const data = await req.json();

  try {
    const updated = await prisma.report.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update report error:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

// DELETE /api/report/[id]
export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    await prisma.report.delete({ where: { id } });
    return NextResponse.json({ message: "Report deleted" });
  } catch (error) {
    console.error("Delete report error:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
