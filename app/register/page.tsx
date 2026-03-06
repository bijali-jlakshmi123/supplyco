"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock registration
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created! Welcome to the family.");
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "500px", width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #00a651, #007a3d)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={26} color="white" />
            </div>
            <h1
              style={{
                fontSize: "28px",
                color: "#f0faf0",
                fontWeight: 800,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Register
            </h1>
          </Link>
          <p style={{ color: "#6a8a6a", marginTop: "12px" }}>
            Create an account to track orders and save favorites.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#182218",
            border: "1px solid rgba(0,166,81,0.15)",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="input-group">
                <label
                  style={{
                    color: "#9ab89a",
                    fontSize: "14px",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User
                    size={16}
                    color="#00a651"
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      background: "#1e2a1e",
                      border: "1px solid rgba(0,166,81,0.2)",
                      borderRadius: "12px",
                      color: "white",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
              <div className="input-group">
                <label
                  style={{
                    color: "#9ab89a",
                    fontSize: "14px",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Phone
                </label>
                <div style={{ position: "relative" }}>
                  <Phone
                    size={16}
                    color="#00a651"
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      background: "#1e2a1e",
                      border: "1px solid rgba(0,166,81,0.2)",
                      borderRadius: "12px",
                      color: "white",
                      outline: "none",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "14px",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  color="#00a651"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#1e2a1e",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "14px",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Create Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="#00a651"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#1e2a1e",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "12px",
              }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Join Supplyco"}
              {!loading && (
                <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              )}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "24px",
            }}
          >
            <p style={{ color: "#6a8a6a", fontSize: "14px" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#00a651",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
