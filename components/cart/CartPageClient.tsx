"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPageClient() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryFee = totalPrice >= 499 ? 0 : 50;

  if (totalItems === 0) {
    return (
      <div
        style={{
          background: "var(--bg-dark)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(0,166,81,0.05)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <ShoppingBag size={60} color="#3a5a3a" />
          </div>
          <h1
            style={{ color: "#f0faf0", fontSize: "32px", marginBottom: "16px" }}
          >
            Your cart is empty
          </h1>
          <p
            style={{
              color: "#9ab89a",
              marginBottom: "32px",
              maxWidth: "450px",
              margin: "0 auto 32px",
            }}
          >
            Looks like you haven't added anything to your cart yet. Browse our
            categories and find something fresh!
          </p>
          <Link
            href="/shop"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        padding: "60px 0 100px",
      }}
    >
      <div className="container">
        <h1
          style={{
            fontSize: "36px",
            color: "#f0faf0",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            marginBottom: "40px",
          }}
        >
          Shopping <span className="gradient-text">Cart</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Main Content */}
          <div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.15)",
                    borderRadius: "20px",
                    padding: "20px",
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                    transition: "all 0.3s",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "#1e2a1e",
                      borderRadius: "16px",
                      overflow: "hidden",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <ShoppingBag size={40} color="#3a5a3a" />
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        color: "#f0faf0",
                        fontSize: "18px",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {item.product.name}
                    </h3>
                    <p
                      style={{
                        color: "#6a8a6a",
                        fontSize: "14px",
                        marginBottom: "12px",
                      }}
                    >
                      {item.product.unit} | In Stock
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="qty-control"
                        style={{ background: "#223322", padding: "4px" }}
                      >
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="qty-value"
                          style={{ width: "40px", fontSize: "16px" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            color: "#00c962",
                            fontSize: "20px",
                            fontWeight: 800,
                          }}
                        >
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                        <p style={{ color: "#6a8a6a", fontSize: "12px" }}>
                          {formatCurrency(item.product.price)} / unit
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => {
                      removeItem(item.product.id);
                      toast.success("Item removed");
                    }}
                    style={{
                      background: "rgba(255,107,107,0.1)",
                      border: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      color: "#ff6b6b",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Shopping Incentives */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "40px",
              }}
            >
              {[
                {
                  icon: Truck,
                  title: "Free Delivery",
                  desc: "On orders above ₹499",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Checkout",
                  desc: "100% safe payments",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                  desc: "7-day return policy",
                },
              ].map((info) => (
                <div
                  key={info.title}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    background: "#182218",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,166,81,0.1)",
                  }}
                >
                  <info.icon
                    size={24}
                    color="#00a651"
                    style={{ marginBottom: "12px" }}
                  />
                  <h4
                    style={{
                      color: "#f0faf0",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {info.title}
                  </h4>
                  <p style={{ color: "#6a8a6a", fontSize: "12px" }}>
                    {info.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Summary */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#182218",
                border: "1px solid rgba(0,166,81,0.25)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <h2
                style={{
                  color: "#f0faf0",
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "24px",
                }}
              >
                Order Summary
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#9ab89a",
                  }}
                >
                  <span>Subtotal ({totalItems} items)</span>
                  <span style={{ color: "#f0faf0", fontWeight: 500 }}>
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#9ab89a",
                  }}
                >
                  <span>Delivery Fee</span>
                  <span
                    style={{
                      color: deliveryFee === 0 ? "#00c962" : "#f0faf0",
                      fontWeight: 500,
                    }}
                  >
                    {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <div
                    style={{
                      background: "rgba(255,107,0,0.1)",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,107,0,0.2)",
                    }}
                  >
                    <p
                      style={{
                        color: "#ff8c38",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      Add <strong>{formatCurrency(499 - totalPrice)}</strong>{" "}
                      more to unlock <strong>FREE DELIVERY</strong>!
                    </p>
                  </div>
                )}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "24px",
                  marginBottom: "32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#f0faf0",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    color: "#00c962",
                    fontSize: "28px",
                    fontWeight: 800,
                  }}
                >
                  {formatCurrency(totalPrice + deliveryFee)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="btn-primary"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  textAlign: "center",
                  padding: "18px",
                  fontSize: "16px",
                }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              <Link
                href="/shop"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "16px",
                  color: "#6a8a6a",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
