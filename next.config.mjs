
/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|webp|bmp|tiff)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10000, // Inline images below 10kb
            },
          },
        });
        return config;
      },
};

export default nextConfig;
