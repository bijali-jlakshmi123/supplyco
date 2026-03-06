"use client";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

const DEMO_STATS = {
  totalProducts: 342,
  totalOrders: 1284,
  totalCustomers: 8920,
  totalRevenue: 2847500,
  recentOrders: [
    {
      id: "1",
      orderNumber: "SC-ABC123",
      user: { name: "Rahul Kumar", email: "rahul@gmail.com" },
      total: 1250,
      status: "DELIVERED",
      createdAt: new Date(),
    },
    {
      id: "2",
      orderNumber: "SC-DEF456",
      user: { name: "Priya Nair", email: "priya@gmail.com" },
      total: 890,
      status: "PROCESSING",
      createdAt: new Date(),
    },
    {
      id: "3",
      orderNumber: "SC-GHI789",
      user: { name: "Arun Menon", email: "arun@gmail.com" },
      total: 2100,
      status: "SHIPPED",
      createdAt: new Date(),
    },
    {
      id: "4",
      orderNumber: "SC-JKL012",
      user: { name: "Sreeja Pillai", email: "sreeja@gmail.com" },
      total: 650,
      status: "PENDING",
      createdAt: new Date(),
    },
    {
      id: "5",
      orderNumber: "SC-MNO345",
      user: { name: "Vineeth R", email: "vineeth@gmail.com" },
      total: 3400,
      status: "CANCELLED",
      createdAt: new Date(),
    },
  ],
  topProducts: [
    {
      id: "1",
      name: "Fresh Kerala Bananas",
      price: 45,
      stock: 120,
      category: { name: "Fruits" },
      _count: { orderItems: 530 },
    },
    {
      id: "2",
      name: "Organic Tomatoes",
      price: 60,
      stock: 85,
      category: { name: "Vegetables" },
      _count: { orderItems: 480 },
    },
    {
      id: "3",
      name: "Fresh Milk 1L",
      price: 68,
      stock: 200,
      category: { name: "Dairy" },
      _count: { orderItems: 420 },
    },
    {
      id: "4",
      name: "Basmati Rice 5kg",
      price: 320,
      stock: 45,
      category: { name: "Grains" },
      _count: { orderItems: 280 },
    },
    {
      id: "5",
      name: "Coconut Oil 1L",
      price: 180,
      stock: 60,
      category: { name: "Oils" },
      _count: { orderItems: 210 },
    },
  ],
  lowStockProducts: [
    { id: "1", name: "Alphonso Mangoes", stock: 3 },
    { id: "2", name: "Garden Peas 500g", stock: 5 },
    { id: "3", name: "Pomegranate", stock: 7 },
    { id: "4", name: "Mixed Dry Fruits", stock: 8 },
  ],
};

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
    color: "#00c962",
    bg: "rgba(0,201,98,0.15)",
    icon: CheckCircle,
    label: "Confirmed",
  },
  PROCESSING: {
    color: "#00aaff",
    bg: "rgba(0,170,255,0.15)",
    icon: Package,
    label: "Processing",
  },
  SHIPPED: {
    color: "#aa88ff",
    bg: "rgba(170,136,255,0.15)",
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

export default function AdminDashboardClient({ stats }: { stats: any }) {
  const data = stats.totalProducts > 0 ? stats : DEMO_STATS;

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      icon: DollarSign,
      color: "#00a651",
      change: "+18.5%",
      up: true,
    },
    {
      title: "Total Orders",
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "#00aaff",
      change: "+12.3%",
      up: true,
    },
    {
      title: "Total Customers",
      value: data.totalCustomers.toLocaleString(),
      icon: Users,
      color: "#aa88ff",
      change: "+8.7%",
      up: true,
    },
    {
      title: "Total Products",
      value: data.totalProducts.toLocaleString(),
      icon: Package,
      color: "#ff8c38",
      change: "+5 new",
      up: true,
    },
  ];

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "26px",
            color: "#f0faf0",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
          }}
        >
          Dashboard Overview
        </h1>
        <p style={{ color: "#9ab89a", marginTop: "4px", fontSize: "14px" }}>
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              style={{
                background: "#182218",
                border: "1px solid rgba(0,166,81,0.15)",
                borderRadius: "16px",
                padding: "20px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(0,166,81,0.4)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(0,166,81,0.15)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: `${card.color}20`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} color={card.color} />
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    color: card.up ? "#00c962" : "#ff6b6b",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: card.up
                      ? "rgba(0,201,98,0.1)"
                      : "rgba(255,107,107,0.1)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {card.up ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {card.change}
                </span>
              </div>
              <p
                style={{
                  color: "#6a8a6a",
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  color: "#f0faf0",
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Revenue Chart (Demo) */}
        <div
          style={{
            background: "#182218",
            border: "1px solid rgba(0,166,81,0.15)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div>
              <h3
                style={{ color: "#f0faf0", fontSize: "16px", fontWeight: 600 }}
              >
                Revenue Overview
              </h3>
              <p style={{ color: "#6a8a6a", fontSize: "13px" }}>
                Last 7 months
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["7D", "1M", "6M", "1Y"].map((t) => (
                <button
                  key={t}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "8px",
                    background:
                      t === "6M" ? "rgba(0,166,81,0.2)" : "transparent",
                    border: `1px solid ${t === "6M" ? "rgba(0,166,81,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: t === "6M" ? "#00c962" : "#6a8a6a",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {/* Bar Chart */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "140px",
            }}
          >
            {[
              { month: "Sep", revenue: 180000 },
              { month: "Oct", revenue: 240000 },
              { month: "Nov", revenue: 310000 },
              { month: "Dec", revenue: 420000 },
              { month: "Jan", revenue: 380000 },
              { month: "Feb", revenue: 450000 },
              {
                month: "Mar",
                revenue:
                  data.totalRevenue > 0
                    ? Math.min(data.totalRevenue / 6, 500000)
                    : 520000,
              },
            ].map((item, i, arr) => {
              const max = Math.max(...arr.map((a) => a.revenue));
              const height = (item.revenue / max) * 120;
              const isLast = i === arr.length - 1;
              return (
                <div
                  key={item.month}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${height}px`,
                      background: isLast
                        ? "linear-gradient(180deg, #00c962, #00a651)"
                        : "rgba(0,166,81,0.2)",
                      borderRadius: "6px 6px 0 0",
                      transition: "all 0.3s",
                      boxShadow: isLast
                        ? "0 0 15px rgba(0,166,81,0.4)"
                        : "none",
                    }}
                  />
                  <span style={{ color: "#6a8a6a", fontSize: "11px" }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            background: "#182218",
            border: "1px solid rgba(0,166,81,0.15)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              color: "#f0faf0",
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Order Status
          </h3>
          {[
            { label: "Delivered", count: 842, pct: 65, color: "#00a651" },
            { label: "Processing", count: 243, pct: 19, color: "#00aaff" },
            { label: "Pending", count: 128, pct: 10, color: "#ffd700" },
            { label: "Cancelled", count: 71, pct: 6, color: "#ff6b6b" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#9ab89a", fontSize: "13px" }}>
                  {item.label}
                </span>
                <span
                  style={{
                    color: "#f0faf0",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {item.count}
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${item.pct}%`,
                    background: item.color,
                    borderRadius: "3px",
                    transition: "width 1s ease-out",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders + Low Stock */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "16px",
        }}
      >
        {/* Recent Orders */}
        <div
          style={{
            background: "#182218",
            border: "1px solid rgba(0,166,81,0.15)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ color: "#f0faf0", fontSize: "16px", fontWeight: 600 }}>
              Recent Orders
            </h3>
            <Link
              href="/admin/orders"
              style={{
                color: "#00a651",
                fontSize: "13px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View All <ArrowUpRight size={13} />
            </Link>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {data.recentOrders.map((order: any) => {
              const sc = statusConfig[order.status] || statusConfig.PENDING;
              const IconComp = sc.icon;
              return (
                <div
                  key={order.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px",
                    background: "#1e2a1e",
                    borderRadius: "10px",
                    border: "1px solid rgba(0,166,81,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      background: sc.bg,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={17} color={sc.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: "#f0faf0",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {order.orderNumber}
                    </p>
                    <p
                      style={{
                        color: "#6a8a6a",
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.user?.name || order.user?.email}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        color: "#00c962",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      {formatCurrency(order.total)}
                    </p>
                    <span
                      style={{
                        background: sc.bg,
                        color: sc.color,
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alert + Top Products */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Low Stock */}
          <div
            style={{
              background: "#182218",
              border: "1px solid rgba(255,107,107,0.3)",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <AlertTriangle size={18} color="#ff6b6b" />
              <h3
                style={{ color: "#f0faf0", fontSize: "15px", fontWeight: 600 }}
              >
                Low Stock Alert
              </h3>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {data.lowStockProducts.map((product: any) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#9ab89a", fontSize: "13px" }}>
                    {product.name}
                  </span>
                  <span
                    style={{
                      background:
                        product.stock <= 3
                          ? "rgba(255,107,107,0.2)"
                          : "rgba(255,215,0,0.15)",
                      color: product.stock <= 3 ? "#ff6b6b" : "#ffd700",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div
            style={{
              background: "#182218",
              border: "1px solid rgba(0,166,81,0.15)",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{ color: "#f0faf0", fontSize: "15px", fontWeight: 600 }}
              >
                Top Products
              </h3>
              <TrendingUp size={16} color="#00a651" />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {data.topProducts.slice(0, 4).map((product: any, i: number) => (
                <div
                  key={product.id}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      color: i === 0 ? "#ffd700" : "#6a8a6a",
                      fontWeight: 700,
                      fontSize: "14px",
                      width: "18px",
                    }}
                  >
                    #{i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: "#f0faf0",
                        fontSize: "13px",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </p>
                    <p style={{ color: "#6a8a6a", fontSize: "11px" }}>
                      {product._count?.orderItems || 0} sold
                    </p>
                  </div>
                  <span
                    style={{
                      color: "#00c962",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
