import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Supplyco | Kerala's Trusted Supermarket",
  description:
    "Learn about Supplyco – Kerala's government-run supermarket chain serving communities since 1974.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="hero-bg"
        style={{ padding: "80px 0", textAlign: "center" }}
      >
        <div className="container">
          <div className="divider" style={{ margin: "0 auto 20px" }} />
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#f0faf0",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              marginBottom: "20px",
            }}
          >
            About <span className="gradient-text">Supplyco</span>
          </h1>
          <p
            style={{
              color: "#9ab89a",
              fontSize: "18px",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Kerala State Civil Supplies Corporation Ltd. – Serving communities
            with quality and fairness since 1974.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="divider" style={{ marginBottom: "16px" }} />
              <h2
                style={{
                  fontSize: "36px",
                  color: "#f0faf0",
                  fontFamily: "Outfit, sans-serif",
                  marginBottom: "20px",
                }}
              >
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p
                style={{
                  color: "#9ab89a",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}
              >
                Supplyco is committed to providing the people of Kerala with
                access to quality daily essentials at fair, government-regulated
                prices. We believe that every household deserves nutritious,
                fresh products without compromising on affordability.
              </p>
              <p
                style={{ color: "#9ab89a", fontSize: "16px", lineHeight: 1.8 }}
              >
                From fresh vegetables and fruits to dairy, grains, and personal
                care products – our extensive network of outlets and online
                platform ensures convenience and quality for all.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {[
                { icon: "🏪", title: "500+ Outlets", desc: "Across Kerala" },
                { icon: "👨‍👩‍👧‍👦", title: "50+ Years", desc: "Of Service" },
                { icon: "🥦", title: "1000+ Products", desc: "In Our Range" },
                {
                  icon: "⭐",
                  title: "Govt. Assured",
                  desc: "Quality & Pricing",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="card"
                  style={{ padding: "24px", textAlign: "center" }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {item.icon}
                  </div>
                  <p
                    style={{
                      color: "#f0faf0",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ color: "#6a8a6a", fontSize: "13px" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="divider" style={{ margin: "0 auto 16px" }} />
            <h2
              style={{
                fontSize: "36px",
                color: "#f0faf0",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Our <span className="gradient-text">Core Values</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: "🤝",
                title: "Integrity",
                desc: "Transparent pricing and business practices",
              },
              {
                icon: "🌿",
                title: "Sustainability",
                desc: "Eco-friendly operations and packaging",
              },
              {
                icon: "💎",
                title: "Quality",
                desc: "Uncompromising standards in every product",
              },
              {
                icon: "🤲",
                title: "Community",
                desc: "Supporting local farmers and producers",
              },
            ].map((v) => (
              <div key={v.title} className="card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>
                  {v.icon}
                </div>
                <h3
                  style={{
                    color: "#f0faf0",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: "#6a8a6a",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
