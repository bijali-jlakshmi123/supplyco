"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  Truck,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 499 ? 0 : 50;
  const finalTotal = totalPrice + deliveryFee;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Thiruvananthapuram",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  if (items.length === 0 && !isSuccess) {
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
          <ShoppingBag
            size={60}
            color="#3a5a3a"
            style={{ marginBottom: "20px" }}
          />
          <h1
            style={{ color: "#f0faf0", fontSize: "32px", marginBottom: "16px" }}
          >
            Your cart is empty
          </h1>
          <Link
            href="/shop"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        style={{
          background: "var(--bg-dark)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            background: "#182218",
            border: "1px solid rgba(0,166,81,0.25)",
            borderRadius: "32px",
            padding: "60px 40px",
            maxWidth: "600px",
            textAlign: "center",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "rgba(0,201,98,0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
              border: "2px solid rgba(0,201,98,0.3)",
            }}
          >
            <CheckCircle2 size={60} color="#00c962" />
          </div>
          <h1
            style={{
              color: "#f0faf0",
              fontSize: "36px",
              marginBottom: "16px",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Order Confirmed!
          </h1>
          <p
            style={{
              color: "#9ab89a",
              fontSize: "16px",
              marginBottom: "40px",
              lineHeight: 1.6,
            }}
          >
            Thank you for shopping with Supplyco. Your order{" "}
            <strong>#SC-28475</strong> has been placed successfully and will be
            delivered within 24-48 hours.
          </p>
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <Link
              href="/"
              className="btn-primary"
              style={{ textDecoration: "none" }}
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="btn-secondary"
              style={{ textDecoration: "none" }}
            >
              Shop More
            </Link>
          </div>
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
        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "40px",
            justifyContent: "center",
          }}
        >
          {[
            { n: 1, l: "Shipping" },
            { n: 2, l: "Payment" },
            { n: 3, l: "Confirmation" },
          ].map((s) => (
            <div
              key={s.n}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background:
                    step >= s.n ? "#00a651" : "rgba(255,255,255,0.05)",
                  color: step >= s.n ? "white" : "#6a8a6a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  border:
                    step >= s.n ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {step > s.n ? <CheckCircle2 size={18} /> : s.n}
              </div>
              <span
                style={{
                  color: step >= s.n ? "#f0faf0" : "#6a8a6a",
                  fontSize: "13px",
                  fontWeight: step >= s.n ? 600 : 400,
                }}
              >
                {s.l}
              </span>
              {s.n < 3 && (
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "48px",
          }}
        >
          {/* Checkout Form */}
          <div
            style={{
              background: "#182218",
              border: "1px solid rgba(0,166,81,0.15)",
              borderRadius: "24px",
              padding: "40px",
            }}
          >
            <form onSubmit={handlePlaceOrder}>
              {step === 1 && (
                <div style={{ animation: "fadeIn 0.3s" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "32px",
                    }}
                  >
                    <Truck size={24} color="#00a651" />
                    <h2
                      style={{
                        color: "#f0faf0",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      Shipping Details
                    </h2>
                  </div>

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
                          fontSize: "13px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "14px",
                          background: "#1e2a1e",
                          border: "1px solid rgba(0,166,81,0.2)",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                    </div>
                    <div className="input-group">
                      <label
                        style={{
                          color: "#9ab89a",
                          fontSize: "13px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "14px",
                          background: "#1e2a1e",
                          border: "1px solid rgba(0,166,81,0.2)",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        color: "#9ab89a",
                        fontSize: "13px",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765-43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#1e2a1e",
                        border: "1px solid rgba(0,166,81,0.2)",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                  </div>

                  <div className="input-group" style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        color: "#9ab89a",
                        fontSize: "13px",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Complete Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="House No., Street, Area"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: "#1e2a1e",
                        border: "1px solid rgba(0,166,81,0.2)",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "32px",
                    }}
                  >
                    <div className="input-group">
                      <label
                        style={{
                          color: "#9ab89a",
                          fontSize: "13px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        readOnly
                        value={formData.city}
                        style={{
                          width: "100%",
                          padding: "14px",
                          background: "#111811",
                          border: "1px solid rgba(0,166,81,0.1)",
                          borderRadius: "12px",
                          color: "#6a8a6a",
                        }}
                      />
                    </div>
                    <div className="input-group">
                      <label
                        style={{
                          color: "#9ab89a",
                          fontSize: "13px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="695001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "14px",
                          background: "#1e2a1e",
                          border: "1px solid rgba(0,166,81,0.2)",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        formData.name &&
                        formData.email &&
                        formData.phone &&
                        formData.address &&
                        formData.pincode
                      ) {
                        setStep(2);
                      } else {
                        toast.error("Please fill all required fields");
                      }
                    }}
                    className="btn-primary"
                    style={{ width: "100%", padding: "18px" }}
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ animation: "fadeIn 0.3s" }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "none",
                      border: "none",
                      color: "#00a651",
                      fontSize: "14px",
                      cursor: "pointer",
                      marginBottom: "24px",
                    }}
                  >
                    <ArrowLeft size={14} /> Back to shipping
                  </button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "32px",
                    }}
                  >
                    <CreditCard size={24} color="#00a651" />
                    <h2
                      style={{
                        color: "#f0faf0",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      Payment Method
                    </h2>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginBottom: "40px",
                    }}
                  >
                    {[
                      {
                        id: "cod",
                        label: "Cash on Delivery",
                        desc: "Pay when you receive the orders",
                        icon: Truck,
                      },
                      {
                        id: "stripe",
                        label: "Credit / Debit Card",
                        desc: "Powered by Stripe",
                        icon: CreditCard,
                      },
                      {
                        id: "paypal",
                        label: "PayPal",
                        desc: "Pay securely with PayPal",
                        icon: ShieldCheck,
                      },
                    ].map((m) => (
                      <label
                        key={m.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "20px",
                          background:
                            formData.paymentMethod === m.id
                              ? "rgba(0,166,81,0.1)"
                              : "#1e2a1e",
                          border: `1px solid ${formData.paymentMethod === m.id ? "#00c962" : "rgba(255,255,255,0.05)"}`,
                          borderRadius: "16px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={m.id}
                          checked={formData.paymentMethod === m.id}
                          onChange={handleInputChange}
                          style={{
                            accentColor: "#00a651",
                            width: "18px",
                            height: "18px",
                          }}
                        />
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <m.icon
                            size={20}
                            color={
                              formData.paymentMethod === m.id
                                ? "#00c962"
                                : "#6a8a6a"
                            }
                          />
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#f0faf0",
                              fontSize: "15px",
                              fontWeight: 600,
                            }}
                          >
                            {m.label}
                          </p>
                          <p style={{ color: "#6a8a6a", fontSize: "13px" }}>
                            {m.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isProcessing}
                    style={{
                      width: "100%",
                      padding: "18px",
                      opacity: isProcessing ? 0.7 : 1,
                    }}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Place Order ${formatCurrency(finalTotal)}`}
                  </button>
                  <p
                    style={{
                      color: "#6a8a6a",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "16px",
                    }}
                  >
                    By placing your order, you agree to Supplyco's Terms of
                    Service and Privacy Policy.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#182218",
                border: "1px solid rgba(0,166,81,0.15)",
                borderRadius: "24px",
                padding: "32px",
              }}
            >
              <h3
                style={{
                  color: "#f0faf0",
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                Your Order
              </h3>

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  margin: "0 -8px",
                  padding: "0 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#1e2a1e",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "#f0faf0",
                          fontSize: "13px",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.product.name}
                      </p>
                      <p style={{ color: "#6a8a6a", fontSize: "12px" }}>
                        {item.quantity} × {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <span
                      style={{
                        color: "#f0faf0",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#9ab89a",
                  }}
                >
                  <span>Subtotal</span>
                  <span style={{ color: "#f0faf0" }}>
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#9ab89a",
                  }}
                >
                  <span>Delivery</span>
                  <span
                    style={{ color: deliveryFee === 0 ? "#00c962" : "#f0faf0" }}
                  >
                    {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    color: "#f0faf0",
                    fontWeight: 800,
                    marginTop: "8px",
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: "#00c962" }}>
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                background: "rgba(0,166,81,0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(0,166,81,0.1)",
              }}
            >
              <ShieldCheck size={20} color="#00a651" />
              <p style={{ color: "#9ab89a", fontSize: "12px" }}>
                Your personal data is encrypted and protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
