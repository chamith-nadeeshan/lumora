/** @type {import('next').NextConfig} */

// On GitHub Pages this site is served from a sub-path (https://<user>.github.io/lumora).
// The deploy workflow sets PAGES_BASE_PATH="/lumora"; locally it is empty so dev runs at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",              // fully static HTML/CSS/JS -> ./out, no server needed
  images: { loader: "custom", loaderFile: "./image-loader.js" }, // static export + basePath-aware srcs
  trailingSlash: true,           // clean folder-based URLs for static hosts
  basePath,                      // prefixes routes + next/image srcs
  assetPrefix: basePath || undefined,
  // exposed to the client so raw <video src> (not auto-prefixed by Next) can prepend it
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
