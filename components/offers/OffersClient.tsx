"use client";

import ProductCard from "@/components/products/ProductCard";
import { Tag, Sparkles, Filter } from "lucide-react";

export default function OffersClient({ products }: { products: any[] }) {
  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        padding: "40px 0 80px",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,166,81,0.1) 0%, rgba(255,107,0,0.1) 100%)",
            padding: "60px 40px",
            borderRadius: "24px",
            border: "1px solid rgba(0,166,81,0.2)",
            marginBottom: "40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              fontSize: "120px",
              opacity: 0.1,
            }}
          >
            🔥
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <span
              className="badge badge-orange"
              style={{ padding: "6px 14px", fontSize: "14px" }}
            >
              <Tag size={14} style={{ marginRight: "6px" }} /> Special Offers
            </span>
          </div>
          <h1
            style={{
              fontSize: "48px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            Huge Savings on{" "}
            <span className="gradient-text-orange">Fresh Groceries</span>
          </h1>
          <p style={{ color: "#9ab89a", fontSize: "18px", maxWidth: "600px" }}>
            Get the best deals on daily essentials, fruits, and vegetables.
            Limited time offers only at Supplyco.
          </p>
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Sparkles size={20} color="#ffd700" />
            <h2 style={{ color: "#f0faf0", fontSize: "20px", fontWeight: 600 }}>
              {products.length} Items on Sale
            </h2>
          </div>
          <button
            className="btn-secondary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Filter size={16} /> Filter Offers
          </button>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🏷️</div>
            <h3
              style={{
                color: "#f0faf0",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              No offers available right now
            </h3>
            <p style={{ color: "#6a8a6a" }}>
              Check back later for fresh deals!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
