/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental server actions feature in Next.js
    serverActions: true,
    // Specify external packages that can be used with server components
    serverComponentsExternalPackages: ["mongoose"],
  },
  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    // Define remote image patterns for the 'next/image' component to load images from external sources
    remotePatterns: [
      {
        protocol: "https", // Only allow HTTPS protocol for security
        hostname: "img.clerk.com", // Allow images from the Clerk domain
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev", // Allow images from another Clerk domain
      },
      {
        protocol: "https",
        hostname: "uploadthing.com", // Allow images from UploadThing
      },
      {
        protocol: "https",
        hostname: "placehold.com", // Allow images from Placehold
      },
    ],
  },
};

export default nextConfig;
