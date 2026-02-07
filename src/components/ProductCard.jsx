import React, { useState } from "react";
import "./ProductCard.css";
import ProductDetailsModal from "./ProductDetailsModal";
import { useI18n } from "../i18n";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <article className="product-card">
      <div
        className="product-image"
        style={{ backgroundImage: product.image }}
        role="img"
        aria-label={product.name}
      />
      <div className="product-body">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">{product.price}</span>
        </div>
        <p className="product-meta">
          {t("product.code")}: {product.code}
          <button
            className="product-action ghost"
            type="button"
            onClick={() => setOpen(true)}
          >
            {t("product.viewDetails")}
          </button>
        </p>
      </div>

      <ProductDetailsModal
        product={product}
        open={open}
        onClose={() => setOpen(false)}
      />
    </article>
  );
}

