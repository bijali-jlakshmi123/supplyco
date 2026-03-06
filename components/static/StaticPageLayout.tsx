"use client";

import { ReactNode } from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface StaticPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function StaticPageLayout({
  title,
  subtitle,
  children,
}: StaticPageProps) {
  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        padding: "60px 0 120px",
      }}
    >
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Breadcrumbs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#6a8a6a",
            fontSize: "14px",
            marginBottom: "32px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#00a651",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
            }}
          >
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "#f0faf0" }}>{title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "48px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: "#9ab89a", fontSize: "18px", lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(to right, #00a651, transparent)",
              marginTop: "24px",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Content */}
        <div
          className="static-content"
          style={{ color: "#9ab89a", lineHeight: 1.8, fontSize: "16px" }}
        >
          {children}
        </div>
      </div>

      <style jsx global>{`
        .static-content h2 {
          color: #f0faf0;
          font-size: 24px;
          margin: 48px 0 24px;
          font-weight: 700;
        }
        .static-content p {
          margin-bottom: 24px;
        }
        .static-content ul,
        .static-content ol {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        .static-content li {
          margin-bottom: 12px;
        }
        .static-content strong {
          color: #f0faf0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
