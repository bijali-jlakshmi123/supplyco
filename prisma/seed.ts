import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding Supplyco database...");

  // Create Admin User
  const hashedPassword = await bcrypt.hash("admin@123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@supplyco.in" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@supplyco.in",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin created:", admin.email);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "vegetables" },
      update: {},
      create: {
        name: "Vegetables",
        slug: "vegetables",
        icon: "🥦",
        color: "#00a651",
        description: "Fresh daily vegetables",
      },
    }),
    prisma.category.upsert({
      where: { slug: "fruits" },
      update: {},
      create: {
        name: "Fruits",
        slug: "fruits",
        icon: "🍎",
        color: "#ff6b6b",
        description: "Fresh seasonal fruits",
      },
    }),
    prisma.category.upsert({
      where: { slug: "dairy" },
      update: {},
      create: {
        name: "Dairy",
        slug: "dairy",
        icon: "🥛",
        color: "#00aaff",
        description: "Fresh dairy products",
      },
    }),
    prisma.category.upsert({
      where: { slug: "grains" },
      update: {},
      create: {
        name: "Grains & Rice",
        slug: "grains",
        icon: "🌾",
        color: "#ffd700",
        description: "Rice, wheat and cereals",
      },
    }),
    prisma.category.upsert({
      where: { slug: "beverages" },
      update: {},
      create: {
        name: "Beverages",
        slug: "beverages",
        icon: "🧃",
        color: "#aa88ff",
        description: "Drinks and beverages",
      },
    }),
    prisma.category.upsert({
      where: { slug: "snacks" },
      update: {},
      create: {
        name: "Snacks",
        slug: "snacks",
        icon: "🍿",
        color: "#ff8c38",
        description: "Chips, biscuits and snacks",
      },
    }),
    prisma.category.upsert({
      where: { slug: "oils" },
      update: {},
      create: {
        name: "Oils & Spices",
        slug: "oils",
        icon: "🫙",
        color: "#c0a060",
        description: "Cooking oils and spices",
      },
    }),
    prisma.category.upsert({
      where: { slug: "personal-care" },
      update: {},
      create: {
        name: "Personal Care",
        slug: "personal-care",
        icon: "🧴",
        color: "#aa88ff",
        description: "Hygiene and personal care",
      },
    }),
  ]);
  console.log("✅ Categories created:", categories.length);

  const [veg, fruits, dairy, grains, beverages, snacks, oils, personalCare] =
    categories;

  // Create Products
  const products = [
    {
      name: "Fresh Kerala Bananas",
      slug: "fresh-kerala-bananas",
      price: 45,
      comparePrice: 60,
      stock: 200,
      unit: "1 dozen",
      categoryId: fruits.id,
      isFeatured: true,
      tags: ["fresh", "organic"],
    },
    {
      name: "Organic Tomatoes",
      slug: "organic-tomatoes",
      price: 60,
      comparePrice: 80,
      stock: 150,
      unit: "1 kg",
      categoryId: veg.id,
      isFeatured: true,
    },
    {
      name: "Baby Spinach",
      slug: "baby-spinach",
      price: 35,
      comparePrice: 50,
      stock: 80,
      unit: "250 g",
      categoryId: veg.id,
    },
    {
      name: "Alphonso Mangoes",
      slug: "alphonso-mangoes",
      price: 350,
      comparePrice: 450,
      stock: 40,
      unit: "1 kg",
      categoryId: fruits.id,
      isFeatured: true,
    },
    {
      name: "Fresh Milk",
      slug: "fresh-milk-1l",
      price: 68,
      comparePrice: 75,
      stock: 300,
      unit: "1 L",
      categoryId: dairy.id,
      isFeatured: true,
    },
    {
      name: "Basmati Rice",
      slug: "basmati-rice-5kg",
      price: 320,
      comparePrice: 400,
      stock: 80,
      unit: "5 kg",
      categoryId: grains.id,
    },
    {
      name: "Coconut Oil",
      slug: "coconut-oil-1l",
      price: 180,
      comparePrice: 220,
      stock: 120,
      unit: "1 L",
      categoryId: oils.id,
      isFeatured: true,
    },
    {
      name: "Garden Peas",
      slug: "garden-peas-500g",
      price: 55,
      stock: 60,
      unit: "500 g",
      categoryId: veg.id,
    },
    {
      name: "Red Apples",
      slug: "red-apples-1kg",
      price: 120,
      comparePrice: 150,
      stock: 90,
      unit: "1 kg",
      categoryId: fruits.id,
    },
    {
      name: "Whole Wheat Flour",
      slug: "whole-wheat-flour-1kg",
      price: 55,
      stock: 200,
      unit: "1 kg",
      categoryId: grains.id,
    },
    {
      name: "Orange Juice",
      slug: "orange-juice-1l",
      price: 95,
      comparePrice: 120,
      stock: 100,
      unit: "1 L",
      categoryId: beverages.id,
    },
    {
      name: "Mixed Dry Fruits",
      slug: "mixed-dry-fruits-500g",
      price: 250,
      comparePrice: 320,
      stock: 50,
      unit: "500 g",
      categoryId: snacks.id,
    },
    {
      name: "Green Tea Pack",
      slug: "green-tea-pack-100g",
      price: 160,
      comparePrice: 200,
      stock: 80,
      unit: "100 g",
      categoryId: beverages.id,
    },
    {
      name: "Turmeric Powder",
      slug: "turmeric-powder-100g",
      price: 65,
      stock: 150,
      unit: "100 g",
      categoryId: oils.id,
    },
    {
      name: "Sunflower Oil",
      slug: "sunflower-oil-1l",
      price: 150,
      comparePrice: 190,
      stock: 100,
      unit: "1 L",
      categoryId: oils.id,
    },
    {
      name: "Pomegranate",
      slug: "pomegranate-500g",
      price: 95,
      comparePrice: 120,
      stock: 30,
      unit: "500 g",
      categoryId: fruits.id,
    },
    {
      name: "Butter 200g",
      slug: "butter-200g",
      price: 90,
      comparePrice: 110,
      stock: 80,
      unit: "200 g",
      categoryId: dairy.id,
    },
    {
      name: "Biscuits Pack",
      slug: "biscuits-pack",
      price: 40,
      stock: 200,
      unit: "200 g",
      categoryId: snacks.id,
    },
    {
      name: "Shampoo 200ml",
      slug: "shampoo-200ml",
      price: 120,
      comparePrice: 150,
      stock: 60,
      unit: "200 ml",
      categoryId: personalCare.id,
    },
    {
      name: "Cheddar Cheese",
      slug: "cheddar-cheese-200g",
      price: 200,
      comparePrice: 250,
      stock: 40,
      unit: "200 g",
      categoryId: dairy.id,
      isFeatured: true,
    },
    {
      name: "Product-1 Specially Recommended",
      slug: "product-1",
      price: 99,
      comparePrice: 150,
      stock: 10,
      unit: "1 set",
      categoryId: snacks.id,
      isFeatured: true,
      description:
        "This is the specially requested Product-1. A premium assortment of high-quality items curated for our best customers.",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        isActive: true,
        isFeatured: product.isFeatured || false,
      },
    });
  }
  console.log("✅ Products created:", products.length);

  // Create Banners
  await prisma.banner.createMany({
    data: [
      {
        title: "Fresh Vegetables Sale",
        subtitle: "Up to 40% OFF",
        description: "Shop fresh vegetables at the best prices",
        image: "/banners/veggies.jpg",
        link: "/shop?category=vegetables",
        buttonText: "Shop Now",
        order: 1,
      },
      {
        title: "Fruits Special Offer",
        subtitle: "Seasonal Fruits",
        image: "/banners/fruits.jpg",
        link: "/shop?category=fruits",
        buttonText: "Explore",
        order: 2,
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Banners created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
