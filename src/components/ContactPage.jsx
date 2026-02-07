import React from "react";
import "./ContactPage.css";
import contactImage from "../Assets/contact.png";
import { useI18n } from "../i18n";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <section className="contact-page" aria-label={t("contact.title")}>
      <div className="contact-card">
        <div className="ribbon-vertical" aria-hidden="true" />
        <div className="ribbon-horizontal" aria-hidden="true" />
        <img
          src={contactImage}
          alt=""
          className="contact-corner-image"
          aria-hidden="true"
        />
        <div className="contact-header">
          <div>
            <h1 className="contact-title">{t("contact.title")}</h1>
            <p className="contact-subtitle">{t("contact.subtitle")}</p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-value">+39 331 788 9359</span>
          </div>
          <div className="contact-item">
            <span className="contact-value">ragifts2026@gmail.com</span>
          </div>
          <div className="contact-item">
            <a
              className="contact-link"
              href="https://www.instagram.com/gift.for.you.26/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.instagram")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
