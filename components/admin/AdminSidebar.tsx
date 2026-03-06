"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Settings,
  Leaf,
  Percent,
  Image,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Coupons", href: "/admin/coupons", icon: Percent },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: "260px",
        background: "#111811",
        borderRight: "1px solid rgba(0,166,81,0.15)",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(0,166,81,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #00a651, #007a3d)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={20} color="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Supply<span style={{ color: "#00a651" }}>co</span>
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#6a8a6a",
                letterSpacing: "0.8px",
              }}
            >
              ADMIN PANEL
            </div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        <p
          style={{
            color: "#3a5a3a",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            padding: "8px 10px",
            marginBottom: "6px",
          }}
        >
          Main Menu
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 12px",
                borderRadius: "10px",
                marginBottom: "3px",
                textDecoration: "none",
                background: isActive ? "rgba(0,166,81,0.15)" : "transparent",
                color: isActive ? "#00c962" : "#9ab89a",
                fontWeight: isActive ? 600 : 400,
                fontSize: "14px",
                transition: "all 0.2s",
                border: `1px solid ${isActive ? "rgba(0,166,81,0.25)" : "transparent"}`,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(0,166,81,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#f0faf0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#9ab89a";
                }
              }}
            >
              <Icon size={17} />
              <span style={{ flex: 1 }}>{label}</span>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid rgba(0,166,81,0.1)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "11px 12px",
            borderRadius: "10px",
            color: "#9ab89a",
            fontSize: "14px",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <LogOut size={17} />
          Exit to Store
        </Link>
      </div>
    </div>
  );
}
