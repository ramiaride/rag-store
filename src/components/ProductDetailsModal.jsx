import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ProductDetailsModal.css";
import { useI18n } from "../i18n";

export default function ProductDetailsModal({ product, open, onClose }) {
  const { lang, t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const localizedDescription =
    lang === "it" ? product?.details?.description_it : null;
  const rawDescription = localizedDescription ?? product?.details?.description;

  const description = rawDescription?.trim()
    ? rawDescription.trim()
    : t("product.missingDescription");

  const displayDescription = description
    .replace(/\bItem quantity\s*:\s*/gi, "Pieces: ")
    .replace(/\bQuantità articolo\s*:\s*/gi, "Pezzi: ");

  const name = product?.name ?? t("product.fallbackName");

  return createPortal(
    <div
      className="product-modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t("product.detailsAria", { name })}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="product-modal-close"
          onClick={onClose}
          aria-label={t("product.close")}
        >
          ×
        </button>

        <div className="product-modal-inner">
          <div className="product-modal-media">
            <div
              className="product-modal-image"
              style={{ backgroundImage: product?.image }}
              role="img"
              aria-label={name}
            />
          </div>

          <div className="product-modal-content">
            <div className="product-modal-header">
              <h2 className="product-modal-title">{name}</h2>
            </div>

            <p className="product-modal-code">
              {t("product.code")}: {product?.code}
            </p>
            <p className="product-modal-description">{displayDescription}</p>
            <div className="product-modal-footer">
              <span className="product-modal-price">{product?.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
