exports = async function (changeEvent) {
  const docId = changeEvent.documentKey._id;

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
    const message = value.messages[0];
    const business_phone_number_id = value.metadata.phone_number_id.toString();
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
      text: {
        preview_url: true,
        body: message.text.body.toString(),
      },
      type: message.type,
    });
  } catch (err) {
    console.log("received-text error: ", err.message);
  }
};
