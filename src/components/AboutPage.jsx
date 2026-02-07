import React from "react";
import "./AboutPage.css";
import aboutImage from "../Assets/about3.jpg";
import { useI18n } from "../i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <section className="about-page" aria-label={t("about.title")}>
      <div className="about-media" aria-hidden="true">
        <img src={aboutImage} alt="" className="about-image" />
      </div>
      <div className="about-content">
        <h1 className="about-title">{t("about.title")}</h1>
        <div className="about-card">
          <h2 className="about-heading">{t("about.heading")}</h2>
          <p className="about-paragraph">{t("about.p1")}</p>
          <p className="about-paragraph">{t("about.p2")}</p>
          <ul className="about-list">
            <li>{t("about.li1")}</li>
            <li>{t("about.li2")}</li>
            <li>{t("about.li3")}</li>
          </ul>
          <p className="about-paragraph">{t("about.p3")}</p>
        </div>
      </div>
    </section>
  );
}

