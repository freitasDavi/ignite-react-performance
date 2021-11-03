/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
});

// https://app.rocketseat.com.br/h/forum/react-js/8317655b-2ae5-44b3-ab25-44a73bcad12b
