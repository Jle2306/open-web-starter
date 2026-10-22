import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type Course = { title: string; description: string; audience: string; modules: readonly string[]; outcomes: readonly string[] };

/** Outline, outcomes and action section adapted from the course-landing demo. */
export function CourseLanding({ course }: { course: Course }) {
  return <><section className="rounded-2xl border-2 border-slate-900 bg-yellow-100 p-6 sm:p-10"><p className="text-sm font-semibold uppercase tracking-widest">Fictional course example</p><h2 className="mt-5 text-4xl font-bold sm:text-5xl">{course.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8">{course.description}</p><p className="mt-4 text-sm">For: {course.audience}</p><Button className="mt-6" href="#outline">View course outline</Button></section>
    <div className="mt-8 grid gap-6 md:grid-cols-2"><Card><h2 id="outline" className="text-2xl font-semibold">Course outline</h2><ol className="mt-5 list-inside list-decimal space-y-4">{course.modules.map((module) => <li key={module}>{module}</li>)}</ol></Card><Card><h2 className="text-2xl font-semibold">Example learning goals</h2><ul className="mt-5 list-inside list-disc space-y-4">{course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><p className="mt-6 text-sm leading-6 text-slate-600">No enrollment, payment, testimonials or learner statistics are included. Connect a real registration workflow before using this layout for a course.</p></Card></div>
  </>;
}
