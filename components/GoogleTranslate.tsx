"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

function googleTranslateElementInit() {
  new window.google.translate.TranslateElement(
    { pageLanguage: "auto", includedLanguages },
    "google_translate_element"
  );
}

export function GoogleTranslate({
  prefLangCookie,
}: {
  prefLangCookie: string;
}) {
  const [langCookie, setLangCookie] = useState(
    decodeURIComponent(prefLangCookie)
  );

  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value: string) => {
    const lang = `/en/${value}`;
    setLangCookie(lang);
    const element = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      ></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}

function LanguageSelector({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  const langCookie = value.split("/")[2];
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={langCookie}
      className="ml-2 p-1 text-sm bg-transparent border border-gray-300 rounded-md dark:bg-neutral-800 dark:text-white dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ height: "30px" }}
    >
      {languages.map((it) => (
        <option
          value={it.value}
          key={it.value}
          className="bg-white text-black dark:bg-neutral-800 dark:text-white"
        >
          {it.label}
        </option>
      ))}
    </select>
  );
}
