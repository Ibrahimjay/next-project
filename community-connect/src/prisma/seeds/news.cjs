const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sampleNews = [
  {
    id: 1,
    publisher: {
      name: "abc7NY",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Local publisher",
    },
    timePosted: "17 hr ago",
    headline:
      "7 On Your Side helps Brooklyn man secure late father's retirement funds",
    image: "/api/placeholder/600/400",
    content:
      "A Brooklyn man struggled for months to access his late father's retirement funds until 7 On Your Side stepped in to help navigate the complex process.",
    likes: 18,
    comments: 4,
    isLiked: false,
    source: "abc7ny.com",
  },
  {
    id: 2,
    publisher: {
      name: "Amazon Hub",
      logo: "/api/placeholder/40/40",
      verified: false,
      type: "Sponsored",
    },
    timePosted: "",
    headline: "Discover new income for your business, right next door",
    image: "/images/news.jpg",
    content:
      "Amazon Hub Delivery is looking for New York partners to make local deliveries and earn extra money for their businesses.",
    likes: 0,
    comments: 0,
    isLiked: false,
    isSponsored: true,
    ctaText: "see more",
  },
  {
    id: 3,
    publisher: {
      name: "NY1 News",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Local publisher",
    },
    timePosted: "2 hr ago",
    headline:
      "MTA announces weekend service changes affecting Brooklyn and Queens lines",
    image: "/api/placeholder/600/400",
    content:
      "Subway riders should expect delays this weekend as the MTA performs maintenance work on several key lines connecting Brooklyn and Queens.",
    likes: 32,
    comments: 12,
    isLiked: false,
    source: "ny1.com",
  },
  {
    id: 4,
    publisher: {
      name: "Brooklyn Paper",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Local publisher",
    },
    timePosted: "4 hr ago",
    headline:
      "New community garden opens in Prospect Heights, residents celebrate",
    image: "/api/placeholder/600/400",
    content:
      "Local residents gathered yesterday to celebrate the opening of a new community garden that will provide fresh produce and green space for the neighborhood.",
    likes: 45,
    comments: 8,
    isLiked: false,
    source: "brooklynpaper.com",
  },
  {
    id: 5,
    publisher: {
      name: "PIX11 News",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Local publisher",
    },
    timePosted: "6 hr ago",
    headline:
      "Local restaurant owner creates scholarship fund for neighborhood students",
    image: "/api/placeholder/600/400",
    content:
      "Maria Rodriguez, owner of Casa Bella restaurant, announced a new scholarship program to help local high school students pursue higher education.",
    likes: 89,
    comments: 23,
    isLiked: true,
    source: "pix11.com",
  },
  {
    id: 6,
    publisher: {
      name: "Community Board 8",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Official announcement",
    },
    timePosted: "8 hr ago",
    headline: "Street cleaning schedule changes for holiday weekend",
    image: "/api/placeholder/600/400",
    content:
      "Please note that alternate side parking rules will be suspended on Monday, October 14th in observance of Columbus Day. Regular schedule resumes Tuesday.",
    likes: 12,
    comments: 3,
    isLiked: false,
    isPinned: true,
  },
  {
    id: 7,
    publisher: {
      name: "Gothamist",
      logo: "/api/placeholder/40/40",
      verified: true,
      type: "Local publisher",
    },
    timePosted: "10 hr ago",
    headline: "NYC launches new initiative to improve neighborhood safety",
    image: "/api/placeholder/600/400",
    content:
      "The city announced a comprehensive plan to increase lighting, improve crosswalks, and add more community liaisons in residential areas.",
    likes: 156,
    comments: 34,
    isLiked: false,
    source: "gothamist.com",
  },
];

async function main() {
  for (const news of sampleNews) {
    const { publisher, ...newsData } = news;

    // Upsert publisher
    const user = await prisma.user.findFirst();

    await prisma.news.create({
      data: {
        headline: newsData.headline,
        image: newsData.image,
        content: newsData.content,
        timePosted: newsData.timePosted,
        source: newsData.source ?? null,
        likes: newsData.likes,
        comments: newsData.comments,
        isLiked: newsData.isLiked,
        isSponsored: newsData.isSponsored ?? false,
        isPinned: newsData.isPinned ?? false,
        ctaText: newsData.ctaText ?? null,
        publisherId: user.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
