import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import axios from "axios";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

const STRAPI_URL = "http://localhost:1337";
// Replace with your Strapi API Token (Settings > API Tokens > Full Access)
const STRAPI_TOKEN =
  "dd7d2ad02d537f957f3f1aae28b3d3660f98f23e9d00aca36522f266f990cb2cf5b810f248be3c06e9af489c25113f1100d5ffa2eaab7128cf0dea643fbe66eba0af0d9df3357c27ae23f73634947a3bd1dd8544e55eafc125809ac2144e98025555e0b2f8310528f1f8d6d243b81a795673c85feae0b3c83ab9666081b54603";

const strapiApi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  },
});

async function migrateData() {
  console.log("🚀 Starting migration from Prisma to Strapi...");

  try {
    // 1. Fetch Categories from Prisma
    console.log("Fetching Categories from Prisma...");
    const prismaCategories = await prisma.category.findMany();
    const categoryMapping: Record<string, number> = {};

    for (const cat of prismaCategories) {
      console.log(`Migrating Category: ${cat.name}`);
      try {
        const response = await strapiApi.post("/api/categories", {
          data: {
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            icon: cat.icon,
            color: cat.color,
            publishedAt: new Date(), // Publish immediately
          },
        });
        categoryMapping[cat.id] = response.data.data.id;
        console.log(
          `✅ Category ${cat.name} migrated to Strapi ID: ${response.data.data.id}`,
        );
      } catch (err: any) {
        console.error(
          `❌ Error migrating category ${cat.name}:`,
          err.response?.data || err.message,
        );
      }
    }

    // 2. Fetch Products from Prisma
    console.log("Fetching Products from Prisma...");
    const prismaProducts = await prisma.product.findMany();

    for (const prod of prismaProducts) {
      console.log(`Migrating Product: ${prod.name}`);
      try {
        const strapiCategoryId = categoryMapping[prod.categoryId];

        const response = await strapiApi.post("/api/products", {
          data: {
            name: prod.name,
            slug: prod.slug,
            description: prod.description,
            price: prod.price,
            comparePrice: prod.comparePrice,
            sku: prod.sku,
            barcode: prod.barcode,
            stock: prod.stock,
            lowStockAlert: prod.lowStockAlert,
            unit: prod.unit,
            weight: prod.weight,
            brand: prod.brand,
            isFeatured: prod.isFeatured,
            isActive: prod.isActive,
            discount: prod.discount,
            tags: prod.tags,
            nutritionInfo: prod.nutritionInfo,
            category: strapiCategoryId, // Link to category
            publishedAt: new Date(),
          },
        });
        console.log(
          `✅ Product ${prod.name} migrated to Strapi ID: ${response.data.data.id}`,
        );
      } catch (err: any) {
        console.error(
          `❌ Error migrating product ${prod.name}:`,
          err.response?.data || err.message,
        );
      }
    }

    // 3. Fetch Banners from Prisma
    console.log("Fetching Banners from Prisma...");
    const prismaBanners = await prisma.banner.findMany();

    for (const banner of prismaBanners) {
      console.log(`Migrating Banner: ${banner.title}`);
      try {
        const response = await strapiApi.post("/api/banners", {
          data: {
            title: banner.title,
            subtitle: banner.subtitle,
            description: banner.description,
            link: banner.link,
            buttonText: banner.buttonText,
            isActive: banner.isActive,
            order: banner.order,
            // image: banner.image, // Media requires separate upload
            publishedAt: new Date(),
          },
        });
        console.log(
          `✅ Banner ${banner.title} migrated to Strapi ID: ${response.data.data.id}`,
        );
      } catch (err: any) {
        console.error(
          `❌ Error migrating banner ${banner.title}:`,
          err.response?.data || err.message,
        );
      }
    }

    console.log("🎉 Migration completed!");
  } catch (error) {
    console.error("💥 Fatal Migration Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();
