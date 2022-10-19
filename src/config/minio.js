const {
  IMAGE: { ENDPOINT, ACCESS_KEY, SECRET_KEY, BUCKET_NAME, PORT, SSL },
} = require("../config");

const Minio = require("minio");
const MinioClient = new Minio.Client({
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
  port: PORT,
  endPoint: ENDPOINT,
  pathStyle: true,
  useSSL: SSL,
});

module.exports = {
  MinioClient,
  bucket: BUCKET_NAME,
};
