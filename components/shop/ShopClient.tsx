"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

const DEMO_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id: `p-${i}`,
  name:
    [
      "Fresh Kerala Bananas",
      "Organic Tomatoes",
      "Baby Spinach",
      "Alphonso Mangoes",
      "Fresh Milk 1L",
      "Basmati Rice 5kg",
      "Mixed Dry Fruits",
      "Coconut Oil 1L",
      "Garden Peas",
      "Sweet Corn",
      "Red Apples",
      "Pomegranate",
      "Green Grapes",
      "Orange Carrots",
      "Broccoli",
      "Cauliflower",
      "Whole Wheat Flour",
      "Sunflower Oil",
      "Greek Yogurt",
      "Cheddar Cheese",
      "Green Tea Pack",
      "Black Pepper",
      "Turmeric Powder",
      "Cumin Seeds",
    ][i] || `Product ${i}`,
  slug: `product-${i}`,
  price:
    [
      45, 60, 35, 350, 68, 320, 250, 180, 55, 40, 120, 95, 110, 45, 80, 70, 55,
      150, 90, 200, 160, 70, 65, 80,
    ][i] || 100,
  comparePrice: [
    60,
    80,
    50,
    450,
    85,
    400,
    null,
    220,
    null,
    55,
    150,
    120,
    140,
    60,
    100,
    90,
    null,
    190,
    null,
    250,
    200,
    90,
    80,
    100,
  ][i],
  images: [],
  unit:
    [
      "1 dozen",
      "1 kg",
      "250 g",
      "1 kg",
      "1 L",
      "5 kg",
      "500 g",
      "1 L",
      "500 g",
      "4 pcs",
      "1 kg",
      "500 g",
      "1 kg",
      "1 kg",
      "500 g",
      "500 g",
      "1 kg",
      "1 L",
      "400 g",
      "200 g",
      "100 g",
      "100 g",
      "100 g",
      "100 g",
    ][i] || "1 pc",
  stock: Math.floor(Math.random() * 50) + 1,
  category: {
    name:
      [
        "Fruits",
        "Vegetables",
        "Vegetables",
        "Fruits",
        "Dairy",
        "Grains",
        "Dry Fruits",
        "Oils",
        "Vegetables",
        "Vegetables",
        "Fruits",
        "Fruits",
        "Fruits",
        "Vegetables",
        "Vegetables",
        "Vegetables",
        "Grains",
        "Oils",
        "Dairy",
        "Dairy",
        "Beverages",
        "Spices",
        "Spices",
        "Spices",
      ][i] || "General",
  },
  reviews: Array.from({ length: Math.floor(Math.random() * 30) + 2 }, () => ({
    rating: Math.floor(Math.random() * 2) + 4,
  })),
}));

const DEMO_CATEGORIES = [
  { id: "1", name: "Vegetables", slug: "vegetables" },
  { id: "2", name: "Fruits", slug: "fruits" },
  { id: "3", name: "Dairy", slug: "dairy" },
  { id: "4", name: "Grains", slug: "grains" },
  { id: "5", name: "Beverages", slug: "beverages" },
  { id: "6", name: "Snacks", slug: "snacks" },
  { id: "7", name: "Meat & Fish", slug: "meat-fish" },
  { id: "8", name: "Personal Care", slug: "personal-care" },
];

interface Props {
  products: any[];
  total: number;
  categories: any[];
  page: number;
  perPage: number;
  searchParams: any;
}

export default function ShopClient({
  products,
  total,
  categories,
  page,
  perPage,
  searchParams,
}: Props) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS;
  const displayCategories =
    categories.length > 0 ? categories : DEMO_CATEGORIES;
  const displayTotal = total || displayProducts.length;
  const totalPages = Math.ceil(displayTotal / perPage);

  const updateSearch = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const priceRanges = [
    { label: "Under ₹50", value: "0-50" },
    { label: "₹50 - ₹100", value: "50-100" },
    { label: "₹100 - ₹200", value: "100-200" },
    { label: "₹200 - ₹500", value: "200-500" },
    { label: "Above ₹500", value: "500+" },
  ];

  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        padding: "30px 0 80px",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "32px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              marginBottom: "8px",
            }}
          >
            {searchParams.search
              ? `Search: "${searchParams.search}"`
              : searchParams.category
                ? `${searchParams.category.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}`
                : "All Products"}
          </h1>
          <p style={{ color: "#9ab89a" }}>{displayTotal} products found</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "24px",
          }}
        >
          {/* Sidebar Filters */}
          <div
            className="card"
            style={{
              padding: "24px",
              height: "fit-content",
              position: "sticky",
              top: "100px",
            }}
          >
            <h3
              style={{
                color: "#f0faf0",
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Filter size={16} color="#00a651" /> Filters
            </h3>

            {/* Search */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Search
              </label>
              <div className="search-bar">
                <Search size={14} color="#6a8a6a" />
                <input
                  type="text"
                  placeholder="Search products..."
                  defaultValue={searchParams.search}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      updateSearch(
                        "search",
                        (e.target as HTMLInputElement).value,
                      );
                  }}
                />
              </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Categories
              </label>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <button
                  onClick={() => updateSearch("category", "")}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: !searchParams.category
                      ? "rgba(0,166,81,0.15)"
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: !searchParams.category ? "#00c962" : "#9ab89a",
                    fontSize: "14px",
                    fontWeight: !searchParams.category ? 600 : 400,
                    transition: "all 0.2s",
                  }}
                >
                  All Categories
                </button>
                {displayCategories.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => updateSearch("category", cat.slug)}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background:
                        searchParams.category === cat.slug
                          ? "rgba(0,166,81,0.15)"
                          : "transparent",
                      border: "none",
                      cursor: "pointer",
                      color:
                        searchParams.category === cat.slug
                          ? "#00c962"
                          : "#9ab89a",
                      fontSize: "14px",
                      fontWeight:
                        searchParams.category === cat.slug ? 600 : 400,
                      transition: "all 0.2s",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Sort By
              </label>
              <select
                onChange={(e) => updateSearch("filter", e.target.value)}
                defaultValue={searchParams.filter || ""}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "#1e2a1e",
                  border: "1px solid rgba(0,166,81,0.2)",
                  borderRadius: "10px",
                  color: "#f0faf0",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Featured</option>
                <option value="new">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Price Range
              </label>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {priceRanges.map((range) => (
                  <label
                    key={range.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      padding: "4px 0",
                    }}
                  >
                    <input type="checkbox" style={{ accentColor: "#00a651" }} />
                    <span style={{ color: "#9ab89a", fontSize: "14px" }}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p style={{ color: "#9ab89a", fontSize: "14px" }}>
                Showing {(page - 1) * perPage + 1}–
                {Math.min(page * perPage, displayTotal)} of {displayTotal}{" "}
                products
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      viewMode === "grid"
                        ? "rgba(0,166,81,0.2)"
                        : "rgba(255,255,255,0.05)",
                    border: `1px solid ${viewMode === "grid" ? "rgba(0,166,81,0.4)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "8px",
                    color: viewMode === "grid" ? "#00a651" : "#9ab89a",
                    cursor: "pointer",
                  }}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      viewMode === "list"
                        ? "rgba(0,166,81,0.2)"
                        : "rgba(255,255,255,0.05)",
                    border: `1px solid ${viewMode === "list" ? "rgba(0,166,81,0.4)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "8px",
                    color: viewMode === "list" ? "#00a651" : "#9ab89a",
                    cursor: "pointer",
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Products */}
            {displayProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 0",
                  color: "#9ab89a",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#f0faf0",
                    marginBottom: "8px",
                  }}
                >
                  No products found
                </h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    viewMode === "grid"
                      ? "repeat(auto-fill, minmax(200px, 1fr))"
                      : "1fr",
                  gap: "16px",
                }}
              >
                {displayProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "40px",
                }}
              >
                <button
                  onClick={() =>
                    router.push(
                      `/shop?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`,
                    )
                  }
                  disabled={page <= 1}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    color: page <= 1 ? "#3a5a3a" : "#9ab89a",
                    cursor: page <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(
                    1,
                    Math.min(page - 2 + i, totalPages - 4 + i),
                  );
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        router.push(
                          `/shop?${new URLSearchParams({ ...searchParams, page: String(pageNum) })}`,
                        )
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          pageNum === page
                            ? "#00a651"
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid ${pageNum === page ? "#00a651" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: "10px",
                        color: pageNum === page ? "white" : "#9ab89a",
                        cursor: "pointer",
                        fontWeight: pageNum === page ? 700 : 400,
                        fontSize: "14px",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    router.push(
                      `/shop?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`,
                    )
                  }
                  disabled={page >= totalPages}
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    color: page >= totalPages ? "#3a5a3a" : "#9ab89a",
                    cursor: page >= totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
