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

export function checkExternalStatus(reference, status) {
	if (status < 200 || status >= 400) return `external link returned HTTP ${status}: ${reference}`;
}

async function checkExternalReference(reference) {
	try {
		const response = await fetch(reference, {
			redirect: 'follow',
			signal: AbortSignal.timeout(15_000),
			headers: { 'user-agent': 'raderwerk-site-link-checker/1.0' },
		});
		return checkExternalStatus(reference, response.status);
	} catch (error) {
		return `external link could not be reached: ${reference} (${error.message})`;
	}
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
	const externalReferences = new Set();
	for (const file of htmlFiles) {
		const html = await readFile(file, 'utf8');
		for (const [, attribute, reference] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
			const error = checkReference(reference, publicPaths);
			if (error) errors.push(`${relative(root, file)} ${attribute} ${error}`);
			if (/^https?:\/\//.test(reference)) externalReferences.add(reference);
		}
		if (!html.includes('<meta name="description"')) errors.push(`${relative(root, file)} has no description`);
		if (!html.includes('aria-current="page"')) errors.push(`${relative(root, file)} has no current-page marker`);
	}
	if (process.argv.includes('--external')) {
		for (const reference of externalReferences) {
			const error = await checkExternalReference(reference);
			if (error) errors.push(error);
		}
	}

	if (errors.length) {
		console.error(errors.join('\n'));
		process.exitCode = 1;
		return;
	}
	const externalMessage = process.argv.includes('--external') ? ` and ${externalReferences.size} external links` : '';
	console.log(`Checked ${htmlFiles.length} pages${externalMessage}: base-prefixed href/src links, built targets, metadata, and current-page markers are valid.`);
}

if (process.argv[1] === new URL(import.meta.url).pathname) await main();
