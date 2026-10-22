import { ExampleNotice } from "@/components/ExampleNotice";
import { CreatorProfile } from "@/components/landing/CreatorProfile";
import { creator } from "@/data/landing";
export default function PersonalBrandPage() { return <><ExampleNotice>A fictional creator profile with reusable sections. No client testimonials or adoption metrics.</ExampleNotice><h1 className="mb-6 text-xl font-semibold">Personal Brand Starter</h1><CreatorProfile creator={creator} /></>; }
