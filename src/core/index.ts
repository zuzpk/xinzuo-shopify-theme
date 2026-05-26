type AssetGlobValue = string | { default?: string };

const globbedImages = import.meta.glob('../assets/**/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, AssetGlobValue>;

function toAssetUrl(value: AssetGlobValue | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value.default === 'string') return value.default;
  return undefined;
}

/* Resolves a local asset file name to its dynamically generated Vite/Shopify compilation URL.
 * @param pathString - The relative folder path or filename inside src/assets/ (e.g. 'xz-logo.png')
 */
export function asset(pathString: string): string {
  // Normalize the query string lookup format
  const cleanPath = pathString.startsWith('./') ? pathString.slice(2) : pathString;
  const targetKey = `../assets/${cleanPath}`;

  // Find the compiled asset module match inside the Vite glob map
  const resolved = toAssetUrl(globbedImages[targetKey]);
  if (resolved) {
    return resolved;
  }

  console.warn(`Asset map lookup failed for path: ${targetKey}. Ensure it exists inside src/assets/`);
  return '';
}