import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = [];
function collect(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path.join(dir, entry.name));
  }
}
collect(root);
collect(path.join(root, 'docs'));
let checked = 0;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    const [relative, anchor] = target.split('#');
    const resolved = relative ? path.resolve(path.dirname(file), decodeURIComponent(relative)) : file;
    if (!fs.existsSync(resolved)) throw Error(`Missing local link in ${path.relative(root, file)}: ${target}`);
    if (anchor && resolved.endsWith('.md')) {
      const headings = [...fs.readFileSync(resolved, 'utf8').matchAll(/^#+\s+(.+)$/gm)]
        .map((heading) => heading[1].toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-'));
      if (!headings.includes(anchor)) throw Error(`Missing heading in ${path.relative(root, file)}: ${target}`);
    }
    checked++;
  }
}
console.log(`Validated ${checked} local Markdown links and anchors in ${files.length} documents.`);
