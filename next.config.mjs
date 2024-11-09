/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images:{
    domains: ['via.placeholder.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
