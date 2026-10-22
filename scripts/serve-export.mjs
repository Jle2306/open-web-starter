// Loopback-only static preview server for browser tests; not a production server.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.ico': 'image/x-icon', '.png': 'image/png', '.woff2': 'font/woff2' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1:3101').pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    const stat = await fs.stat(file);
    if (stat.isDirectory()) file = path.join(file, 'index.html');
    const data = await fs.readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(data);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(3101, '127.0.0.1', () => console.log('Static test export: http://127.0.0.1:3101'));
