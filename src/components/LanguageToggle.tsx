"use client";

import { useLang } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-16 z-50 h-10 px-3 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium"
      aria-label="Toggle language"
    >
      {lang === "en" ? "한국어" : "EN"}
    </button>
  );
}
