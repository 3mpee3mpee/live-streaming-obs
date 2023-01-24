/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STREAMING_SERVER: process.env.STREAMING_SERVER,
    CHAT_SERVER: process.env.CHAT_SERVER
  }
}

module.exports = nextConfig
