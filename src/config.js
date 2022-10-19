require("dotenv").config();

const PORT = process.env.PORT || 1423;
const IMAGE = {
  ENDPOINT: process.env.IMAGE_ENDPOINT,
  ACCESS_KEY: process.env.IMAGE_ACCESS_KEY,
  SECRET_KEY: process.env.IMAGE_SECRET_KEY,
  BUCKET_NAME: process.env.IMAGE_BUCKET,
};
const HOST = process.env.HOST;

module.exports = {
  PORT,
  IMAGE,
  HOST,
};
