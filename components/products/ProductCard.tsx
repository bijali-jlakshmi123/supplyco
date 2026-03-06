"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { formatCurrency, calculateDiscount } from "@/lib/utils";
import { useCartStore, CartProduct } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";

interface Product {
  id: string | number;
  documentId?: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: any; // Can be string[] or Strapi media object
  unit: string;
  stock: number;
  category?: { name: string } | any;
  brand?: string | null;
  discount?: number | null;
  reviews?: { rating: number }[] | any;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [adding, setAdding] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : product.discount || 0;

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const avgRating = reviews.length
    ? reviews.reduce((s: number, r: any) => s + (r.rating || 0), 0) /
      reviews.length
    : 4.2;

  // Handle Strapi images format (it could be an array of objects with url property)
  const productImages = Array.isArray(product.images)
    ? product.images.map((img: any) =>
        typeof img === "string" ? img : img.url || img.attributes?.url,
      )
    : [];

  const cartProduct: CartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    comparePrice: product.comparePrice,
    images: productImages,
    unit: product.unit,
    stock: product.stock,
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    setAdding(true);
    addItem(cartProduct);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        comparePrice: product.comparePrice,
        images: product.images,
        unit: product.unit,
        stock: product.stock,
        slug: product.slug,
      });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div className="product-card" style={{ cursor: "pointer" }}>
      <Link
        href={`/product/${product.slug}`}
        style={{ textDecoration: "none" }}
      >
        {/* Image */}
        <div
          className="product-image"
          style={{ height: "200px", position: "relative" }}
        >
          {productImages?.[0] ? (
            <img
              src={productImages[0]}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1e2a1e",
                fontSize: "60px",
              }}
            >
              🛒
            </div>
          )}

          {/* Badges */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {discount > 0 && (
              <span className="badge badge-red">-{discount}%</span>
            )}
            {product.stock === 0 && (
              <span
                className="badge"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Out of Stock
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="badge badge-orange">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <button
              onClick={handleWishlist}
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(17, 24, 17, 0.9)",
                border: "1px solid rgba(0,166,81,0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: isWishlisted ? "#ff6b6b" : "#9ab89a",
                transition: "all 0.2s",
              }}
            >
              <Heart size={15} fill={isWishlisted ? "#ff6b6b" : "none"} />
            </button>
          </div>

          {/* Quick Add overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              padding: "12px",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
            className="quick-add-overlay"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "white",
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              <Eye size={14} /> Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px" }}>
          {product.category && (
            <p
              style={{
                color: "#00a651",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              {typeof product.category === "string"
                ? product.category
                : product.category.name || product.category.attributes?.name}
            </p>
          )}
          <h3
            style={{
              color: "#f0faf0",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "6px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "10px",
            }}
          >
            <Star size={13} fill="#ffd700" color="#ffd700" />
            <span
              style={{ color: "#ffd700", fontSize: "13px", fontWeight: 500 }}
            >
              {avgRating.toFixed(1)}
            </span>
            <span style={{ color: "#6a8a6a", fontSize: "12px" }}>
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Price & Add Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="price-current">
                {formatCurrency(product.price)}
              </div>
              {product.comparePrice && product.comparePrice > product.price && (
                <div className="price-original">
                  {formatCurrency(product.comparePrice)}
                </div>
              )}
              <div style={{ color: "#6a8a6a", fontSize: "12px" }}>
                {product.unit}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
              style={{
                width: "40px",
                height: "40px",
                background:
                  product.stock === 0
                    ? "rgba(255,255,255,0.05)"
                    : "linear-gradient(135deg, #00a651, #007a3d)",
                border: "none",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: product.stock === 0 ? "not-allowed" : "pointer",
                color: "white",
                transition: "all 0.3s",
                transform: adding ? "scale(0.9)" : "scale(1)",
              }}
            >
              {adding ? (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin-slow 0.6s linear infinite",
                  }}
                />
              ) : (
                <Plus size={18} />
              )}
            </button>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .product-card:hover .quick-add-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
