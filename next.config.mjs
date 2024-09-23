/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placewaifu.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'ik.imagekit.io',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
        ],
      },
}
export default nextConfig