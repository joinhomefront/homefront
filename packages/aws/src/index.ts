import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Resource } from "sst";

const BUCKET_NAME = Resource["join-homefront"].name;

const opts =
  Resource.App.stage === "production"
    ? {
        region: "us-east-2",
        endpoint: `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com`,
      }
    : {};

const s3 = new S3Client(opts);

/**
 * Uploads a remote image to the S3 bucket served by the CDN
 *
 * @param imageUrl The remote URL for the image
 * @param path The path for the image, e.g. `images/resources`, with no trailing `/`
 * @returns The key of the image in the S3 bucket
 */
export async function uploadRemoteImageToS3(imageUrl: string, path: string) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const imageBuffer = await response.arrayBuffer();
  const name = crypto.randomUUID();
  const key = `${path}/${name}`;

  const contentType = response.headers.get("Content-Type");
  if (!contentType?.startsWith("image")) {
    throw new Error("Invalid image type");
  }

  const command = new PutObjectCommand({
    Key: key,
    Bucket: BUCKET_NAME,
    Body: Buffer.from(imageBuffer),
    ContentType: contentType,
  });

  await s3.send(command);

  return key;
}
