import { ExampleNotice } from "@/components/ExampleNotice";
import { RecordManager } from "@/components/admin/RecordManager";
import { requests, requestStatuses } from "@/data/records";

export default function AdminPage() {
  return <><ExampleNotice>UI patterns with synthetic records. This page has no access control and never loads submitted bookings or orders.</ExampleNotice><h1 className="text-4xl font-bold">Admin Dashboard Starter</h1><p className="mb-8 mt-4 text-slate-600">Derived summary cards, record filters and status editing for small applications.</p><RecordManager title="Example requests" initialRecords={requests} statuses={requestStatuses} /></>;
}
