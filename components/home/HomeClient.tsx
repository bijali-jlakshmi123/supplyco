"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  TrendingUp,
  Zap,
  Award,
  Truck,
  ChevronLeft,
  ChevronRight,
  Play,
  Tag,
  Percent,
  Leaf,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { formatCurrency } from "@/lib/utils";

interface Props {
  products: any[];
  categories: any[];
  banners: any[];
}

const DEMO_CATEGORIES = [
  {
    name: "Vegetables",
    slug: "vegetables",
    icon: "🥦",
    color: "#2d7a3a",
    count: 48,
  },
  { name: "Fruits", slug: "fruits", icon: "🍎", color: "#a83232", count: 36 },
  { name: "Dairy", slug: "dairy", icon: "🥛", color: "#4a7fa3", count: 22 },
  {
    name: "Grains & Rice",
    slug: "grains",
    icon: "🌾",
    color: "#8a6a2a",
    count: 30,
  },
  {
    name: "Beverages",
    slug: "beverages",
    icon: "🧃",
    color: "#5a2a8a",
    count: 55,
  },
  { name: "Snacks", slug: "snacks", icon: "🍿", count: 40, color: "#8a4a2a" },
  {
    name: "Meat & Fish",
    slug: "meat-fish",
    icon: "🐟",
    count: 28,
    color: "#2a6a8a",
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    icon: "🧴",
    count: 35,
    color: "#7a2a8a",
  },
];

const DEMO_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: `demo-${i}`,
  name: [
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
  ][i],
  slug: `product-${i}`,
  price: [45, 60, 35, 350, 68, 320, 250, 180, 55, 40, 120, 95][i],
  comparePrice: [60, 80, 50, 450, 85, 400, 320, 220, null, 55, 150, 120][i],
  images: [],
  unit: [
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
  ][i],
  stock: [20, 15, 8, 5, 30, 10, 20, 25, 3, 50, 18, 12][i],
  category: {
    name: [
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
    ][i],
  },
  reviews: Array.from({ length: Math.floor(Math.random() * 50) + 5 }, () => ({
    rating: Math.floor(Math.random() * 2) + 4,
  })),
}));

const HERO_SLIDES = [
  {
    title: "Fresh From the",
    highlight: "Farm to Your Table",
    subtitle:
      "Kerala's most trusted supermarket – delivering fresh, quality groceries at government-assured prices.",
    cta: "Shop Now",
    ctaLink: "/shop",
    badge: "🌿 100% Fresh & Natural",
    accent: "#00a651",
    emoji: "🥦",
    bestSeller: { name: "Organic Vegetables", off: "25% OFF" },
  },
  {
    title: "Special Offers on",
    highlight: "Daily Essentials",
    subtitle:
      "Save big on your monthly grocery shopping. Up to 40% off on selected items every day.",
    cta: "View Offers",
    ctaLink: "/offers",
    badge: "🔥 Hot Deals Today",
    accent: "#ff6b00",
    emoji: "🛒",
    bestSeller: { name: "Household Items", off: "40% OFF" },
  },
  {
    title: "Premium Quality",
    highlight: "Organic Products",
    subtitle:
      "Certified organic produce sourced directly from Kerala's best farms. Health first, always.",
    cta: "Explore Organic",
    ctaLink: "/shop?category=organic",
    badge: "✨ Certified Organic",
    accent: "#00c962",
    emoji: "🌱",
    bestSeller: { name: "Organic Range", off: "15% OFF" },
  },
];

export default function HomeClient({ products, categories, banners }: Props) {
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS;
  const displayCategories =
    categories.length > 0 ? categories : DEMO_CATEGORIES;
  const slide = HERO_SLIDES[heroSlide];

  const featuredProducts = displayProducts.slice(0, 8);
  const offerProducts = displayProducts
    .filter((p: any) => p.comparePrice || p.discount)
    .slice(0, 4);

  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        className="hero-bg"
        style={{
          minHeight: "580px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "60px 0",
        }}
      >
        {/* Animated background shapes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              background: `radial-gradient(circle, ${slide.accent}20, transparent 70%)`,
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(255,107,0,0.1), transparent 70%)",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "25%",
              fontSize: "100px",
              opacity: 0.08,
              animation: "float 5s ease-in-out infinite",
            }}
          >
            {slide.emoji}
          </div>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* Left Content */}
            <div style={{ animation: "slideInLeft 0.6s ease-out" }}>
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(0,166,81,0.15)",
                  border: "1px solid rgba(0,166,81,0.3)",
                  borderRadius: "50px",
                  padding: "8px 16px",
                  marginBottom: "24px",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {slide.badge.split(" ")[0]}
                </span>
                <span
                  style={{
                    color: "#00c962",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {slide.badge.slice(2)}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 58px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: "20px",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <span style={{ color: "#f0faf0" }}>{slide.title}</span>{" "}
                <span className="gradient-text">{slide.highlight}</span>
              </h1>

              <p
                style={{
                  color: "#9ab89a",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  maxWidth: "480px",
                }}
              >
                {slide.subtitle}
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link
                  href={slide.ctaLink}
                  className="btn-primary"
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    padding: "14px 32px",
                  }}
                >
                  <ShoppingBag size={18} /> {slide.cta}
                </Link>
                <Link
                  href="/about"
                  className="btn-secondary"
                  style={{
                    textDecoration: "none",
                    fontSize: "16px",
                    padding: "14px 32px",
                  }}
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "32px", marginTop: "40px" }}>
                {[
                  { value: "500+", label: "Products" },
                  { value: "50K+", label: "Happy Customers" },
                  { value: "99%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "#00c962",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ color: "#6a8a6a", fontSize: "13px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div
              style={{
                animation: "slideInRight 0.6s ease-out",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  maxWidth: "450px",
                  margin: "0 auto",
                  background:
                    "radial-gradient(circle at center, rgba(0,166,81,0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "180px",
                    animation: "float 4s ease-in-out infinite",
                    userSelect: "none",
                  }}
                >
                  {slide.emoji}
                </div>

                {/* Floating Cards */}
                <div
                  className="glass"
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "-10%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    animation: "float 5s ease-in-out infinite",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Star size={14} fill="#ffd700" color="#ffd700" />
                    <span
                      style={{
                        color: "#f0faf0",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      4.9 Rating
                    </span>
                  </div>
                  <p style={{ color: "#9ab89a", fontSize: "12px" }}>
                    50,000+ Reviews
                  </p>
                </div>

                <div
                  className="glass"
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    right: "-5%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    animation: "float 6s ease-in-out infinite reverse",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Tag size={14} color="#ff6b00" />
                    <span
                      style={{
                        color: "#ff8c38",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {slide.bestSeller.off}
                    </span>
                  </div>
                  <p style={{ color: "#9ab89a", fontSize: "12px" }}>
                    {slide.bestSeller.name}
                  </p>
                </div>

                <div
                  className="glass"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-15%",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    transform: "translateY(-50%)",
                    animation: "float 7s ease-in-out infinite",
                  }}
                >
                  <Truck size={20} color="#00a651" />
                  <p
                    style={{
                      color: "#9ab89a",
                      fontSize: "11px",
                      marginTop: "4px",
                    }}
                  >
                    Free Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "40px",
            }}
          >
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                style={{
                  width: i === heroSlide ? "30px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    i === heroSlide ? "#00a651" : "rgba(0,166,81,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Announcement Strip */}
      <div
        style={{
          background: "#ff6b00",
          padding: "10px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            animation: "gradient-shift 20s linear infinite",
            whiteSpace: "nowrap",
            fontSize: "13px",
            fontWeight: 600,
            color: "white",
          }}
        >
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "30px" }}
            >
              <span>🔥 FLAT 25% OFF ON FRUITS & VEGETABLES</span>
              <span>•</span>
              <span>🚚 FREE DELIVERY ON ORDERS ABOVE ₹499</span>
              <span>•</span>
              <span>⚡ FLASH SALE: DAIRY PRODUCTS TODAY ONLY</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <div>
              <div className="divider" style={{ marginBottom: "12px" }} />
              <h2
                style={{
                  fontSize: "32px",
                  color: "#f0faf0",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Shop by <span className="gradient-text">Category</span>
              </h2>
              <p style={{ color: "#9ab89a", marginTop: "8px" }}>
                Find your favorite products easily
              </p>
            </div>
            <Link
              href="/shop"
              className="btn-secondary"
              style={{ textDecoration: "none" }}
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {displayCategories.map((cat: any, i) => (
              <Link
                key={cat.id || cat.slug || i}
                href={`/shop?category=${cat.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 12px",
                  background: "#182218",
                  border: "1px solid rgba(0,166,81,0.15)",
                  borderRadius: "16px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#00a651";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 12px 30px rgba(0,166,81,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(0,166,81,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                <div style={{ fontSize: "40px", lineHeight: 1 }}>
                  {cat.icon || "🛒"}
                </div>
                <p
                  style={{
                    color: "#f0faf0",
                    fontSize: "13px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {cat.name}
                </p>
                <span
                  className="badge badge-green"
                  style={{ fontSize: "11px" }}
                >
                  {cat._count?.products || cat.count || 0} items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <div>
              <div className="divider" style={{ marginBottom: "12px" }} />
              <h2
                style={{
                  fontSize: "32px",
                  color: "#f0faf0",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p style={{ color: "#9ab89a", marginTop: "8px" }}>
                Hand-picked quality products for you
              </p>
            </div>
            <Link
              href="/shop"
              className="btn-secondary"
              style={{ textDecoration: "none" }}
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "16px",
              marginBottom: "24px",
            }}
          >
            {["All", ...DEMO_CATEGORIES.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner / Offer Section */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Big Banner */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #0d2e18 0%, #1a4d2d 50%, #0d2e18 100%)",
                border: "1px solid rgba(0,166,81,0.3)",
                borderRadius: "20px",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "-20px",
                  fontSize: "180px",
                  opacity: 0.1,
                }}
              >
                🥗
              </div>
              <span
                className="badge badge-green"
                style={{ marginBottom: "16px", display: "inline-flex" }}
              >
                Limited Offer
              </span>
              <h3
                style={{
                  fontSize: "32px",
                  fontFamily: "Outfit, sans-serif",
                  color: "#f0faf0",
                  marginBottom: "12px",
                }}
              >
                Fresh Veggies
                <br />
                <span className="gradient-text">Up to 40% OFF</span>
              </h3>
              <p style={{ color: "#9ab89a", marginBottom: "24px" }}>
                Daily fresh vegetables straight from Kerala farms
              </p>
              <Link
                href="/shop?category=vegetables"
                className="btn-primary"
                style={{ textDecoration: "none" }}
              >
                Shop Vegetables <ArrowRight size={16} />
              </Link>
            </div>

            {/* Small Banners */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #2a1500 0%, #4d2800 100%)",
                  border: "1px solid rgba(255,107,0,0.3)",
                  borderRadius: "20px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "-10px",
                    fontSize: "80px",
                    opacity: 0.15,
                  }}
                >
                  🍊
                </div>
                <span
                  className="badge badge-orange"
                  style={{ marginBottom: "10px", display: "inline-flex" }}
                >
                  Flash Sale
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    color: "#f0faf0",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Fruits <span className="gradient-text-orange">25% OFF</span>
                </h3>
                <Link
                  href="/shop?category=fruits"
                  style={{
                    color: "#ff8c38",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "8px",
                  }}
                >
                  Shop Now <ArrowRight size={14} />
                </Link>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, #0a1f2e 0%, #143a52 100%)",
                  border: "1px solid rgba(0,150,200,0.3)",
                  borderRadius: "20px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "-10px",
                    fontSize: "80px",
                    opacity: 0.15,
                  }}
                >
                  🥛
                </div>
                <span
                  className="badge"
                  style={{
                    background: "rgba(0,150,200,0.15)",
                    color: "#0af",
                    border: "1px solid rgba(0,150,200,0.3)",
                    marginBottom: "10px",
                    display: "inline-flex",
                  }}
                >
                  New Arrivals
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    color: "#f0faf0",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Dairy Products <span style={{ color: "#0af" }}>10% OFF</span>
                </h3>
                <Link
                  href="/shop?category=dairy"
                  style={{
                    color: "#0af",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "8px",
                  }}
                >
                  Shop Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 0", background: "#111811" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="divider" style={{ margin: "0 auto 16px" }} />
            <h2
              style={{
                fontSize: "36px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Why <span className="gradient-text">Supplyco?</span>
            </h2>
            <p
              style={{
                color: "#9ab89a",
                marginTop: "12px",
                maxWidth: "600px",
                margin: "12px auto 0",
              }}
            >
              Trusted by millions across Kerala for decades – we deliver
              quality, freshness, and value
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: "🌿",
                title: "100% Fresh",
                desc: "All products sourced daily from certified farms",
                color: "#00a651",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "Government-assured pricing with no hidden charges",
                color: "#ffd700",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Same-day delivery for orders placed before 2 PM",
                color: "#ff6b00",
              },
              {
                icon: "🛡️",
                title: "Secure Payments",
                desc: "100% secure encrypted payment gateway",
                color: "#00aaff",
              },
              {
                icon: "♻️",
                title: "Eco Friendly",
                desc: "Biodegradable packaging to protect the environment",
                color: "#00c962",
              },
              {
                icon: "⭐",
                title: "Top Rated",
                desc: "4.9/5 from over 50,000 verified customers",
                color: "#ffd700",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card"
                style={{
                  padding: "28px 24px",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: "17px",
                    color: "#f0faf0",
                    fontWeight: 700,
                    marginBottom: "8px",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#6a8a6a",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      {offerProducts.length > 0 && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "32px",
              }}
            >
              <div>
                <div className="divider" style={{ marginBottom: "12px" }} />
                <h2
                  style={{
                    fontSize: "32px",
                    color: "#f0faf0",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  🔥 Hot <span className="gradient-text-orange">Deals</span>
                </h2>
              </div>
              <Link
                href="/offers"
                className="btn-orange"
                style={{ textDecoration: "none" }}
              >
                All Offers <Percent size={16} />
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {offerProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(0,166,81,0.15) 0%, rgba(0,122,61,0.2) 100%)",
              border: "1px solid rgba(0,166,81,0.3)",
              borderRadius: "24px",
              padding: "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "250px",
                height: "250px",
                background:
                  "radial-gradient(circle, rgba(0,166,81,0.2), transparent)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "-40px",
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle, rgba(255,107,0,0.1), transparent)",
                borderRadius: "50%",
              }}
            />

            <Leaf size={48} color="#00a651" style={{ marginBottom: "20px" }} />
            <h2
              style={{
                fontSize: "40px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
                marginBottom: "16px",
              }}
            >
              Ready to Shop <span className="gradient-text">Fresh?</span>
            </h2>
            <p
              style={{
                color: "#9ab89a",
                fontSize: "17px",
                maxWidth: "500px",
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              Join thousands of Kerala families who trust Supplyco for their
              daily grocery needs.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/shop"
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  padding: "16px 36px",
                  fontSize: "17px",
                }}
              >
                <ShoppingBag size={20} /> Start Shopping
              </Link>
              <Link
                href="/account"
                className="btn-secondary"
                style={{
                  textDecoration: "none",
                  padding: "16px 36px",
                  fontSize: "17px",
                }}
              >
                Create Account <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
