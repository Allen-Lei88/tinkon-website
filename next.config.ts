import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    // Product photos are stable. Use a new filename when replacing a photo.
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    qualities: [75],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products/index.html",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
