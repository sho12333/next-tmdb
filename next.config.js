/** @type {import('next').NextConfig} */
const nextConfig = {};

require("dotenv").config({ path: "./.env" });

module.exports = {
  images: {
    domains: ["image.tmdb.org"],
  },
};
