import assert from 'node:assert/strict';
import test from 'node:test';
import { base, checkExternalStatus, checkReference } from './check-site.mjs';

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

test('accepts successful external responses and rejects HTTP errors', () => {
	assert.equal(checkExternalStatus('https://example.com/', 200), undefined);
	assert.equal(checkExternalStatus('https://example.com/redirected', 399), undefined);
	assert.match(checkExternalStatus('https://example.com/missing', 404), /HTTP 404/);
});
