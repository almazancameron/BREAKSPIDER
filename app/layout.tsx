import type { Metadata } from "next";
import { SiteFooter } from "../components/site/site-footer";
import { SiteHeader } from "../components/site/site-header";
import { RouteVisitTracker } from "../components/site/route-visit-tracker";
import { VisitorStateProvider } from "../lib/visitor/visitor-state-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breakspider — a personal web space",
  description: "A personal internet space for software, games, and things worth inspecting.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <VisitorStateProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <RouteVisitTracker />
        </VisitorStateProvider>
      </body>
    </html>
  );
}
