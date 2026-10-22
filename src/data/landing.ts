import type { Creator } from "@/components/landing/CreatorProfile";
import type { Course } from "@/components/landing/CourseLanding";

export const creator: Creator = {
  name: "Alex Example",
  role: "Fictional independent developer",
  introduction: "A configurable personal site for presenting interests and projects. Replace this fictional profile with your own accurate information.",
  skills: ["Accessible interfaces", "TypeScript applications", "Small-business workflows"],
  projects: [
    { title: "Appointment example", description: "A configurable service selection and request form.", href: "/starters/booking/" },
    { title: "Lead management example", description: "A small interactive dashboard using synthetic records.", href: "/starters/crm/" },
  ],
};
export const course: Course = {
  title: "Build your first practical web workflow",
  description: "A course landing layout with an outline and learning goals, ready to adapt for a course, community or digital product.",
  audience: "Students and independent developers",
  modules: ["Define a small user workflow", "Build an accessible form", "Validate inputs and show feedback", "Document and deploy a static example"],
  outcomes: ["Understand client-side validation boundaries", "Build a responsive interface", "Explain production requirements honestly"],
};
