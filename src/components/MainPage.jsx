import React, { useEffect, useMemo, useState } from "react";
import "./MainPage.css";
import logo from "../Assets/rag trans.png";
import allProducts from "../products/allProducts";
import { useI18n } from "../i18n";

import CategoryPage from "./CategoryPage";
import AboutPage from "./AboutPage";
import OrderPage from "./OrderPage";
import ContactPage from "./ContactPage";

export default function MainPage() {
  const { lang, setLang, t } = useI18n();

  const categories = useMemo(
    () => [
      { id: "valentine", className: "valentine" },
      {
        id: "personalized",
        className: "personalized",
      },
      {
        id: "home-decor",
        className: "home-decor",
        disabled: true,
      },
      { id: "jewelry", className: "jewelry", disabled: true },
      { id: "accessories", className: "accessories" },
      { id: "ramadan", className: "ramadan" },
      { id: "games", className: "games", disabled: true },
      {
        id: "wall-art",
        className: "wall-art",
        disabled: true,
      },
      { id: "kitchen", className: "kitchen", disabled: true },
      { id: "coffee", className: "coffee", disabled: true },
      { id: "kids", className: "kids" },
      { id: "lights", className: "lights" },
      { id: "family", className: "family", disabled: true },
      { id: "friends", className: "friends", disabled: true },
      { id: "pet", className: "pet", disabled: true },
      { id: "shops", className: "shops", disabled: true },
      { id: "storage", className: "storage", disabled: true },
      { id: "books", className: "books", disabled: true },
    ],
    [],
  );

  const products = allProducts;

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) {
        setActiveCategory(null);
        setActiveView("home");
        return;
      }
      if (hash === "about") {
        setActiveCategory(null);
        setActiveView("about");
        return;
      }
      if (hash === "order") {
        setActiveCategory(null);
        setActiveView("order");
        return;
      }
      if (hash === "contact") {
        setActiveCategory(null);
        setActiveView("contact");
        return;
      }
      const category = categories.find((item) => item.id === hash);
      if (category) {
        setActiveCategory(category);
        setActiveView("category");
        return;
      }
      setActiveCategory(null);
      setActiveView("home");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [categories]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setActiveView("category");
    window.location.hash = category.id;
  };

  const handleBack = () => {
    setActiveCategory(null);
    setActiveView("home");
    window.location.hash = "";
  };

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.filter(
      (product) => product.categoryId === activeCategory.id,
    );
  }, [activeCategory, products]);

  return (
    <div className="main-page">
      <header className="topbar">
        <div className="logo" aria-label="RAG Store">
          <img src={logo} alt="RAG Store logo" className="logo-img" />
        </div>

        <nav className="nav">
          <a href="#">{t("nav.home")}</a>
          <a href="#order">{t("nav.order")}</a>
          <a href="#about">{t("nav.about")}</a>
          <a href="#contact">{t("nav.contact")}</a>
        </nav>

        <div className="actions">
          <div
            className="lang-toggle"
            role="group"
            aria-label={t("language.label")}
          >
            <button
              type="button"
              className={`lang-btn${lang === "en" ? " active" : ""}`}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              {t("language.english")}
            </button>
            <button
              type="button"
              className={`lang-btn${lang === "it" ? " active" : ""}`}
              aria-pressed={lang === "it"}
              onClick={() => setLang("it")}
            >
              {t("language.italian")}
            </button>
          </div>
        </div>
      </header>

      {activeView === "about" ? (
        <AboutPage />
      ) : activeView === "order" ? (
        <OrderPage />
      ) : activeView === "contact" ? (
        <ContactPage />
      ) : activeCategory ? (
        <CategoryPage
          category={activeCategory}
          products={filteredProducts}
          onBack={handleBack}
        />
      ) : (
        <>
          <main className="hero">
            <div className="hero-inner">
              <h1 className="hero-title">
                RAG <span className="store">Store</span>
              </h1>
              <p className="hero-sub">{t("hero.subtitle")}</p>
            </div>
          </main>

          <section
            className="categories-section"
            aria-label={t("categories.title")}
          >
            <div className="categories-container">
              <h2 className="section-title">{t("categories.title")}</h2>
              <div className="categories-grid">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-card ${category.className}${
                      category.disabled ? " disabled" : ""
                    }`}
                    onClick={() =>
                      category.disabled ? null : handleCategorySelect(category)
                    }
                    disabled={category.disabled}
                  >
                    {t(`categories.${category.id}`)}
                    {category.disabled ? (
                      <span className="category-overlay">
                        {t("categories.comingSoon")}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeView === "home" && !activeCategory ? (
        <footer className="bottom-bar" aria-label={t("contact.infoAria")}>
          <div className="bottom-bar-inner">
            <span className="bottom-item">+39 331 788 9359</span>
            <span className="bottom-separator" aria-hidden="true" />
            <span className="bottom-item">ragifts2026@gmail.com</span>
            <span className="bottom-separator" aria-hidden="true" />
            <a
              className="bottom-link"
              href="https://www.instagram.com/gift.for.you.26?igsh=MTY5cTF0Y3llOXhjdQ=="
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.instagram")}
            </a>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
