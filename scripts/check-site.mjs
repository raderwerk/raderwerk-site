import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import config from '../astro.config.mjs';

const root = new URL('../dist/', import.meta.url).pathname;
export const base = `/${String(config.base ?? '').replace(/^\/+|\/+$/g, '')}/`;

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	return (
		await Promise.all(
			entries.map((entry) =>
				entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
			),
		)
	).flat();
}

export function checkReference(reference, publicPaths) {
	if (!reference.startsWith('/') || reference.startsWith('//')) return undefined;
	const pathname = reference.split(/[?#]/, 1)[0];
	if (!pathname.startsWith(base)) return `does not include the Pages base path: ${reference}`;
	if (!publicPaths.has(pathname)) return `does not resolve to a built file: ${reference}`;
}

async function main() {
	const files = await walk(root);
	const htmlFiles = files.filter((file) => file.endsWith('.html'));
	const publicPaths = new Set();
	for (const file of files) {
		const outputPath = relative(root, file).replaceAll('\\', '/');
		publicPaths.add(`${base}${outputPath}`);
		if (outputPath.endsWith('/index.html')) publicPaths.add(`${base}${outputPath.replace(/index\.html$/, '')}`);
		if (outputPath === 'index.html') publicPaths.add(base);
	}

	const errors = [];
	for (const file of htmlFiles) {
		const html = await readFile(file, 'utf8');
		for (const [, attribute, reference] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
			const error = checkReference(reference, publicPaths);
			if (error) errors.push(`${relative(root, file)} ${attribute} ${error}`);
		}
		if (!html.includes('<meta name="description"')) errors.push(`${relative(root, file)} has no description`);
		if (!html.includes('aria-current="page"')) errors.push(`${relative(root, file)} has no current-page marker`);
	}

	if (errors.length) {
		console.error(errors.join('\n'));
		process.exitCode = 1;
		return;
	}
	console.log(`Checked ${htmlFiles.length} pages: base-prefixed href/src links, built targets, metadata, and current-page markers are valid.`);
}

if (process.argv[1] === new URL(import.meta.url).pathname) await main();
