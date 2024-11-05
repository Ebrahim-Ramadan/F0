import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'F0',
    short_name: 'F0',
    description: 'Remove your background within milliseconds',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/ico',
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/ico',
      },
    ],
  }
}