const {
  IMAGE: { BUCKET_NAME },
} = require("../config");
const { MinioClient } = require("./minio");

const bucketName = BUCKET_NAME;
(async () => {
  console.log(`Creating Bucket: ${bucketName}`);
  await MinioClient.makeBucket(bucketName, "").catch((e) =>
    console.log(`Error while creating bucket '${bucketName}': ${e.message}`)
  );

  console.log(`Listing all buckets...`);
  const bucketList = await MinioClient.listBuckets();
  console.log(
    `Bucket List: ${bucketList.map((bucket) => bucket.name).join(",\t")}`
  );
})();
