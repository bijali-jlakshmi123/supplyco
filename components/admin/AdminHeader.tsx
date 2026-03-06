"use client";

import { Bell, Search, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header
      style={{
        height: "64px",
        background: "#111811",
        borderBottom: "1px solid rgba(0,166,81,0.15)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Search */}
      <div className="search-bar" style={{ flex: 1, maxWidth: "400px" }}>
        <Search size={15} color="#6a8a6a" />
        <input
          type="text"
          placeholder="Search products, orders, customers..."
        />
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Notifications */}
        <button
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#9ab89a",
          }}
        >
          <Bell size={17} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              background: "#00a651",
              borderRadius: "50%",
            }}
          />
        </button>

        {/* Admin User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 14px",
            background: "rgba(0,166,81,0.1)",
            border: "1px solid rgba(0,166,81,0.2)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(135deg, #00a651, #007a3d)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={15} color="white" />
          </div>
          <div>
            <p
              style={{
                color: "#f0faf0",
                fontSize: "13px",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              Admin
            </p>
            <p style={{ color: "#6a8a6a", fontSize: "11px" }}>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
