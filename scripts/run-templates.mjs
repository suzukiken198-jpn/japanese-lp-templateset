import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { validate, root } from './validate.mjs';

const mode = process.argv[2];
if (!['install', 'build'].includes(mode)) throw new Error('Usage: node scripts/run-templates.mjs install|build');
const templates = await validate();
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
for (const template of templates) {
  console.log(`\n${mode}: ${template.id}`);
  const options = { cwd: resolve(root, template.path), stdio: 'inherit' };
  execFileSync(npm, mode === 'install' ? ['ci'] : ['run', 'build'], options);
  if (mode === 'build') execFileSync(npm, ['run', 'test:sites', '--if-present'], options);
}
