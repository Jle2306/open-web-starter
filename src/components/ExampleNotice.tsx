export function ExampleNotice({ children }: { children: React.ReactNode }) {
  return <aside className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>Demo / Example.</strong> {children} Use synthetic information only.</aside>;
}
