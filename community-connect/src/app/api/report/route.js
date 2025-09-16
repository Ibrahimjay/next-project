import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/report
export async function GET(req) {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Fetch reports error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

// POST /api/report
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      description,
      location,
      priority = "medium",
      photos = [],
      contactInfo,
    } = body;

    // Validate required fields
    if (
      !title ||
      !category ||
      !description ||
      !location ||
      !contactInfo?.name ||
      !contactInfo?.email
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        title,
        category,
        description,
        location,
        priority,
        status: "reported",
        photos,
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone || null,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Create report error:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
