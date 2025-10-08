import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --------------------------
  // Users
  // --------------------------
  const passwordHash = await bcrypt.hash("password123", 10);

  const adminUser = await prisma.user.findFirst({ where: { email: "admin@community.com" } }) ||
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@community.com",
        password: passwordHash,
        address: "123 Admin St",
        neighborhood: "Central",
        role: "admin",
        verified: true,
      },
    });

  const normalUser = await prisma.user.findFirst({ where: { email: "user@community.com" } }) ||
    await prisma.user.create({
      data: {
        name: "Normal User",
        email: "user@community.com",
        password: passwordHash,
        address: "456 User Rd",
        neighborhood: "Eastside",
        role: "user",
        verified: true,
      },
    });

  // --------------------------
  // Posts
  // --------------------------
  const postsData = [
    {
      content: "This is the first post!",
      imageUrl: "https://via.placeholder.com/400x400?text=Post+1",
      authorId: normalUser.id,
    },
    {
      content: "Another update from our community.",
      imageUrl: "https://via.placeholder.com/400x400?text=Post+2",
      authorId: normalUser.id,
    },
  ];

  for (const p of postsData) {
    await prisma.post.findFirst({ where: { content: p.content } }) ||
      await prisma.post.create({ data: p });
  }

  // --------------------------
  // News
  // --------------------------
  const newsData = [
    {
      headline: "Community Clean-Up Drive",
      image: "https://via.placeholder.com/600x400?text=News+1",
      content: "Join us this Saturday for a community clean-up in Downtown District.",
      timePosted: "2025-10-08T10:00:00Z",
      source: "Community Connect",
      likes: 0,
      comments: 0,
      publisherId: adminUser.id,
      ctaText: "Join Now",
      isPinned: true,
    },
    {
      headline: "New Playground Opening",
      image: "https://via.placeholder.com/600x400?text=News+2",
      content: "A new playground is now open in Eastside Community for children.",
      timePosted: "2025-10-07T12:00:00Z",
      source: "Local News",
      likes: 0,
      comments: 0,
      publisherId: adminUser.id,
    },
  ];

  for (const n of newsData) {
    await prisma.news.findFirst({ where: { headline: n.headline } }) ||
      await prisma.news.create({ data: n });
  }

 // --------------------------
// Reports
// --------------------------
const reportsData = [
  {
    title: "Broken Streetlight",
    category: "Infrastructure",
    description: "The streetlight near 5th Avenue is broken and needs repair.",
    location: "5th Avenue, Downtown",
    priority: "medium",
    status: "reported",
    photos: ["https://via.placeholder.com/400x400?text=Streetlight"],
    name: normalUser.name,
    email: normalUser.email,
    phone: "1234567890",
    publisherId: normalUser.id, // keep for reference
  },
  {
    title: "Pothole on Main Road",
    category: "Road",
    description: "A large pothole is causing accidents on Main Road.",
    location: "Main Road, Eastside",
    priority: "high",
    status: "reported",
    photos: ["https://via.placeholder.com/400x400?text=Pothole"],
    name: normalUser.name,
    email: normalUser.email,
    publisherId: normalUser.id,
  },
];

for (const r of reportsData) {
  await prisma.report.findFirst({ where: { title: r.title } }) ||
    await prisma.report.create({
      data: {
        title: r.title,
        category: r.category,
        description: r.description,
        location: r.location,
        priority: r.priority,
        status: r.status,
        photos: r.photos,
        name: r.name,
        email: r.email,
        phone: r.phone,
        publisher: {
          connect: { id: normalUser.id } // <-- CONNECT to existing user
        }
      }
    });
}


  // --------------------------
  // Businesses
  // --------------------------
  const businessData = [
    {
      title: "Handmade Basket",
      price: "25.00",
      image: "https://via.placeholder.com/400x400?text=Basket",
      location: "Downtown Market",
      isFavorited: false,
      isFree: false,
      isAd: false,
    },
    {
      title: "Organic Coffee Beans",
      price: "15.50",
      image: "https://via.placeholder.com/400x400?text=Coffee",
      location: "Eastside Market",
      isFavorited: false,
      isFree: false,
      isAd: false,
    },
  ];

  for (const b of businessData) {
    await prisma.business.findFirst({ where: { title: b.title } }) ||
      await prisma.business.create({ data: b });
  }

  console.log("✅ Seed data created successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
