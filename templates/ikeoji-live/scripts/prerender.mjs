import { build } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// Ship real headings, copy, links and FAQ in the initial HTML, before JS loads.
await build({
  logLevel: 'warn',
  build: {
    ssr: 'src/Landing.jsx',
    outDir: '.prerender',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: { output: { entryFileNames: 'landing.mjs' } },
  },
});
const { default: Landing } = await import(pathToFileURL(resolve('.prerender/landing.mjs')));
const markup = renderToString(createElement(Landing));
const filename = resolve('dist/index.html');
const html = await readFile(filename, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Expected empty root was not found.');
await writeFile(filename, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
console.log('Prerendered all landing-page copy, links, FAQ and form into dist/index.html.');
await copyFile('LICENSE', 'dist/LICENSE');
const notices = [];
for (const name of ['react', 'react-dom', 'scheduler']) {
  const pkg = JSON.parse(await readFile(`node_modules/${name}/package.json`, 'utf8'));
  const license = await readFile(`node_modules/${name}/LICENSE`, 'utf8');
  notices.push(`${name} ${pkg.version}\n\n${license}`);
}
await writeFile('dist/THIRD-PARTY-NOTICES.txt', notices.join('\n\n--------------------\n\n'));
