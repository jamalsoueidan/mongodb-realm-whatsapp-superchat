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

  const insertObject = {
    user: context.user.id,
    created_at: Math.floor(Date.now() / 1000),
    updated_at: Math.floor(Date.now() / 1000),
    ...args,
  };

  var findResult;
  try {
    // Execute a FindOne in MongoDB
    findResult = await collection.insertOne(insertObject);
  } catch (err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return { _id: findResult.insertedId, ...insertObject };
};
