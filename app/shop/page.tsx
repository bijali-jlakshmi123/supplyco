import { fetchStrapi, getStrapiData } from "@/lib/strapi";
import ShopClient from "@/components/shop/ShopClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | Supplyco Supermarket",
  description:
    "Browse all our fresh groceries, vegetables, fruits, dairy and daily essentials.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    filter?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const perPage = 24;

  try {
    let sort = "isFeatured:desc,createdAt:desc";
    if (params.filter === "price_asc") sort = "price:asc";
    if (params.filter === "price_desc") sort = "price:desc";
    if (params.filter === "new") sort = "createdAt:desc";

    let endpoint = `products?populate=*&pagination[page]=${page}&pagination[pageSize]=${perPage}&sort=${sort}`;

    const filters: string[] = [];
    if (params.category)
      filters.push(`filters[category][slug][$eq]=${params.category}`);
    if (params.search) {
      filters.push(`filters[$or][0][name][$containsi]=${params.search}`);
      filters.push(`filters[$or][1][description][$containsi]=${params.search}`);
    }

    if (filters.length > 0) {
      endpoint += `&${filters.join("&")}`;
    }

    const [productsRes, categoriesRes] = await Promise.all([
      fetchStrapi(endpoint),
      fetchStrapi("categories?pagination[pageSize]=100"),
    ]);

    const products = getStrapiData(productsRes);
    const categories = getStrapiData(categoriesRes);
    const total = productsRes.meta?.pagination?.total || products.length;

    return (
      <ShopClient
        products={products}
        total={total}
        categories={categories}
        page={page}
        perPage={perPage}
        searchParams={params}
      />
    );
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return (
      <ShopClient
        products={[]}
        total={0}
        categories={[]}
        page={1}
        perPage={perPage}
        searchParams={params}
      />
    );
  }
}
