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
    let base = import.meta.env.BASE_URL;
    if (!base.endsWith('/')) base += '/';
    return `${base}${path.slice(1)}`;
  }
  return path;
}

export function resolveBasePath(path: string): string {
  let base = import.meta.env.BASE_URL;
  if (!base) return '/';
  if (!base.endsWith('/')) base += '/';

  if (!path) return base;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  
  if (path === "/") return base;
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
  let site = import.meta.env.SITE || "https://skiathos-atletico.gr";
  if (site.endsWith('/')) site = site.slice(0, -1);

  let base = import.meta.env.BASE_URL;
  if (!base) base = '/';
  if (!base.endsWith('/')) base += '/';

  if (path === "/") return `${site}${base}`;
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${site}${base}${trimmed}`;
}
