/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images:{
    domains: ['via.placeholder.com']
  }
};

export default nextConfig;
