exports = async function (changeEvent) {
  // A Database Trigger will always call a function with a changeEvent.
  // Documentation on ChangeEvents: https://www.mongodb.com/docs/manual/reference/change-events

  // This sample function will listen for events and replicate them to a collection in a different Database

  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection(changeEvent.ns.coll);

  try {
    const user = changeEvent.fullDocument;

    const { signed_url, signed_url_timestamp, file_name } =
      await context.functions.execute("private-upload-media", {
        fileName: docId.toString(),
        url: user.picture,
        mimeType: "image/jpeg",
      });

    await collection.findOneAndUpdate(
      { _id: docId },
      {
        $set: {
          picture: signed_url,
        },
      },
      { upsert: true, returnDocument: "before" }
    );
  } catch (err) {
    console.log("error: ", err.message);
  }
};
