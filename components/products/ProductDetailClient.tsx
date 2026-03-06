"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency, calculateDiscount } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronRight,
  Tag,
  Package,
  CheckCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(product.images?.[0] || null);

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : product.discount || 0;
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((s: number, r: any) => s + r.rating, 0) /
      product.reviews.length
    : 4.5;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        comparePrice: product.comparePrice,
        images: product.images,
        unit: product.unit,
        stock: product.stock,
      },
      quantity,
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh" }}>
      <div className="container" style={{ padding: "30px 24px 80px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#6a8a6a",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <ChevronRight size={14} color="#3a5a3a" />
          <Link
            href="/shop"
            style={{
              color: "#6a8a6a",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            Shop
          </Link>
          <ChevronRight size={14} color="#3a5a3a" />
          <Link
            href={`/shop?category=${product.category?.slug}`}
            style={{
              color: "#6a8a6a",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            {product.category?.name}
          </Link>
          <ChevronRight size={14} color="#3a5a3a" />
          <span style={{ color: "#f0faf0", fontSize: "13px" }}>
            {product.name}
          </span>
        </div>

        {/* Main Product Area */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            marginBottom: "60px",
          }}
        >
          {/* Image Gallery */}
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "#182218",
                border: "1px solid rgba(0,166,81,0.15)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                marginBottom: "12px",
                position: "relative",
              }}
            >
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ fontSize: "120px" }}>🛒</div>
              )}
              {discount > 0 && (
                <div
                  style={{ position: "absolute", top: "20px", left: "20px" }}
                >
                  <span
                    className="badge badge-red"
                    style={{ fontSize: "16px", padding: "6px 14px" }}
                  >
                    -{discount}% OFF
                  </span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "10px" }}>
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.15)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  🛒
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <span className="badge badge-green">
                {product.category?.name}
              </span>
              {product.isFeatured && (
                <span className="badge badge-gold">Featured</span>
              )}
              {product.brand && (
                <span style={{ color: "#6a8a6a", fontSize: "13px" }}>
                  by {product.brand}
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: "28px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                marginBottom: "12px",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(avgRating) ? "#ffd700" : "none"}
                    color="#ffd700"
                  />
                ))}
              </div>
              <span style={{ color: "#ffd700", fontWeight: 600 }}>
                {avgRating.toFixed(1)}
              </span>
              <span style={{ color: "#6a8a6a", fontSize: "13px" }}>
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#00c962",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {formatCurrency(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span
                  style={{
                    fontSize: "20px",
                    color: "#6a8a6a",
                    textDecoration: "line-through",
                  }}
                >
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
              <span style={{ fontSize: "15px", color: "#9ab89a" }}>
                / {product.unit}
              </span>
            </div>

            {/* Stock indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              <div
                className={`status-dot ${product.stock > 0 ? "active" : "inactive"}`}
              />
              <span
                style={{
                  color:
                    product.stock > 10
                      ? "#00c962"
                      : product.stock > 0
                        ? "#ffd700"
                        : "#ff6b6b",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : product.stock <= 10
                    ? `Only ${product.stock} left`
                    : `In Stock (${product.stock} available)`}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value" style={{ width: "50px" }}>
                  {quantity}
                </span>
                <button
                  className="qty-btn"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary"
                style={{ flex: 1, opacity: product.stock === 0 ? 0.5 : 1 }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(
                    isWishlisted
                      ? "Removed from wishlist"
                      : "Added to wishlist!",
                  );
                }}
                className="btn-secondary"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Heart
                  size={16}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button
                className="btn-secondary"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Features */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                {
                  icon: Truck,
                  text: "Free Delivery on ₹499+",
                  color: "#00a651",
                },
                { icon: Shield, text: "Quality Guaranteed", color: "#00aaff" },
                { icon: RefreshCw, text: "Easy Returns", color: "#aa88ff" },
                { icon: Tag, text: "Best Price Guaranteed", color: "#ffd700" },
              ].map(({ icon: Icon, text, color }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.1)",
                    borderRadius: "10px",
                  }}
                >
                  <Icon size={16} color={color} />
                  <span style={{ color: "#9ab89a", fontSize: "13px" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginBottom: "24px",
              borderBottom: "1px solid rgba(0,166,81,0.15)",
              paddingBottom: "0",
            }}
          >
            {["description", "nutrition", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab ? "#00a651" : "transparent"}`,
                  color: activeTab === tab ? "#00c962" : "#9ab89a",
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontSize: "14px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.3s",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div
              style={{ color: "#9ab89a", lineHeight: 1.8, fontSize: "15px" }}
            >
              {product.description ||
                "This is a premium quality product sourced directly from the best farms in Kerala. Our products are handpicked at the peak of freshness and delivered straight to your doorstep. We ensure quality at every step of the supply chain.\n\nFeatures:\n• Freshly sourced from verified farms\n• No artificial preservatives\n• Rich in natural nutrients\n• Eco-friendly packaging"}
            </div>
          )}

          {activeTab === "nutrition" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "12px",
              }}
            >
              {[
                { label: "Calories", value: "45 kcal" },
                { label: "Protein", value: "2.5g" },
                { label: "Carbs", value: "8.2g" },
                { label: "Fiber", value: "3.1g" },
                { label: "Fat", value: "0.3g" },
                { label: "Vitamin C", value: "28mg" },
              ].map((n) => (
                <div
                  key={n.label}
                  style={{
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#6a8a6a",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    {n.label}
                  </p>
                  <p
                    style={{
                      color: "#00c962",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {n.value}
                  </p>
                  <p style={{ color: "#3a5a3a", fontSize: "11px" }}>per 100g</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {product.reviews?.length === 0 ? (
                <p
                  style={{
                    color: "#6a8a6a",
                    textAlign: "center",
                    padding: "40px 0",
                  }}
                >
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {(product.reviews?.length
                    ? product.reviews
                    : Array.from({ length: 3 }, (_, i) => ({
                        id: `r-${i}`,
                        user: { name: ["Rahul K", "Priya N", "Arun M"][i] },
                        rating: [5, 4, 5][i],
                        comment: [
                          "Excellent quality! Very fresh.",
                          "Good product, will buy again.",
                          "Amazing freshness and taste.",
                        ][i],
                        createdAt: new Date(),
                      }))
                  ).map((review: any) => (
                    <div
                      key={review.id}
                      style={{
                        background: "#182218",
                        border: "1px solid rgba(0,166,81,0.1)",
                        borderRadius: "12px",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              background: "rgba(0,166,81,0.15)",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#00a651",
                              fontWeight: 700,
                            }}
                          >
                            {review.user?.name?.[0] || "U"}
                          </div>
                          <span style={{ color: "#f0faf0", fontWeight: 500 }}>
                            {review.user?.name}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={13}
                              fill={i < review.rating ? "#ffd700" : "none"}
                              color="#ffd700"
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: "#9ab89a", fontSize: "14px" }}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="divider" style={{ marginBottom: "16px" }} />
            <h2
              style={{
                fontSize: "24px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
                marginBottom: "24px",
              }}
            >
              Related <span className="gradient-text">Products</span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
