import { ExampleNotice } from "@/components/ExampleNotice";
import { RecordManager } from "@/components/admin/RecordManager";
import { leads, leadStatuses } from "@/data/records";

export default function CrmPage() {
  return <><ExampleNotice>Fictional leads and in-memory updates only. No authentication, synchronization or database persistence.</ExampleNotice><h1 className="text-4xl font-bold">Lightweight CRM Starter</h1><p className="mb-8 mt-4 text-slate-600">Search leads, filter by source and status, and edit the selected record.</p><RecordManager title="Customer leads" initialRecords={leads} statuses={leadStatuses} /></>;
}
