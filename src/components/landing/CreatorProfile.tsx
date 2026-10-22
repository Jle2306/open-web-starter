import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type Creator = { name: string; role: string; introduction: string; skills: readonly string[]; projects: readonly { title: string; description: string; href: string }[] };

/** Simplified profile, skills and project sections from the personal-brand demo. */
export function CreatorProfile({ creator }: { creator: Creator }) {
  return <><section className="grid gap-8 py-8 md:grid-cols-[1.5fr_1fr]">
    <div><p className="font-semibold text-cyan-800">{creator.role}</p><h2 className="mt-4 text-5xl font-bold tracking-tight">{creator.name}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{creator.introduction}</p><Button className="mt-6" href="#projects">Explore example projects</Button></div>
    <Card><h3 className="text-xl font-semibold">Areas of interest</h3><ul className="mt-5 space-y-3">{creator.skills.map((skill) => <li key={skill} className="rounded-lg bg-slate-100 p-3">{skill}</li>)}</ul></Card>
  </section><section id="projects" className="mt-8"><h2 className="text-3xl font-semibold">Example projects</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{creator.projects.map((project) => <Card key={project.title}><h3 className="text-xl font-semibold">{project.title}</h3><p className="my-4 leading-7 text-slate-600">{project.description}</p><Button variant="secondary" href={project.href}>Explore {project.title}</Button></Card>)}</div></section></>;
}
