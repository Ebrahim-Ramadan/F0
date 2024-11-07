/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // ppr:true,
    dynamicIO: true,
    reactCompiler:true,
    serverActions:{
      bodySizeLimit:'5mb',
    }
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
    
    ,
    removeConsole:process.env.NODE_ENV === 'production'?
    {
      exclude: ['error', 'warn', 'info'],

    }:
    false,
  },
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
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
          },
        ],
      },
}
export default nextConfig