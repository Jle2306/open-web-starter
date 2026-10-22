"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type DemoRecord = { id: string; name: string; detail: string; source: string; status: string; note: string };

/** Extracts the original CRM filters/detail panel and booking-admin status table. */
export function RecordManager({ initialRecords, statuses, title }: {
  initialRecords: readonly DemoRecord[];
  statuses: readonly string[];
  title: string;
}) {
  const [records, setRecords] = useState(() => initialRecords.map((item) => ({ ...item })));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(initialRecords[0]?.id ?? null);
  const selected = records.find((item) => item.id === selectedId);
  const sources = Array.from(new Set(records.map((item) => item.source)));
  const visible = useMemo(() => records.filter((item) =>
    (status === "all" || item.status === status) && (source === "all" || item.source === source) &&
    `${item.name} ${item.detail}`.toLowerCase().includes(query.trim().toLowerCase())), [records, query, status, source]);

  function update(id: string, fields: Partial<Pick<DemoRecord, "status" | "note">>) {
    setRecords((current) => current.map((item) => item.id === id ? { ...item, ...fields } : item));
  }

  return <>
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Record summary">
      <Card><p className="text-sm text-slate-600">Total records</p><p className="mt-2 text-3xl font-semibold">{records.length}</p></Card>
      {statuses.map((value) => <Card key={value}><p className="text-sm text-slate-600">{value}</p><p className="mt-2 text-3xl font-semibold">{records.filter((item) => item.status === value).length}</p></Card>)}
    </div>
    <div className="grid items-start gap-6 xl:grid-cols-[1.6fr_1fr]">
      <Card><h2 className="text-2xl font-semibold">{title}</h2>
        <div className="my-5 grid gap-3 sm:grid-cols-3">
          <label>Search records<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label>Filter status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label>Filter source<select value={source} onChange={(event) => setSource(event.target.value)}><option value="all">All sources</option>{sources.map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <p role="status" className="mb-3 text-sm text-slate-600">{visible.length} matching records</p>
        <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm">
          <caption className="sr-only">{title}; all records are synthetic examples</caption>
          <thead><tr>{["Name", "Source", "Status", "Details"].map((heading) => <th scope="col" key={heading} className="border-b p-3">{heading}</th>)}</tr></thead>
          <tbody>{visible.map((record) => <tr key={record.id} className="border-b border-slate-100"><td className="p-3 font-medium">{record.name}</td><td className="p-3">{record.source}</td><td className="p-3">{record.status}</td><td className="p-3"><button className="min-h-11 text-cyan-800 underline" onClick={() => setSelectedId(record.id)} aria-label={`View ${record.name}`}>View</button></td></tr>)}</tbody>
        </table></div>
        {visible.length === 0 && <p className="py-8 text-center text-slate-600">No records match. Clear the search or filters.</p>}
      </Card>
      <Card><h2 className="text-2xl font-semibold">Record details</h2>
        {selected ? <div className="mt-5 grid gap-5"><p className="font-semibold">{selected.name}</p><p className="text-sm leading-6 text-slate-600">{selected.detail}</p>
          <label>Record status<select value={selected.status} onChange={(event) => update(selected.id, { status: event.target.value })}>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label>Notes<textarea rows={4} maxLength={1000} value={selected.note} onChange={(event) => update(selected.id, { note: event.target.value })} /></label>
          <p className="text-sm text-slate-600">Changes are in memory only and reset when you leave or reload. This panel may show a record outside the current filter.</p>
        </div> : <p className="mt-5">Select a record to view its details.</p>}
        <Button className="mt-5" variant="secondary" onClick={() => { setRecords(initialRecords.map((item) => ({ ...item }))); setQuery(""); setStatus("all"); setSource("all"); setSelectedId(initialRecords[0]?.id ?? null); }}>Reset demo</Button>
      </Card>
    </div>
  </>;
}
