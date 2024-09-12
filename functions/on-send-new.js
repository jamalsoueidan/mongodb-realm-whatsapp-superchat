exports = async function (changeEvent) {
  const docId = changeEvent.documentKey._id;
  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection(changeEvent.ns.coll);

  const {
    business_phone_number_id,
    type,
    interactive,
    location,
    text,
    recipient,
    timestamp,
  } = changeEvent.fullDocument;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type,
    ...(text ? { text } : {}),
    ...(interactive ? { interactive } : {}),
    ...(location ? { location } : {}),
  };

  const request = await context.http.post({
    url: `https://graph.facebook.com/v20.0/${business_phone_number_id}/messages`,
    body,
    headers: {
      Authorization: [
        `Bearer ${context.values.get(
          `${business_phone_number_id}-access-token`
        )}`,
      ],
    },
    encodeBodyAsJSON: true,
  });

  const response = JSON.parse(request.body.text());

  if (response.error) {
    throw new Error(response.error);
    return response;
  }

  try {
    await context.services
      .get(serviceName)
      .db(databaseName)
      .collection("Conversation")
      .updateOne(
        { customer_phone_number: recipient, business_phone_number_id },
        {
          $set: {
            timestamp,
          },
        }
      );

    await collection.updateOne(
      { _id: docId }, // Query to find the document by its _id
      {
        $set: { message_id: response.messages[0].id }, // Use $set to update the message_id field
      }
    );
  } catch (err) {
    console.log("error performing mongodb write: ", err.message);
  }
};
