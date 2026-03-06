"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const ORDERS = Array.from({ length: 15 }, (_, i) => ({
  id: `o-${i}`,
  orderNumber: `SC-${(Date.now() - i * 3600000).toString(36).toUpperCase().slice(-6)}`,
  user: {
    name: [
      "Rahul Kumar",
      "Priya Nair",
      "Arun Menon",
      "Sreeja Pillai",
      "Vineeth R",
      "Divya M",
      "Ajith S",
      "Rekha N",
      "Suresh P",
      "Anitha V",
      "Manoj K",
      "Suma L",
      "Biju T",
      "Geetha P",
      "Rajan M",
    ][i],
    email: `user${i}@example.com`,
  },
  total: [
    1250, 890, 2100, 650, 3400, 780, 1500, 430, 2800, 960, 380, 1800, 520, 3100,
    720,
  ][i],
  status: [
    "DELIVERED",
    "PROCESSING",
    "SHIPPED",
    "PENDING",
    "CANCELLED",
    "DELIVERED",
    "CONFIRMED",
    "PENDING",
    "DELIVERED",
    "PROCESSING",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
    "PROCESSING",
    "PENDING",
  ][i] as any,
  paymentMethod: [
    "UPI",
    "Card",
    "COD",
    "UPI",
    "Card",
    "NetBanking",
    "UPI",
    "COD",
    "Card",
    "UPI",
    "COD",
    "Card",
    "UPI",
    "NetBanking",
    "Card",
  ][i],
  createdAt: new Date(Date.now() - i * 24 * 3600000),
  items: [{ product: { name: "Fresh Vegetables Pack" }, quantity: 2 }],
}));

const statusConfig: Record<
  string,
  { color: string; bg: string; icon: any; label: string }
> = {
  PENDING: {
    color: "#ffd700",
    bg: "rgba(255,215,0,0.15)",
    icon: Clock,
    label: "Pending",
  },
  CONFIRMED: {
    color: "#00aaff",
    bg: "rgba(0,170,255,0.15)",
    icon: CheckCircle,
    label: "Confirmed",
  },
  PROCESSING: {
    color: "#aa88ff",
    bg: "rgba(170,136,255,0.15)",
    icon: Package,
    label: "Processing",
  },
  SHIPPED: {
    color: "#ff8c38",
    bg: "rgba(255,140,56,0.15)",
    icon: Truck,
    label: "Shipped",
  },
  DELIVERED: {
    color: "#00a651",
    bg: "rgba(0,166,81,0.15)",
    icon: CheckCircle,
    label: "Delivered",
  },
  CANCELLED: {
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.15)",
    icon: XCircle,
    label: "Cancelled",
  },
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const statuses = [
    "All",
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  const filtered = ORDERS.filter((o) => {
    const matchSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.user.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
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
            Orders
          </h1>
          <p style={{ color: "#9ab89a", fontSize: "14px", marginTop: "4px" }}>
            {ORDERS.length} total orders
          </p>
        </div>
      </div>

      {/* Status Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {statuses.slice(1).map((status) => {
          const sc = statusConfig[status];
          const Icon = sc.icon;
          const count = ORDERS.filter((o) => o.status === status).length;
          return (
            <div
              key={status}
              style={{
                background: "#182218",
                border: `1px solid ${sc.color}30`,
                borderRadius: "12px",
                padding: "14px 16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() =>
                setStatusFilter(status === statusFilter ? "All" : status)
              }
            >
              <Icon
                size={16}
                color={sc.color}
                style={{ marginBottom: "8px" }}
              />
              <p
                style={{ color: "#f0faf0", fontSize: "18px", fontWeight: 700 }}
              >
                {count}
              </p>
              <p style={{ color: "#6a8a6a", fontSize: "11px" }}>{sc.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div
        style={{
          background: "#182218",
          border: "1px solid rgba(0,166,81,0.15)",
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "14px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div className="search-bar" style={{ flex: 1, maxWidth: "300px" }}>
          <Search size={14} color="#6a8a6a" />
          <input
            type="text"
            placeholder="Search order or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {statuses.map((status) => {
            const sc = status !== "All" ? statusConfig[status] : null;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    statusFilter === status
                      ? sc?.bg || "rgba(0,166,81,0.2)"
                      : "rgba(255,255,255,0.05)",
                  color:
                    statusFilter === status
                      ? sc?.color || "#00c962"
                      : "#6a8a6a",
                  fontWeight: statusFilter === status ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                {status}
              </button>
            );
          })}
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
                "Order #",
                "Customer",
                "Items",
                "Total",
                "Payment",
                "Status",
                "Date",
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
            {filtered.map((order) => {
              const sc = statusConfig[order.status];
              const Icon = sc.icon;
              return (
                <tr
                  key={order.id}
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
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#00c962",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    {order.orderNumber}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <p
                      style={{
                        color: "#f0faf0",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {order.user.name}
                    </p>
                    <p style={{ color: "#6a8a6a", fontSize: "12px" }}>
                      {order.user.email}
                    </p>
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#9ab89a",
                      fontSize: "13px",
                    }}
                  >
                    {order.items.length} item(s)
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#00c962",
                      fontWeight: 700,
                    }}
                  >
                    {formatCurrency(order.total)}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      className="badge badge-green"
                      style={{ fontSize: "11px" }}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: sc.bg,
                        color: sc.color,
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        width: "fit-content",
                      }}
                    >
                      <Icon size={12} /> {sc.label}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      color: "#6a8a6a",
                      fontSize: "13px",
                    }}
                  >
                    {formatDate(order.createdAt)}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => setSelected(order.id)}
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
