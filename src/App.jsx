import React from "react";
import MainPage from "./components/MainPage";
import { I18nProvider } from "./i18n";

export default function App() {
  return (
    <I18nProvider>
      <MainPage />
    </I18nProvider>
  );
}
