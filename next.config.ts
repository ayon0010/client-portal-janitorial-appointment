/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move it to the top-level configuration
  outputFileTracingIncludes: {
    '/*': ['./src/generated/*.node'],
  },
  reactCompiler: true,
};

module.exports = nextConfig;