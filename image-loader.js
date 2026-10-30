// Custom next/image loader for static export.
// GitHub Pages serves this project under a sub-path (/lumora); the default
// loader needs a server and `unoptimized` skips basePath on public images,
// so we prefix every local image src with the base path ourselves.
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src; // leave absolute URLs untouched
  return `${base}${src}`;
}
