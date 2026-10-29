/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.example.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client', '@payloadcms/db-sqlite', '@payloadcms/next'],
  },
  webpack: (config) => {
    config.resolve.extensionAlias = { '.js': ['.js', '.ts', '.tsx'] }
    return config
  },
};

export default nextConfig;
