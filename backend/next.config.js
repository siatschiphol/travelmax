/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
    deviceSizes: [32, 48, 64, 96, 128, 256, 384],
    imageSizes: [16, 32, 48, 64, 96],
  },
}

module.exports = nextConfig
