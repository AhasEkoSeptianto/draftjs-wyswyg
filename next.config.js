/** @type {import('next').NextConfig} */


module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css'],
      },
    ],
  },
  webpack: {

  },
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
