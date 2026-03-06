import { fetchStrapi, getStrapiData } from "@/lib/strapi";
import HomeClient from "@/components/home/HomeClient";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [productsRes, categoriesRes, bannersRes] = await Promise.all([
      fetchStrapi(
        "products?populate=*&pagination[pageSize]=12&sort=createdAt:desc",
      ),
      fetchStrapi("categories?populate=*&pagination[pageSize]=8"),
      fetchStrapi("banners?populate=*&sort=order:asc"),
    ]);

    return {
      products: getStrapiData(productsRes),
      categories: getStrapiData(categoriesRes),
      banners: getStrapiData(bannersRes),
    };
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return { products: [], categories: [], banners: [] };
  }
}

export default async function HomePage() {
  const data = await getData();
  return <HomeClient {...data} />;
}
