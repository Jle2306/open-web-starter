"use client";
import { ExampleNotice } from "@/components/ExampleNotice";
import { OrderForm } from "@/components/orders/OrderForm";
import { products } from "@/data/products";
export default function OrderPage() { return <><ExampleNotice>This local order example does not send, save or charge anything. Products and prices are fictional.</ExampleNotice><h1 className="text-4xl font-bold">Order Collection Starter</h1><p className="mb-8 mt-4 text-slate-600">Select quantities and validate customer information with an injectable submission callback.</p><OrderForm products={products} onSubmit={async () => "Demo complete. Nothing was sent or saved; no order was placed and no payment was taken."} /></>; }
