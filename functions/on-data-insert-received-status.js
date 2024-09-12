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
    const statuses = value.statuses[0];
    const conversation_id = statuses.id;

    collection.updateOne(
      { message_id: conversation_id },
      {
        $push: {
          statuses: {
            status: statuses.status,
            timestamp: statuses.timestamp,
          },
        },
        //$set: { timestamp: statuses.timestamp },
      }
    );
  } catch (err) {
    console.log("error performing mongodb write: ", err.message);
  }
};
