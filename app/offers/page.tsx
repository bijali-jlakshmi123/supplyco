import { prisma } from "@/lib/prisma";
import OffersClient from "@/components/offers/OffersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers | Supplyco Supermarket",
  description:
    "Get the best deals on fresh groceries, fruits, vegetables, and daily essentials. Huge savings only at Supplyco.",
};

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [{ comparePrice: { not: null } }, { discount: { gt: 0 } }],
      },
      include: {
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: {
        discount: "desc",
      },
      take: 50,
    });

    return <OffersClient products={products} />;
  } catch (error) {
    console.error("Error fetching offers:", error);
    return <OffersClient products={[]} />;
  }
}
