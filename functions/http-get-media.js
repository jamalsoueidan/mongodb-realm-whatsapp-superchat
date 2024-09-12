exports = async function ({ query }, response) {
  const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection("Message");

  const region = "eu-west-1";
  const bucketName = "whatsappmongodb";
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: context.values.get("amazon-access-key-id"),
      secretAccessKey: context.values.get("amazon-secret-key"),
    },
  });

  try {
    const message = await collection.findOne({
      "media.file_name": query["id"],
    });

    if (!message) {
      response.setStatusCode(404);
      response.setBody("Message not found");
      return;
    }

    const signedUrlTimestamp = message.media.signed_url_timestamp;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const expiresIn = 3600;

    let signedUrl = message.media.signed_url;

    if (currentTime - signedUrlTimestamp > expiresIn) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: query["id"],
      });

      signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
        expiresIn: 3600,
      });

      await collection.updateOne(
        { "media.file_name": query["id"] },
        {
          $set: {
            "media.signed_url": signedUrl,
            "media.signed_url_timestamp": currentTime,
          },
        }
      );
    }

    response.setStatusCode(302);
    response.setHeader("Location", signedUrl);
  } catch (err) {
    console.log("error: ", err.message);
    response.setStatusCode(500);
    response.setBody("Internal Server Error");
  }
};
