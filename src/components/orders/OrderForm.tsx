"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export type Product = { id: string; name: string; priceCents: number };
export type OrderDraft = { name: string; email: string; items: { productId: string; quantity: number }[] };

/** Adapts the original private-order cart/add-product/contact collection flow. */
export function OrderForm({ products, onSubmit }: { products: readonly Product[]; onSubmit: (draft: OrderDraft) => Promise<string> }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const total = products.reduce((sum, product) => sum + product.priceCents * (quantities[product.id] ?? 0), 0);
  const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const items = products.filter((product) => quantities[product.id] > 0).map((product) => ({ productId: product.id, quantity: quantities[product.id] }));
    if (!items.length) { setMessage("Add at least one product."); return; }
    if (!name.trim() || name.trim().length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setMessage("Enter a name and valid email address."); return; }
    setPending(true);setMessage("");
    try { setMessage(await onSubmit({ name: name.trim(), email: email.trim(), items }));setQuantities({});setName("");setEmail(""); }
    catch { setMessage("Could not submit. Your entries have been kept so you can retry."); }
    finally { setPending(false); }
  }
  return <div className="grid items-start gap-6 lg:grid-cols-2"><Card><h2 className="text-2xl font-semibold">Example products</h2><div className="mt-6 grid gap-5">{products.map((product) => <div key={product.id} className="rounded-lg border border-slate-200 p-4"><h3 className="font-semibold">{product.name}</h3><p className="my-3 text-sm">{money(product.priceCents)} · example price</p><label>Quantity for {product.name}<input type="number" min={0} max={99} step={1} value={quantities[product.id] ?? 0} disabled={pending} onChange={(event) => { const value = Number(event.target.value); setQuantities((current) => ({ ...current, [product.id]: Number.isFinite(value) ? Math.max(0, Math.min(99, Math.trunc(value))) : 0 })); setMessage(""); }} /></label></div>)}</div></Card>
    <Card><h2 className="text-2xl font-semibold">Request summary</h2><p className="my-5 text-2xl font-semibold">Estimated total: {money(total)}</p><p className="mb-6 text-sm leading-6 text-slate-600">Prices are presentation-only. A real backend must calculate authoritative prices and inventory. No payment is taken.</p>
      <form onSubmit={submit} noValidate><fieldset disabled={pending} className="grid gap-5"><label>Name<input required maxLength={100} autoComplete="name" value={name} onChange={(event) => { setName(event.target.value);setMessage(""); }} /></label><label>Email<input type="email" required maxLength={254} autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value);setMessage(""); }} /></label><Button type="submit">{pending ? "Submitting…" : "Submit demo order"}</Button></fieldset><p role="status" aria-live="polite" className="mt-5 text-sm leading-6">{message}</p></form>
    </Card></div>;
}
