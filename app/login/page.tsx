"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back to Supplyco!");
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
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "450px", width: "100%" }}>
        {/* Logo/Brand */}
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
              <LogIn size={26} color="white" />
            </div>
            <h1
              style={{
                fontSize: "28px",
                color: "#f0faf0",
                fontWeight: 800,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Supply<span style={{ color: "#00a651" }}>co</span>
            </h1>
          </Link>
          <p style={{ color: "#6a8a6a", marginTop: "12px" }}>
            Login to access your orders and fresh favorites.
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
                  size={18}
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
                  placeholder="name@example.com"
                  style={{
                    width: "100%",
                    padding: "14px 14px 14px 44px",
                    background: "#1e2a1e",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  color: "#9ab89a",
                  fontSize: "14px",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  color="#00a651"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "14px 14px 14px 44px",
                    background: "#1e2a1e",
                    border: "1px solid rgba(0,166,81,0.2)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#6a8a6a",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right", marginBottom: "32px" }}>
              <Link
                href="/forgot-password"
                style={{
                  color: "#00a651",
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>
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
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && (
                <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={{ color: "#6a8a6a", fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "#00a651",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6a8a6a",
              fontSize: "12px",
            }}
          >
            <ShieldCheck size={14} color="#00a651" /> Secure Login
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6a8a6a",
              fontSize: "12px",
            }}
          >
            <ShoppingBag size={14} color="#00a651" /> Buyer Protection
          </div>
        </div>
      </div>
    </div>
  );
}
