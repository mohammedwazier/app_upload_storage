const {
  IMAGE: { ENDPOINT, ACCESS_KEY, SECRET_KEY, BUCKET_NAME },
} = require("../config");

const Minio = require("minio");
const MinioClient = new Minio.Client({
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
  endPoint: ENDPOINT,
  pathStyle: true,
  useSSL: true,
});

module.exports = {
  MinioClient,
  bucket: BUCKET_NAME,
};
