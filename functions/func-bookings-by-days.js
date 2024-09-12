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
          "interactive_reply.response_json.date": { $exists: true },
        },
      },
      {
        $addFields: {
          date: {
            $toDate: "$interactive_reply.response_json.date",
          },
        },
      },
      {
        $addFields: {
          dayOfWeek: { $dayOfWeek: "$date" },
        },
      },
      {
        // Group by the day of the week
        $group: {
          _id: "$dayOfWeek",
          totalBookings: { $sum: 1 },
        },
      },
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: 7 }, // Sunday becomes 7
                { case: { $eq: ["$_id", 2] }, then: 1 }, // Monday becomes 1
                { case: { $eq: ["$_id", 3] }, then: 2 }, // Tuesday becomes 2
                { case: { $eq: ["$_id", 4] }, then: 3 }, // Wednesday becomes 3
                { case: { $eq: ["$_id", 5] }, then: 4 }, // Thursday becomes 4
                { case: { $eq: ["$_id", 6] }, then: 5 }, // Friday becomes 5
                { case: { $eq: ["$_id", 7] }, then: 6 }, // Saturday becomes 6
              ],
              default: 8,
            },
          },
        },
      },
      {
        $sort: { sortOrder: 1 },
      },
      {
        $addFields: {
          day: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id", 2] }, then: "Monday" },
                { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id", 6] }, then: "Friday" },
                { case: { $eq: ["$_id", 7] }, then: "Saturday" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $addFields: {
          _id: "$day",
        },
      },
      {
        // Project the final output, removing unnecessary fields
        $project: {
          _id: 1,
          totalBookings: 1,
        },
      },
    ]);
  } catch (err) {
    console.log("Error occurred while executing:", err.message);
    return { error: err.message };
  }
};
