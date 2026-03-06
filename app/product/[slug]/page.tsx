import { fetchStrapi, getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const productRes = await fetchStrapi(
      `products?filters[slug][$eq]=${slug}&populate=*`,
    );
    const products = getStrapiData(productRes);

    if (!products || products.length === 0) {
      notFound();
    }

    const product = products[0];
    const categoryId = product.category?.id || product.category?.attributes?.id;

    // Fetch related products from the same category
    let relatedProducts: any[] = [];
    if (categoryId) {
      const relatedRes = await fetchStrapi(
        `products?filters[category][id][$eq]=${categoryId}&filters[id][$ne]=${product.id}&pagination[pageSize]=4&populate=*`,
      );
      relatedProducts = getStrapiData(relatedRes);
    }

    return (
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    );
  } catch (error) {
    console.error("Error fetching product detail:", error);
    notFound();
  }
}
