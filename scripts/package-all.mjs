import { cp, mkdir, mkdtemp, readFile, writeFile, rm, lstat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { resolve, join, relative, basename } from 'node:path';
import { validate, root } from './validate.mjs';

const templates = await validate();
for (const template of templates) {
  for (const file of ['index.html', 'LICENSE', 'THIRD-PARTY-NOTICES.txt']) {
    await readFile(resolve(root, template.path, template.buildOutput, file));
  }
}
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const name = `japanese-lp-templateset-v${pkg.version}`;
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const staging = await mkdtemp(join(tmpdir(), 'lp-templateset-'));
const target = join(staging, name);
await mkdir(target);
for (const file of ['README.md', 'LICENSE', 'ASSETS.md', 'CONTRIBUTING.md', 'ROADMAP.md', 'templates.json', 'package.json', '.gitignore', 'docs', 'scripts', 'tests', 'site', 'vercel.json']) {
  await cp(resolve(root, file), join(target, file), { recursive: true });
}
for (const template of templates) {
  const sourceRoot = resolve(root, template.path);
  await cp(sourceRoot, join(target, template.path), {
    recursive: true,
    filter: async source => {
      const parts = relative(sourceRoot, source).split(/[\\/]/);
      if (parts.some(part => ['.git', 'node_modules', '.vercel', '.prerender', '.DS_Store', 'releases'].includes(part) || (part.startsWith('.env') && part !== '.env.example'))) return false;
      if ((await lstat(source)).isSymbolicLink()) throw new Error(`Symlink not allowed in release: ${source}`);
      return true;
    },
  });
}
await mkdir(resolve(root, 'releases'), { recursive: true });
const output = resolve(root, 'releases', `${name}-${stamp}.zip`);
execFileSync('zip', ['-qr', output, name], { cwd: staging, stdio: 'inherit' });
const sha = createHash('sha256').update(await readFile(output)).digest('hex');
await writeFile(`${output}.sha256`, `${sha}  ${basename(output)}\n`);
await rm(staging, { recursive: true });
console.log(`Template set ZIP: ${output}`);
