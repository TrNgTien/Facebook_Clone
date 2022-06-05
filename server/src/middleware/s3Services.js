const AWS = require("aws-sdk");
const bluebird = require("bluebird");

async function uploadS3(key, attachments) {
  const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME } =
    process.env;
  // Configure AWS to use promise
  AWS.config.setPromisesDependency(bluebird);
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_BUCKET_REGION,
  });

  // Create an s3 instance
  const s3 = new AWS.S3();

  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  const base64Data = new Buffer.from(
    attachments.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: `image/jpeg`,
  };
  let locationS3 = "";
  let keyS3 = "";
  const { Location, Key } = await s3.upload(params).promise();
  locationS3 = Location;
  keyS3 = Key;
  return { locationS3, keyS3 };
}

async function deleteS3(key) {
  const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME } =
    process.env;
  AWS.config.setPromisesDependency(bluebird);
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_BUCKET_REGION,
  });
  const s3 = new AWS.S3();
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  };
  await s3.deleteObject(params).promise();
  await s3.deleteS3
}

module.exports = { uploadS3, deleteS3 };
