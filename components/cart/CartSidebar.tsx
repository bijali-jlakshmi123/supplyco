"use client";

import { useCartStore } from "@/store/cartStore";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();
  const total = getTotalPrice();
  const count = getTotalItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="overlay"
          onClick={closeCart}
          style={{ animation: "fadeIn 0.2s ease-out" }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "420px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#111811",
          borderLeft: "1px solid rgba(0,166,81,0.2)",
          zIndex: 500,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-20px 0 60px rgba(0,0,0,0.7)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0,166,81,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingCart size={22} color="#00a651" />
            <h2
              style={{
                fontSize: "18px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              My Cart
            </h2>
            {count > 0 && (
              <span
                style={{
                  background: "#00a651",
                  color: "white",
                  borderRadius: "20px",
                  padding: "2px 10px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {count} items
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            style={{
              width: "34px",
              height: "34px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ab89a",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(0,166,81,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBag size={40} color="#6a8a6a" />
              </div>
              <p
                style={{ color: "#9ab89a", fontSize: "16px", fontWeight: 500 }}
              >
                Your cart is empty
              </p>
              <p style={{ color: "#6a8a6a", fontSize: "14px" }}>
                Start shopping to add items here
              </p>
              <button
                onClick={closeCart}
                className="btn-primary"
                style={{ marginTop: "8px" }}
              >
                <Link
                  href="/shop"
                  onClick={closeCart}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Browse Products
                </Link>
              </button>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    background: "#182218",
                    border: "1px solid rgba(0,166,81,0.15)",
                    borderRadius: "12px",
                    padding: "12px",
                    display: "flex",
                    gap: "12px",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "#1e2a1e",
                      borderRadius: "10px",
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
                      <ShoppingBag size={28} color="#6a8a6a" />
                    )}
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: "#f0faf0",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product.name}
                    </p>
                    <p
                      style={{
                        color: "#6a8a6a",
                        fontSize: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      {item.product.unit}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "#00c962",
                          fontWeight: 700,
                          fontSize: "15px",
                        }}
                      >
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6a8a6a",
                      alignSelf: "flex-start",
                      padding: "4px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ff6b6b")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6a8a6a")
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid rgba(0,166,81,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#9ab89a" }}>Subtotal</span>
              <span style={{ color: "#f0faf0", fontWeight: 600 }}>
                {formatCurrency(total)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#9ab89a" }}>Delivery</span>
              <span
                style={{
                  color: total >= 499 ? "#00c962" : "#f0faf0",
                  fontWeight: 600,
                }}
              >
                {total >= 499 ? "FREE" : formatCurrency(50)}
              </span>
            </div>
            {total < 499 && (
              <p
                style={{
                  color: "#6a8a6a",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}
              >
                Add {formatCurrency(499 - total)} more for free delivery
              </p>
            )}
            <div
              style={{
                borderTop: "1px solid rgba(0,166,81,0.1)",
                paddingTop: "12px",
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ color: "#f0faf0", fontWeight: 700, fontSize: "17px" }}
              >
                Total
              </span>
              <span
                style={{ color: "#00c962", fontWeight: 700, fontSize: "20px" }}
              >
                {formatCurrency(total >= 499 ? total : total + 50)}
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-secondary"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
