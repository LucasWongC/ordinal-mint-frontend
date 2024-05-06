/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  rewrites: () => [
    // {
    //   source: "/api/:path*",
    //   destination: "http://127.0.0.1:8001/api/:path*", // Proxy to Backend
    // },
    // {
    //   source: "/api/docs",
    //   destination: "http://127.0.0.1:8001/docs", // Proxy to Backend
    // },
  ],
};

module.exports = nextConfig;
