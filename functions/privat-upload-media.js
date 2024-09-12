exports = async function ({
  fileName,
  url,
  mimeType,
  expiresIn,
  business_phone_number_id,
}) {
  const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
  } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const { Buffer } = require("buffer");
  const axios = require("axios").default;

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
    const requestFile = await axios.get(url, {
      ...(business_phone_number_id
        ? {
            headers: {
              Authorization: `Bearer ${context.values.get(
                `${business_phone_number_id}-access-token`
              )}`,
            },
          }
        : {}),
      responseType: "arraybuffer",
    });

    const fileContent = Buffer.from(requestFile.data);
    const fileExtension = mimeType.split("/")[1];
    const key = `${fileName}.${fileExtension}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ACL: expiresIn ? "private" : "public-read",
      ContentType: mimeType,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signed_url = await getSignedUrl(
      s3Client,
      getObjectCommand,
      expiresIn
        ? {
            expiresIn,
          }
        : {}
    );

    const signed_url_timestamp = Math.floor(Date.now() / 1000);

    return { signed_url, signed_url_timestamp, file_name: key };
  } catch (err) {
    console.log("error: ", err.message);
  }
};
