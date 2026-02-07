import React from "react";
import "./OrderPage.css";
import orderImage from "../Assets/Order.jpg";
import { useI18n } from "../i18n";

export default function OrderPage() {
  const { t } = useI18n();

  return (
    <section className="order-page" aria-label={t("order.title")}>
      <div className="order-media" aria-hidden="true">
        <img src={orderImage} alt="" className="order-image" />
      </div>
      <div className="order-content">
        <h1 className="order-title">{t("order.title")}</h1>
        <div className="order-card">
          <h2 className="order-heading">{t("order.howToTitle")}</h2>
          <p className="order-paragraph">{t("order.howToText")}</p>

          <h3 className="order-subheading">{t("order.serviceAreaTitle")}</h3>
          <p className="order-paragraph">{t("order.serviceAreaText")}</p>
          <p className="order-paragraph">{t("order.deliveryIntro")}</p>
          <ul className="order-list">
            <li>{t("order.delivery1")}</li>
            <li>{t("order.delivery2")}</li>
            <li>{t("order.delivery3")}</li>
          </ul>
          <p className="order-paragraph">{t("order.deliveryDetails")}</p>

          <h3 className="order-subheading">{t("order.paymentsTitle")}</h3>
          <p className="order-paragraph">{t("order.paymentsText")}</p>

          <h3 className="order-subheading important">
            {t("order.importantTitle")}
          </h3>
          <p className="order-paragraph">{t("order.importantText")}</p>
          <ul className="order-list">
            <li>{t("order.important1")}</li>
            <li>{t("order.important2")}</li>
            <li>{t("order.important3")}</li>
          </ul>

          <h3 className="order-subheading">{t("order.discountsTitle")}</h3>
          <ul className="order-list">
            <li>{t("order.discount1")}</li>
            <li>{t("order.discount2")}</li>
            <li>{t("order.discount3")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

