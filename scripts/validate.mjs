import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export async function validate() {
  const templates = JSON.parse(await readFile(resolve(root, 'templates.json'), 'utf8'));
  if (!Array.isArray(templates) || !templates.length) throw new Error('templates.json must be a nonempty array');
  const ids = new Set();
  const license = await readFile(resolve(root, 'LICENSE'), 'utf8');
  for (const entry of templates) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) || ids.has(entry.id)) throw new Error(`Invalid/duplicate id: ${entry.id}`);
    ids.add(entry.id);
    if (entry.path !== `templates/${entry.id}`) throw new Error(`Path must match id: ${entry.id}`);
    if (!/^dist(?:\/[a-zA-Z0-9_-]+)*$/.test(entry.buildOutput)) throw new Error(`Unsafe buildOutput: ${entry.id}`);
    for (const key of ['name', 'category', 'description', 'integrationStatus']) {
      if (typeof entry[key] !== 'string' || !entry[key].trim()) throw new Error(`Missing ${key}: ${entry.id}`);
    }
    if (entry.license !== 'SEE LICENSE IN LICENSE') throw new Error(`Unexpected license: ${entry.id}`);
    const base = resolve(root, entry.path);
    for (const file of ['README.md', 'LICENSE', 'ASSETS.md', 'TEMPLATE-GUIDE.md', 'package.json', 'package-lock.json']) {
      if (!(await stat(resolve(base, file))).isFile()) throw new Error(`Missing file: ${entry.path}/${file}`);
    }
    if (!(await stat(resolve(base, 'src'))).isDirectory()) throw new Error(`Missing src: ${entry.id}`);
    if (await readFile(resolve(base, 'LICENSE'), 'utf8') !== license) throw new Error(`License differs from root: ${entry.id}`);
    const pkg = JSON.parse(await readFile(resolve(base, 'package.json'), 'utf8'));
    const lock = JSON.parse(await readFile(resolve(base, 'package-lock.json'), 'utf8'));
    if (!pkg.scripts?.dev || !pkg.scripts?.build) throw new Error(`Missing dev/build scripts: ${entry.id}`);
    if (pkg.license !== entry.license || lock.packages?.['']?.license !== entry.license) throw new Error(`Package license mismatch: ${entry.id}`);
  }
  const directories = (await readdir(resolve(root, 'templates'), { withFileTypes: true })).filter(x => x.isDirectory());
  for (const directory of directories) if (!ids.has(directory.name)) throw new Error(`Unregistered template: ${directory.name}`);
  return templates;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const templates = await validate();
  console.log(`Validated ${templates.length} templates: ${templates.map(t => t.id).join(', ')}`);
}
