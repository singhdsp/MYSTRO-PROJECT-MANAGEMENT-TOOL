import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "img.freepik.com", 
      "firebasestorage.googleapis.com", 
      "media.istockphoto.com", 
      "storage.googleapis.com"
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  env: {
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLOUD_PRIVATE_KEY_ID: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
    GOOGLE_CLOUD_PRIVATE_KEY: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
    GOOGLE_CLOUD_CLIENT_EMAIL: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    GOOGLE_CLOUD_CLIENT_ID: process.env.GOOGLE_CLOUD_CLIENT_ID,
    GOOGLE_CLOUD_BUCKET_NAME: process.env.GOOGLE_CLOUD_BUCKET_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
  }, 
};

const withNextIntl = createNextIntlPlugin();

// Combine configurations
const buildConfig = (phase) => {
  console.log("Building with PWA and next-intl config");
  return withNextIntl(nextConfig);
};

export default buildConfig;