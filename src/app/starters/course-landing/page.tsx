import { ExampleNotice } from "@/components/ExampleNotice";
import { CourseLanding } from "@/components/landing/CourseLanding";
import { course } from "@/data/landing";
export default function CoursePage() { return <><ExampleNotice>Presentation-only course layout. No registration or payment is processed.</ExampleNotice><h1 className="mb-6 text-xl font-semibold">Course Landing Starter</h1><CourseLanding course={course} /></>; }
