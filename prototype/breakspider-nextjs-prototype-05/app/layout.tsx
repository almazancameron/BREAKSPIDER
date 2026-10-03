import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breakspider / Prototype 05",
  description: "A personal internet space for software, games, and things worth inspecting.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
