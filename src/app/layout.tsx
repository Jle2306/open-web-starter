import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = { title: { default: "Open Web Starter", template: "%s | Open Web Starter" }, description: "Reusable Next.js starters for real-world web applications.", icons: { icon: "/mark.svg" } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>
    <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    <header className="border-b border-slate-200 bg-white"><nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
      <Link href="/" className="text-lg font-bold tracking-tight">Open Web Starter</Link>
      <div className="flex gap-5 text-sm"><Link href="/starters/">Starters</Link><Link href="/docs/">Documentation</Link><a href="https://github.com/Jle2306/open-web-starter">GitHub</a></div>
    </nav></header><main id="main" className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    <footer className="mx-auto max-w-6xl border-t border-slate-200 px-6 py-8 text-sm text-slate-600">MIT licensed · Maintained by Jle2306 · Examples, not production-ready systems.</footer>
  </body></html>;
}
