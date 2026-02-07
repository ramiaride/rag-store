import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ragstore.lang";

const translations = {
  en: {
    nav: {
      home: "Home",
      order: "Order",
      about: "About",
      contact: "Contact",
    },
    hero: {
      subtitle: "Unique laser-cut gifts created for meaningful moments.",
    },
    categories: {
      title: "Shop by Category",
      comingSoon: "Coming Soon",
      category: "Category",
      back: "Back to categories",
      subtitle: "Hand-finished pieces ready to ship or customize.",
      productsAria: "{{category}} products",
      valentine: "Valentine",
      personalized: "Personalized",
      "home-decor": "Home Decor",
      jewelry: "Jewelry",
      accessories: "Accessories",
      ramadan: "Ramadan",
      games: "Games",
      "wall-art": "Wall Art",
      kitchen: "Kitchen",
      coffee: "Coffee",
      kids: "Kids",
      lights: "Lights",
      family: "Family",
      friends: "Friends",
      pet: "Pet",
      shops: "Shops",
      storage: "Storage",
      books: "Books",
    },
    product: {
      code: "Code",
      viewDetails: "View details",
      detailsAria: "{{name}} details",
      close: "Close",
      missingDescription: "Description coming soon.",
      fallbackName: "Product",
    },
    about: {
      title: "About",
      heading: "Creative & Meaningful Gifts",
      p1:
        "Rag Store is a new small creative project dedicated to making meaningful and thoughtful gifts, designed for partners, families, friends, and even for yourself. This project was created with a single goal: to bring joy, bring people closer together, and spread happiness throughout the city, through simple objects filled with emotional value.",
      p2: "Products are:",
      li1: "Mostly made by engraving on wood",
      li2: "Produced in a home environment",
      li3: "Carefully finished and detailed",
      p3: "Each piece is unique and made with attention.",
    },
    order: {
      title: "Order",
      howToTitle: "How to Order",
      howToText:
        "To place an order, it is necessary to contact the WhatsApp number +39 331 788 9359 and provide the correct product code (for example: VK1).",
      serviceAreaTitle: "Service Area",
      serviceAreaText:
        "Rag Store is currently a local store operating only in Turin.",
      deliveryIntro: "Different delivery options are available:",
      delivery1: "In-person pickup",
      delivery2: "Home delivery",
      delivery3: "Agreed meeting point",
      deliveryDetails:
        "Delivery details are defined together with the customer at the time of ordering.",
      paymentsTitle: "Payments",
      paymentsText:
        "At the moment, as this is a handmade business in its early stages, the only available payment method is cash. Payment is made at the time of product delivery.",
      importantTitle: "IMPORTANT!",
      importantText:
        "The images of the products shown on the website and on social media are virtual 3D models, created to present an example of the final design.",
      important1: "The colors of the actual product may vary slightly",
      important2:
        "A more detailed 3D model can be requested for free before production",
      important3:
        "In any case, we offer the possibility to cancel the order free of charge even after it has been completed",
      discountsTitle: "Discounts & Coupons",
      discount1:
        "Orders of multiple units of the same product may benefit from quantity-based discounts",
      discount2: "Coupons must be shown at the time of ordering",
      discount3: "Coupons cannot be applied after the order has been placed",
    },
    contact: {
      title: "Contact",
      subtitle: "Let’s talk about your special gift.",
      instagram: "instagram",
      infoAria: "Contact information",
    },
    language: {
      label: "Language",
      english: "EN",
      italian: "IT",
    },
  },
  it: {
    nav: {
      home: "Home",
      order: "Ordina",
      about: "Chi siamo",
      contact: "Contatti",
    },
    hero: {
      subtitle: "Regali artigianali realizzati per momenti speciali",
    },
    categories: {
      title: "Acquista per categoria",
      comingSoon: "In arrivo",
      category: "Categoria",
      back: "Torna alle categorie",
      subtitle: "Pezzi rifiniti a mano, pronti da spedire o personalizzare.",
      productsAria: "Prodotti {{category}}",
      valentine: "San Valentino",
      personalized: "Personalizzati",
      "home-decor": "Decorazioni casa",
      jewelry: "Gioielli",
      accessories: "Accessori",
      ramadan: "Ramadan",
      games: "Giochi",
      "wall-art": "Quadri e pareti",
      kitchen: "Cucina",
      coffee: "Caffè",
      kids: "Bambini",
      lights: "Luci",
      family: "Famiglia",
      friends: "Amici",
      pet: "Animali",
      shops: "Negozi",
      storage: "Organizzazione",
      books: "Libri",
    },
    product: {
      code: "Codice",
      viewDetails: "Vedi dettagli",
      detailsAria: "Dettagli di {{name}}",
      close: "Chiudi",
      missingDescription: "Descrizione in arrivo.",
      fallbackName: "Prodotto",
    },
    about: {
      title: "Chi siamo",
      heading: "Regali creativi e significativi",
      p1:
        "Rag Store è un nuovo piccolo progetto creativo dedicato a realizzare regali significativi e pensati, progettati per partner, famiglie, amici e anche per te stesso. Questo progetto è nato con un unico obiettivo: portare gioia, avvicinare le persone e diffondere felicità in città, attraverso oggetti semplici ma ricchi di valore emotivo.",
      p2: "I prodotti sono:",
      li1: "Per lo più realizzati incidendo su legno",
      li2: "Prodotti in un ambiente domestico",
      li3: "Rifiniti con cura e attenzione ai dettagli",
      p3: "Ogni pezzo è unico e realizzato con attenzione.",
    },
    order: {
      title: "Ordina",
      howToTitle: "Come ordinare",
      howToText:
        "Per effettuare un ordine è necessario contattare il numero WhatsApp +39 331 788 9359 e fornire il codice corretto del prodotto (ad esempio: VK1).",
      serviceAreaTitle: "Area di servizio",
      serviceAreaText:
        "Rag Store è attualmente un negozio locale che opera solo a Torino.",
      deliveryIntro: "Sono disponibili diverse opzioni di consegna:",
      delivery1: "Ritiro di persona",
      delivery2: "Consegna a domicilio",
      delivery3: "Punto d’incontro concordato",
      deliveryDetails:
        "I dettagli della consegna vengono definiti insieme al cliente al momento dell’ordine.",
      paymentsTitle: "Pagamenti",
      paymentsText:
        "Al momento, essendo un’attività artigianale agli inizi, l’unico metodo di pagamento disponibile è in contanti. Il pagamento avviene al momento della consegna del prodotto.",
      importantTitle: "IMPORTANTE!",
      importantText:
        "Le immagini dei prodotti mostrate sul sito e sui social media sono modelli 3D virtuali, creati per presentare un esempio del design finale.",
      important1: "I colori del prodotto reale possono variare leggermente",
      important2:
        "È possibile richiedere gratuitamente un modello 3D più dettagliato prima della produzione",
      important3:
        "In ogni caso, offriamo la possibilità di annullare l’ordine gratuitamente anche dopo il completamento",
      discountsTitle: "Sconti e coupon",
      discount1:
        "Ordini di più unità dello stesso prodotto possono beneficiare di sconti in base alla quantità",
      discount2: "I coupon devono essere mostrati al momento dell’ordine",
      discount3:
        "I coupon non possono essere applicati dopo che l’ordine è stato effettuato",
    },
    contact: {
      title: "Contatti",
      subtitle: "Parliamo del tuo regalo speciale.",
      instagram: "instagram",
      infoAria: "Informazioni di contatto",
    },
    language: {
      label: "Lingua",
      english: "EN",
      italian: "IT",
    },
  },
};

function safeReadStoredLang() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "it" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

function getDefaultLang() {
  const stored = safeReadStoredLang();
  if (stored) return stored;
  const browserLang =
    typeof navigator !== "undefined" ? navigator.language || "" : "";
  return browserLang.toLowerCase().startsWith("it") ? "it" : "en";
}

function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : "",
  );
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getDefaultLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      const value =
        getNested(translations[lang], key) ?? getNested(translations.en, key);
      if (typeof value !== "string") return key;
      return interpolate(value, vars);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
