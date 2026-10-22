import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
export default function Starters() { return <><h1 className="text-4xl font-bold">Starters</h1><p className="mb-8 mt-5 text-slate-600">Runnable examples with explicit limitations. No production readiness or adoption claims.</p><Card><h2 className="text-2xl font-semibold">Booking Starter</h2><p className="my-4">Configurable services, calendar-date validation, sample availability and optional Supabase submission.</p><Button href="/starters/booking/">Open booking example</Button></Card></>; }
