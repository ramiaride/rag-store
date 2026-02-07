import React from "react";
import "./CategoryPage.css";
import ProductCard from "./ProductCard";
import { useI18n } from "../i18n";

export default function CategoryPage({ category, products, onBack }) {
  const { t } = useI18n();
  const categoryLabel = t(`categories.${category.id}`);

  return (
    <section
      className="category-page"
      aria-label={t("categories.productsAria", { category: categoryLabel })}
    >
      <div className="category-hero">
        <button className="back-button" type="button" onClick={onBack}>
          {t("categories.back")}
        </button>
        <div className="category-title-wrap">
          <p className="category-kicker">{t("categories.category")}</p>
          <h2 className="category-title">{categoryLabel}</h2>
          <p className="category-subtitle">{t("categories.subtitle")}</p>
        </div>
      </div>

      <div className="category-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

