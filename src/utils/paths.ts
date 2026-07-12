// Shared asset/path resolution helpers.
//
// On GitHub Pages the site is served under a subpath (e.g. /teamlocal/).
// Astro's `base` config is exposed via `import.meta.env.BASE_URL` and ALWAYS
// ends with a trailing slash ("/" locally, "/teamlocal/" in production).
//
// These helpers prepend BASE_URL to any user-supplied path that begins with
// "/", while leaving external URLs untouched.

export function resolveAsset(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  if (path.startsWith("/")) {
    const base = import.meta.env.BASE_URL; // always ends with "/"
    // path starts with "/" → strip it to avoid "//" and append to base
    return `${base}${path.slice(1)}`;
  }
  return path;
}

export function resolveBasePath(path: string): string {
  if (!path) return import.meta.env.BASE_URL;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  const base = import.meta.env.BASE_URL; // always ends with "/"
  if (path === "/") return base;
  // path may already include a leading slash — normalise
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${trimmed}`;
}

/**
 * Helper function to build absolute website URLs (for SEO/Social/Meta tags).
 * Resolves any URL from the deployment subpath to the absolute SITE URL.
 */
export function resolveUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  const site = import.meta.env.SITE || "https://skiathos-atletico.gr";
  const base = import.meta.env.BASE_URL;
  if (path === "/") return `${site}${base === "/" ? "/" : base}`;
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${site}${base}${trimmed}`;
}
