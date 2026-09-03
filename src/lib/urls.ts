const base = `${import.meta.env.BASE_URL.replace(/\/+$/, '')}/`;

/** Return a root-relative URL that includes Astro's configured Pages base path. */
export function sitePath(path = '') {
	return `${base}${path.replace(/^\//, '')}`;
}
