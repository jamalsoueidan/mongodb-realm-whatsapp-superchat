exports = function (user) {
  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection("User");

  const newDoc = {
    user_id: user.id,
    email: "notallowed@notallowed.com",
    ...user.data,
    is_team_admin: false,
    is_admin: false,
    conversation_ids: [new BSON.ObjectId("66b55a5bc93f6459b79ca79f")],
    business_phone_number_ids: ["364826260050460"],
    created_at: Math.floor(Date.now() / 1000),
    updated_at: Math.floor(Date.now() / 1000),
  };
  return collection.insertOne(newDoc);
  return;
};
