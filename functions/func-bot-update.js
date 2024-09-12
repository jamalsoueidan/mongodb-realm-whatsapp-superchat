exports = async function (args) {
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "cloudapi";
  var collName = "Bot";

  // Get a collection from the context
  var collection = context.services
    .get(serviceName)
    .db(dbName)
    .collection(collName);

  const { _id, ...props } = args;

  var findResult;
  try {
    // Execute a FindOne in MongoDB
    findResult = await collection.updateOne(
      { _id: new BSON.ObjectId(_id) },
      { $set: { ...props, updated_at: Math.floor(Date.now() / 1000) } }
    );
  } catch (err) {
    console.log("Error occurred while executing updateOne:", err.message);

    return { error: err.message };
  }

  return findResult;
};
