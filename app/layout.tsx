"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: any) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const s = localStorage.getItem("11evnai_settings");
    const parsed = s ? JSON.parse(s) : {};
    const dark = parsed.darkMode ?? false;

    setTheme(dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  return (
    <html lang="en" className={theme}>
      <body className={`${inter.className} page-transition`}>
        {children}
      </body>
    </html>
  );
}
