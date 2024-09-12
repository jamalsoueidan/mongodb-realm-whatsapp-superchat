exports = async function () {
  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection("Message");

  try {
    return collection.aggregate([
      {
        $match: {
          "interactive_reply.response_json.time": { $exists: true },
        },
      },
      {
        $addFields: {
          time: "$interactive_reply.response_json.time",
        },
      },
      {
        $group: {
          _id: "$time",
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  } catch (err) {
    console.log("Error occurred while executing:", err.message);
    return { error: err.message };
  }
};
