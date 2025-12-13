import "./globals.css";
import { ReactNode } from "react";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "11evnai",
  description: "Multimodal AI platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NavBar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
