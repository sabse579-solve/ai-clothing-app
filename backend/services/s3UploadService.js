// backend/src/services/s3UploadService.js

const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/s3Client");

// Convert Base64 → Buffer and upload to S3
async function uploadBase64Image(base64Data, key) {
  const match = base64Data.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) throw new Error("Invalid Base64 image");

  const contentType = match[1];
  const buffer = Buffer.from(match[2], "base64");

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
  };

  await s3Client.send(new PutObjectCommand(params));

  const url = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  return url;
}

module.exports = { uploadBase64Image };



