"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  Phone,
  MapPin,
  Bell,
  Leaf,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const categories = [
  { name: "Vegetables", slug: "vegetables", icon: "🥦" },
  { name: "Fruits", slug: "fruits", icon: "🍎" },
  { name: "Dairy", slug: "dairy", icon: "🥛" },
  { name: "Grains & Rice", slug: "grains", icon: "🌾" },
  { name: "Beverages", slug: "beverages", icon: "🧃" },
  { name: "Snacks", slug: "snacks", icon: "🍿" },
  { name: "Meat & Fish", slug: "meat-fish", icon: "🐟" },
  { name: "Personal Care", slug: "personal-care", icon: "🧴" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #007a3d 0%, #00a651 100%)",
          padding: "8px 0",
          fontSize: "13px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Phone size={13} /> 1800-123-4567
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={13} /> Kerala, India
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span>Free delivery on orders above ₹499</span>
            {/* <Link href="/admin" style={{ color: "white", fontWeight: 600 }}>
              Admin Panel
            </Link> */}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isScrolled
            ? "rgba(10, 15, 10, 0.95)"
            : "rgba(10, 15, 10, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 166, 81, 0.2)",
          transition: "all 0.3s",
          boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "70px",
              gap: "24px",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg, #00a651, #007a3d)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0,166,81,0.4)",
                }}
              >
                <Leaf size={22} color="white" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#f0faf0",
                    fontFamily: "Outfit, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  Supply<span style={{ color: "#00a651" }}>co</span>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#9ab89a",
                    letterSpacing: "1px",
                  }}
                >
                  SUPERMARKET
                </div>
              </div>
            </Link>

            {/* Categories Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "rgba(0,166,81,0.15)",
                  border: "1px solid rgba(0,166,81,0.3)",
                  borderRadius: "10px",
                  color: "#f0faf0",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <Menu size={16} /> Categories{" "}
                <ChevronDown
                  size={14}
                  style={{
                    transition: "transform 0.3s",
                    transform: catOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>
              {catOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#111811",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "14px",
                    padding: "8px",
                    minWidth: "200px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    zIndex: 200,
                    animation: "fadeIn 0.2s ease-out",
                  }}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/shop?category=${cat.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        color: "#9ab89a",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(0,166,81,0.1)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#f0faf0";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#9ab89a";
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: "500px" }}>
              <div className="search-bar">
                <Search size={16} color="#6a8a6a" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6a8a6a",
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              className="hidden-mobile"
            >
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    color: pathname === link.href ? "#00a651" : "#9ab89a",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: pathname === link.href ? 600 : 400,
                    transition: "all 0.2s",
                    background:
                      pathname === link.href
                        ? "rgba(0,166,81,0.1)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "auto",
              }}
            >
              <Link
                href="/wishlist"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ab89a",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
              >
                <Heart size={18} />
              </Link>
              <Link
                href="/account"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ab89a",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
              >
                <User size={18} />
              </Link>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "linear-gradient(135deg, #00a651, #007a3d)",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.3s",
                  position: "relative",
                }}
              >
                <ShoppingCart size={18} />
                Cart
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#ff6b00",
                      color: "white",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: "none",
                  width: "40px",
                  height: "40px",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#f0faf0",
                  cursor: "pointer",
                }}
                className="show-mobile"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "#111811",
            borderBottom: "1px solid rgba(0,166,81,0.2)",
            padding: "16px 0",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div className="container">
            <div className="search-bar" style={{ marginBottom: "16px" }}>
              <Search size={16} color="#6a8a6a" />
              <input type="text" placeholder="Search products..." />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  color: pathname === link.href ? "#00a651" : "#9ab89a",
                  textDecoration: "none",
                  fontWeight: pathname === link.href ? 600 : 400,
                  borderRadius: "10px",
                  marginBottom: "4px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
