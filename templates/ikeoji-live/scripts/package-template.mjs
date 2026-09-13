import { cp, mkdir, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
await readFile('dist/index.html');
await readFile('dist/LICENSE');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const name = `ikeoji-live-template-v${pkg.version}`;
const staging = await mkdtemp(join(tmpdir(), 'ikeoji-template-'));
const target = join(staging, name);
await mkdir(target);
for (const file of ['src', 'scripts', 'public', 'dist', 'index.html', 'package.json', 'package-lock.json', '.gitignore', 'README.md', 'LICENSE', 'ASSETS.md', 'TEMPLATE-GUIDE.md', 'IMPLEMENTATION.md', 'verification.md']) {
  await cp(file, join(target, file), { recursive: true, filter: source => !source.endsWith('.DS_Store') });
}
await mkdir('releases', { recursive: true });
const output = resolve('releases', `${name}-${stamp}.zip`);
execFileSync('zip', ['-qr', output, name], { cwd: staging, stdio: 'inherit' });
const sha = createHash('sha256').update(await readFile(output)).digest('hex');
await writeFile(`${output}.sha256`, `${sha}  ${output.split('/').pop()}\n`);
await rm(staging, { recursive: true });
console.log(`Template ZIP: ${output}`);
