exports = async function (changeEvent) {
  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection("Message");

  try {
    const entry = changeEvent.fullDocument.entry[0];
    const change = entry.changes[0];
    const value = change.value;
    const business_phone_number_id = value.metadata.phone_number_id.toString();
    const message = value.messages[0];
    const type = message.type;
    const id = message[type].id;

    const requestURL = await context.http.get({
      url: `https://graph.facebook.com/v20.0/${id}/`,
      headers: {
        Authorization: [
          `Bearer ${context.values.get(
            `${business_phone_number_id}-access-token`
          )}`,
        ],
      },
    });

    const jsonURL = JSON.parse(requestURL.body.text());

    const { signed_url, signed_url_timestamp, file_name } =
      await context.functions.execute("private-upload-media", {
        fileName: id,
        url: jsonURL.url,
        mimeType: jsonURL.mime_type,
        expiresIn: 3600,
        business_phone_number_id,
      });

    const result = await context.functions.execute(
      "private-create-conversation",
      changeEvent
    );

    await collection.insertOne({
      message_id: message.id,
      business_phone_number_id,
      conversation: result._id,
      recipient: value.metadata.display_phone_number.toString(),
      timestamp: message.timestamp,
      type,
      media: { ...jsonURL, file_name, signed_url, signed_url_timestamp },
    });
  } catch (err) {
    console.log("error: ", err.message);
  }
};
