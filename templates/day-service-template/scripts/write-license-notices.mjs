import { readFile, copyFile, writeFile } from 'node:fs/promises';

await copyFile('LICENSE', 'dist/client/LICENSE');
const notices = [];
for (const name of ['react', 'react-dom', 'scheduler', '@phosphor-icons/react']) {
  const pkg = JSON.parse(await readFile(`node_modules/${name}/package.json`, 'utf8'));
  let license;
  for (const filename of ['LICENSE', 'LICENSE.md', 'LICENSE.txt']) {
    try { license = await readFile(`node_modules/${name}/${filename}`, 'utf8'); break; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  if (!license) throw new Error(`License missing: ${name}`);
  notices.push(`${name} ${pkg.version}\n\n${license}`);
}
await writeFile('dist/client/THIRD-PARTY-NOTICES.txt', notices.join('\n\n--------------------\n\n'));
