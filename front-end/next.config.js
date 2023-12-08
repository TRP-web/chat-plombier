/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER: "http://localhost:3002/",
    SPACE: "gu8txoix5hr4",
    ACCESSE_TOKEN: "ozTPXf0yRbbEAPKiFpjxBX1tJq5O1GL5I8jvozETBPU",
    REVALIDATE: "3600"
  },
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = nextConfig