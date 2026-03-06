"use client";

import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const DEMO_PRODUCTS = Array.from({ length: 15 }, (_, i) => ({
  id: `p-${i}`,
  name: [
    "Fresh Kerala Bananas",
    "Organic Tomatoes",
    "Baby Spinach",
    "Alphonso Mangoes",
    "Fresh Milk 1L",
    "Basmati Rice 5kg",
    "Mixed Dry Fruits",
    "Coconut Oil 1L",
    "Garden Peas 500g",
    "Sweet Corn",
    "Red Apples 1kg",
    "Pomegranate 500g",
    "Whole Wheat Flour",
    "Sunflower Oil 1L",
    "Cheddar Cheese",
  ][i],
  sku: `SC-${1000 + i}`,
  price: [45, 60, 35, 350, 68, 320, 250, 180, 55, 40, 120, 95, 55, 150, 200][i],
  stock: [120, 45, 8, 3, 200, 15, 30, 60, 4, 80, 25, 18, 50, 35, 12][i],
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
      "Grains",
      "Oils",
      "Dairy",
    ][i],
  },
  isActive: i !== 6,
  isFeatured: [0, 3, 4, 7].includes(i),
  _count: {
    orderItems: [
      530, 480, 220, 280, 420, 115, 95, 210, 88, 160, 190, 130, 75, 100, 60,
    ][i],
  },
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
}));

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Grains",
    "Oils",
    "Dry Fruits",
  ];

  const filtered = DEMO_PRODUCTS.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.includes(search);
    const matchCat =
      selectedCategory === "All" || p.category.name === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
            }}
          >
            Products
          </h1>
          <p style={{ color: "#9ab89a", fontSize: "14px", marginTop: "4px" }}>
            {DEMO_PRODUCTS.length} total products
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {[
          {
            label: "Total Products",
            value: DEMO_PRODUCTS.length,
            icon: Package,
            color: "#00a651",
          },
          {
            label: "Active",
            value: DEMO_PRODUCTS.filter((p) => p.isActive).length,
            icon: TrendingUp,
            color: "#00c962",
          },
          {
            label: "Low Stock (≤10)",
            value: DEMO_PRODUCTS.filter((p) => p.stock <= 10).length,
            icon: AlertTriangle,
            color: "#ff6b6b",
          },
          {
            label: "Featured",
            value: DEMO_PRODUCTS.filter((p) => p.isFeatured).length,
            icon: Eye,
            color: "#ffd700",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "#182218",
                border: "1px solid rgba(0,166,81,0.15)",
                borderRadius: "12px",
                padding: "16px 18px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Icon size={18} color={stat.color} />
                <span style={{ color: "#6a8a6a", fontSize: "13px" }}>
                  {stat.label}
                </span>
              </div>
              <p
                style={{
                  color: "#f0faf0",
                  fontSize: "22px",
                  fontWeight: 700,
                  marginTop: "8px",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div
        style={{
          background: "#182218",
          border: "1px solid rgba(0,166,81,0.15)",
          borderRadius: "16px",
          padding: "16px 20px",
          marginBottom: "16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <div className="search-bar" style={{ flex: 1, maxWidth: "320px" }}>
          <Search size={14} color="#6a8a6a" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              style={{ fontSize: "13px", padding: "6px 14px" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#182218",
          border: "1px solid rgba(0,166,81,0.15)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,166,81,0.1)" }}>
              {[
                "Product",
                "SKU",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Sales",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "14px 16px",
                    color: "#6a8a6a",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    textAlign: "left",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: "1px solid rgba(0,166,81,0.06)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,166,81,0.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#1e2a1e",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>📦</span>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#f0faf0",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {product.name}
                      </p>
                      {product.isFeatured && (
                        <span
                          className="badge badge-gold"
                          style={{ fontSize: "10px" }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#9ab89a",
                    fontSize: "13px",
                  }}
                >
                  {product.sku}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    className="badge badge-green"
                    style={{ fontSize: "12px" }}
                  >
                    {product.category.name}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#00c962",
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(product.price)}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color:
                        product.stock <= 3
                          ? "#ff6b6b"
                          : product.stock <= 10
                            ? "#ffd700"
                            : "#00c962",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {product.stock}
                    {product.stock <= 10 && (
                      <span style={{ marginLeft: "4px", fontSize: "12px" }}>
                        ⚠️
                      </span>
                    )}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    className={`badge ${product.isActive ? "badge-green" : "badge-red"}`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    color: "#9ab89a",
                    fontSize: "13px",
                  }}
                >
                  {product._count.orderItems} sold
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(0,170,255,0.1)",
                        border: "1px solid rgba(0,170,255,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#00aaff",
                      }}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(0,166,81,0.1)",
                        border: "1px solid rgba(0,166,81,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#00a651",
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteModal(product.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(255,107,107,0.1)",
                        border: "1px solid rgba(255,107,107,0.3)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#ff6b6b",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div
          className="overlay"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#182218",
              border: "1px solid rgba(255,107,107,0.3)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "400px",
              width: "90%",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(255,107,107,0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Trash2 size={24} color="#ff6b6b" />
              </div>
              <h3
                style={{ color: "#f0faf0", fontSize: "18px", fontWeight: 700 }}
              >
                Delete Product?
              </h3>
              <p
                style={{ color: "#9ab89a", fontSize: "14px", marginTop: "8px" }}
              >
                This action cannot be undone. The product will be permanently
                removed.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteModal(null)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ff6b6b",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
