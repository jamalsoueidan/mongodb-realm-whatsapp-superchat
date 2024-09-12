exports = async function (args) {
  const { business_phone_number_id, bot, _id } = args;
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)

  // Get a collection from the context
  var collection = context.services
    .get("mongodb-atlas")
    .db("cloudapi")
    .collection("CustomerBot");

  try {
    // Execute a FindOne in MongoDB
    return collection.aggregate([
      {
        $match: {
          business_phone_number_id,
          bot: new BSON.ObjectId(bot),
          _id: new BSON.ObjectId(_id),
        },
      },
      {
        $sort: { updated_at: -1 },
      },
      {
        $lookup: {
          from: "Conversation",
          let: { customerPhoneNumber: "$customer_phone_number" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$customer_phone_number", "$$customerPhoneNumber"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "conversation",
        },
      },
      {
        $unwind: {
          path: "$conversation",
          preserveNullAndEmptyArrays: true, // If you want to include results even if there's no match
        },
      },
    ]);
  } catch (err) {
    console.log("Error func-bot-log-list:", err.message);

    return { error: err.message };
  }
};
