"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setSending(false);
  };

  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="hero-bg"
        style={{ padding: "60px 0", textAlign: "center" }}
      >
        <div className="container">
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <h1
            style={{
              fontSize: "48px",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              marginBottom: "16px",
            }}
          >
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p style={{ color: "#9ab89a", fontSize: "17px" }}>
            We're here to help. Get in touch with our team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "48px",
            }}
          >
            {/* Contact Info */}
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  color: "#f0faf0",
                  fontFamily: "Outfit, sans-serif",
                  marginBottom: "24px",
                }}
              >
                Get in Touch
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "1800-123-4567",
                    sub: "Toll Free | Mon-Sat 9AM-6PM",
                    color: "#00a651",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    value: "support@supplyco.in",
                    sub: "We reply within 24 hours",
                    color: "#00aaff",
                  },
                  {
                    icon: MapPin,
                    title: "Headquarters",
                    value: "Supplyco HQ, Thiruvananthapuram",
                    sub: "Kerala, India - 695001",
                    color: "#aa88ff",
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    value: "Mon - Saturday: 9AM - 6PM",
                    sub: "Support available on weekdays",
                    color: "#ffd700",
                  },
                ].map(({ icon: Icon, title, value, sub, color }) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "16px",
                      background: "#182218",
                      border: "1px solid rgba(0,166,81,0.15)",
                      borderRadius: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: `${color}20`,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#f0faf0",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      >
                        {title}
                      </p>
                      <p style={{ color: "#9ab89a", fontSize: "14px" }}>
                        {value}
                      </p>
                      <p style={{ color: "#6a8a6a", fontSize: "12px" }}>
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Reply */}
              <div
                style={{
                  padding: "20px",
                  background: "rgba(0,166,81,0.1)",
                  border: "1px solid rgba(0,166,81,0.25)",
                  borderRadius: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <MessageCircle size={20} color="#00a651" />
                  <span style={{ color: "#f0faf0", fontWeight: 600 }}>
                    Quick Support
                  </span>
                </div>
                <p style={{ color: "#9ab89a", fontSize: "14px" }}>
                  For immediate assistance with orders, visit your nearest
                  Supplyco outlet or call our toll-free number.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: "32px" }}>
              <h2
                style={{
                  fontSize: "22px",
                  color: "#f0faf0",
                  fontFamily: "Outfit, sans-serif",
                  marginBottom: "24px",
                }}
              >
                Send us a Message
              </h2>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#9ab89a",
                        fontSize: "13px",
                        fontWeight: 500,
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Your Name *
                    </label>
                    <input
                      className="input"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Rahul Kumar"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#9ab89a",
                        fontSize: "13px",
                        fontWeight: 500,
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Email *
                    </label>
                    <input
                      className="input"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="rahul@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      color: "#9ab89a",
                      fontSize: "13px",
                      fontWeight: 500,
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    className="input"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#9ab89a",
                      fontSize: "13px",
                      fontWeight: 500,
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    className="input"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="How can we help you?"
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={sending}
                  style={{ width: "100%", opacity: sending ? 0.8 : 1 }}
                >
                  {sending ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "white",
                          borderRadius: "50%",
                          animation: "spin-slow 0.6s linear infinite",
                        }}
                      />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
