import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { starters } from "@/data/starters";
export default function Starters() { return <><h1 className="text-4xl font-bold">Starters</h1><p className="mb-8 mt-5 text-slate-600">Runnable examples with explicit limitations. No production readiness or adoption claims.</p><div className="grid gap-6 md:grid-cols-2">{starters.map((starter) => <Card key={starter.href}><p className="text-xs font-semibold uppercase tracking-wider text-cyan-800">{starter.mode}</p><h2 className="mt-3 text-2xl font-semibold">{starter.title}</h2><p className="my-4 leading-7 text-slate-600">{starter.description}</p><Button href={starter.href}>Open {starter.title}</Button></Card>)}</div></>; }
