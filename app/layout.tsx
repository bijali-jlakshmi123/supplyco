import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";

export const metadata: Metadata = {
  title: "Supplyco Supermarket – Fresh Groceries Delivered to Your Door",
  description:
    "Kerala's trusted online supermarket. Shop fresh vegetables, fruits, dairy, and daily essentials at the best prices. Fast delivery, quality guaranteed.",
  keywords:
    "supplyco, supermarket, online grocery, Kerala, fresh vegetables, fruits, daily needs",
  openGraph: {
    title: "Supplyco Supermarket",
    description: "Kerala's trusted online supermarket",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#182218",
              color: "#f0faf0",
              border: "1px solid rgba(0,166,81,0.3)",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: { primary: "#00a651", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ff6b6b", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
