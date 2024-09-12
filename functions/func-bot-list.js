exports = async function (args) {
  const { business_phone_number_id } = args;
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

  var findResult;
  try {
    // Get a value from the context (see "Values" tab)
    // Update this to reflect your value's name.
    var valueName = "value_name";
    var value = context.values.get(valueName);

    // Execute a FindOne in MongoDB
    findResult = await collection
      .find({ business_phone_number_id })
      .sort({ updated_at: -1 });
  } catch (err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return findResult;
};
