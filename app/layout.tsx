import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "11evnai",
  description: "Multimodal AI platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
