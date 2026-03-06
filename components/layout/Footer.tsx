"use client";

import Link from "next/link";
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Truck,
  Shield,
  Headphones,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Fresh Vegetables", href: "/shop?category=vegetables" },
    { label: "Fruits", href: "/shop?category=fruits" },
    { label: "Dairy Products", href: "/shop?category=dairy" },
    { label: "Special Offers", href: "/offers" },
    { label: "New Arrivals", href: "/shop?filter=new" },
  ];

  const helpLinks = [
    { label: "About Supplyco", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const features = [
    { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
    { icon: Shield, title: "100% Secure", desc: "Safe & encrypted payments" },
    { icon: Headphones, title: "24/7 Support", desc: "Round the clock help" },
    { icon: RefreshCw, title: "Easy Returns", desc: "Hassle-free returns" },
  ];

  return (
    <footer>
      {/* Feature Strips */}
      <div
        style={{
          background: "#111811",
          borderTop: "1px solid rgba(0,166,81,0.15)",
          borderBottom: "1px solid rgba(0,166,81,0.15)",
          padding: "30px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "rgba(0,166,81,0.15)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid rgba(0,166,81,0.2)",
                  }}
                >
                  <Icon size={22} color="#00a651" />
                </div>
                <div>
                  <div
                    style={{
                      color: "#f0faf0",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ color: "#6a8a6a", fontSize: "13px" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: "#0a0f0a", padding: "60px 0 40px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
              gap: "48px",
              marginBottom: "48px",
            }}
          >
            {/* Brand Column */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
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
                  }}
                >
                  <Leaf size={22} color="white" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "20px",
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
                      letterSpacing: "1px",
                    }}
                  >
                    SUPERMARKET
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "#6a8a6a",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                Kerala's most trusted government supermarket chain bringing you
                fresh, quality products at fair prices. Serving communities
                since 1974.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <a
                  href="tel:18001234567"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#9ab89a",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={14} color="#00a651" /> 1800-123-4567 (Toll Free)
                </a>
                <a
                  href="mailto:support@supplyco.in"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#9ab89a",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <Mail size={14} color="#00a651" /> support@supplyco.in
                </a>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#9ab89a",
                    fontSize: "14px",
                  }}
                >
                  <MapPin size={14} color="#00a651" /> Supplyco HQ,
                  Thiruvananthapuram, Kerala
                </span>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3
                style={{
                  color: "#f0faf0",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Shop
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#6a8a6a",
                        fontSize: "14px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#00a651")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6a8a6a")
                      }
                    >
                      <ChevronRight size={13} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3
                style={{
                  color: "#f0faf0",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Help
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#6a8a6a",
                        fontSize: "14px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#00a651")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6a8a6a")
                      }
                    >
                      <ChevronRight size={13} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3
                style={{
                  color: "#f0faf0",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                Stay Updated
              </h3>
              <p
                style={{
                  color: "#6a8a6a",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                Subscribe to get exclusive deals and the freshest offers.
              </p>
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "10px",
                    color: "#f0faf0",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  className="btn-primary"
                  style={{
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontSize: "14px",
                  }}
                >
                  Subscribe
                </button>
              </div>
              <div>
                <p
                  style={{
                    color: "#6a8a6a",
                    fontSize: "13px",
                    marginBottom: "12px",
                  }}
                >
                  Follow us on social media
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "rgba(0,166,81,0.1)",
                        border: "1px solid rgba(0,166,81,0.2)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9ab89a",
                        transition: "all 0.3s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "#00a651";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "white";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(0,166,81,0.1)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#9ab89a";
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: "1px solid rgba(0,166,81,0.1)",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p style={{ color: "#6a8a6a", fontSize: "13px" }}>
              © {year} Supplyco Supermarket. All rights reserved. | Bijali
              Jayalakshmi Jayan
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{
                    color: "#6a8a6a",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
