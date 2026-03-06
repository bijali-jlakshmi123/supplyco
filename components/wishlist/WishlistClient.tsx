"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/products/ProductCard";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WishlistClient() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        padding: "60px 0 100px",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "rgba(255,107,107,0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              border: "1px solid rgba(255,107,107,0.2)",
            }}
          >
            <Heart size={30} color="#ff6b6b" fill="#ff6b6b" />
          </div>
          <h1
            style={{
              fontSize: "36px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            My <span className="gradient-text">Wishlist</span>
          </h1>
          <p style={{ color: "#9ab89a", fontSize: "16px" }}>
            {items.length} {items.length === 1 ? "item" : "items"} saved for
            later
          </p>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              background: "#182218",
              border: "1px solid rgba(0,166,81,0.15)",
              borderRadius: "24px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <ShoppingBag
              size={60}
              color="#3a5a3a"
              style={{ marginBottom: "20px" }}
            />
            <h2
              style={{
                color: "#f0faf0",
                fontSize: "24px",
                marginBottom: "12px",
              }}
            >
              Your wishlist is empty
            </h2>
            <p
              style={{
                color: "#6a8a6a",
                marginBottom: "32px",
                maxWidth: "400px",
                margin: "0 auto 32px",
              }}
            >
              Seems like you haven't added anything to your wishlist yet.
              Explore our products and save your favorites!
            </p>
            <Link
              href="/shop"
              className="btn-primary"
              style={{ textDecoration: "none" }}
            >
              Go Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "24px",
              }}
            >
              <button
                onClick={clearWishlist}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff6b6b",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  textDecoration: "underline",
                }}
              >
                Clear all favorites
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "24px",
              }}
            >
              {items.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
