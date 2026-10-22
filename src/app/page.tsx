import { Button } from "@/components/ui/Button";
export default function Home() { return <section className="py-12 sm:py-20">
  <p className="text-sm font-semibold uppercase tracking-widest text-cyan-800">Open source · Next.js · TypeScript</p>
  <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">Open Web Starter</h1>
  <p className="mt-6 max-w-3xl text-2xl leading-relaxed">Reusable Next.js starters for real-world web applications.</p>
  <p className="mt-5 max-w-2xl leading-8 text-slate-600">Practical open-source examples for booking systems, lightweight CRM, order collection, creator websites and small-business applications.</p>
  <div className="mt-8 flex flex-wrap gap-3"><Button href="/starters/">View Starters</Button><Button href="https://github.com/Jle2306/open-web-starter" variant="secondary">GitHub</Button><Button href="/docs/" variant="ghost">Documentation</Button></div>
  <div className="mt-14 rounded-xl bg-slate-950 p-6 text-slate-100"><p className="text-sm text-cyan-200">Start locally with Node.js 24</p><pre className="mt-4 overflow-x-auto text-sm">{`npm ci
npm run dev`}</pre></div>
</section>; }
