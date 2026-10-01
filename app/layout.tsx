/**
 * The real root layout (with <html lang dir>) is app/[locale]/layout.tsx, because the
 * language is part of the URL. This pass-through exists so app/not-found.tsx can render
 * a 404 for URLs outside /ar and /en.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
