/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  rewrites: () => [
    {
      source: "/api/:path*",
      destination: "http://127.0.0.1:8000/api/:path*", // Proxy to Backend
    },
    {
      source: "/api/docs",
      destination: "http://127.0.0.1:8000/docs", // Proxy to Backend
    },
  ],
};

module.exports = nextConfig;
