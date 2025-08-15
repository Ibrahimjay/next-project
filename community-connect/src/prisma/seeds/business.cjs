const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleListings = [
  {
    id: 1,
    title: "Free Dining Room Table",
    price: "FREE",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "5 min ago",
    distance: 8.9,
    isFavorited: false,
    isFree: true,
  },
  {
    id: 2,
    title: "Hydrofarm FLT44 System 4...",
    price: "$50",
    image: "/api/placeholder/300/200",
    location: "Queens",
    timePosted: "51 min ago",
    distance: 9.0,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 3,
    title: "Take a swing on the flying trapeze! All-levels classes...",
    price: "",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "",
    distance: null,
    isFavorited: false,
    isFree: false,
    isAd: true,
  },
  {
    id: 4,
    title: "Black Wooden Cabinet",
    price: "FREE",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "1 hr ago",
    distance: 0.4,
    isFavorited: false,
    isFree: true,
  },
  {
    id: 5,
    title: "Dunkin Donuts $50 Gift...",
    price: "$40",
    image: "/api/placeholder/300/200",
    location: "Brooklyn",
    timePosted: "1 hr ago",
    distance: 5.0,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 6,
    title: "Vitrola",
    price: "$50",
    image: "/api/placeholder/300/200",
    location: "Queens",
    timePosted: "4 min ago",
    distance: 6.2,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 7,
    title: "Brand Out Loud, personal...",
    price: "$90",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "46 min ago",
    distance: 0.5,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 8,
    title: "Dunkin' Donuts Gift Card",
    price: "$20",
    image: "/api/placeholder/300/200",
    location: "Brooklyn",
    timePosted: "1 hr ago",
    distance: 5.0,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 9,
    title: "Home Gym Equipment",
    price: "$250",
    image: "/api/placeholder/300/200",
    location: "Ridgefield",
    timePosted: "29 min ago",
    distance: 9.4,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 10,
    title: "SW Admissions",
    price: 'From "Where do I start?" to "I got in!"',
    image: "/api/placeholder/300/200",
    location: "",
    timePosted: "",
    distance: null,
    isFavorited: false,
    isFree: false,
    isAd: true,
  },
  {
    id: 11,
    title: "Black Desk with Chair and...",
    price: "$50",
    originalPrice: "$75",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "17 min ago",
    distance: 5.5,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 12,
    title: "Wooden leaning Shelf",
    price: "$15",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "1 hr ago",
    distance: 4.5,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 13,
    title: "Giant Bicycle",
    price: "$100",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "16 min ago",
    distance: 6.9,
    isFavorited: false,
    isFree: false,
  },
  {
    id: 14,
    title: "Brigetta Brianna Navy...",
    price: "$20",
    image: "/api/placeholder/300/200",
    location: "New York",
    timePosted: "41 min ago",
    distance: 4.2,
    isFavorited: false,
    isFree: false,
  },
];

async function main() {
  for (const listing of sampleListings) {
    await prisma.business.upsert({
      where: { id: listing.id },
      update: {},
      create: listing,
    });
  }
}

main()
  .then(() => {
    console.log("Seed data inserted.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
