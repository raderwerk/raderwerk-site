import assert from 'node:assert/strict';
import test from 'node:test';
import { base, checkReference } from './check-site.mjs';

const paths = new Set([base, `${base}cases/`, `${base}favicon.svg`]);

test('accepts base-prefixed pages, assets, fragments, and external links', () => {
	assert.equal(checkReference(`${base}cases/#werk`, paths), undefined);
	assert.equal(checkReference(`${base}favicon.svg`, paths), undefined);
	assert.equal(checkReference('https://example.com/', paths), undefined);
});

test('rejects root links without the Pages base and missing targets', () => {
	assert.match(checkReference('/cases/', paths), /base path/);
	assert.match(checkReference(`${base}missing.svg`, paths), /built file/);
});
