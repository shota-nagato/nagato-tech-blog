import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
  env: {
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_ID,
    GTM_ID: process.env.GTM_ID,
  },
}

export default nextConfig
