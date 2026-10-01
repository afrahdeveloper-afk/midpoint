import "./globals.css";
import "./body-fonts.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fontVars } from "./fonts";

export const metadata: Metadata = { title: "404 — Midpoint", robots: { index: false } };

/** 404 for URLs outside /ar and /en (rendered without the locale layout, so it brings its own <html>). */
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={fontVars}>
      <body className="loaded">
        <main id="main">
          <section className="sec contact" style={{ minHeight: "100svh", display: "grid", alignContent: "center" }}>
            <div className="sec-head">
              <div>
                <p className="kicker">404</p>
                <h2>الصفحة غير موجودة</h2>
                <h2 lang="en" style={{ marginTop: 12 }}>Page not found</h2>
              </div>
            </div>
            <div className="btns">
              <Link className="btn solid" href="/ar">الرئيسية</Link>
              <Link className="btn ghost" href="/en" lang="en">Home</Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
