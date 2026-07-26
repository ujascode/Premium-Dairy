/** @type {import('next').NextConfig} */
// Validate required environment variables at startup
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const nextConfig = {
  /* config options here */
};

export default nextConfig;