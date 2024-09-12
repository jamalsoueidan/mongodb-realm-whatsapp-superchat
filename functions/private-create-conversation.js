exports = async function (changeEvent) {
  try {
    const serviceName = "mongodb-atlas";
    const databaseName = "cloudapi";
    const collection = context.services
      .get(serviceName)
      .db(databaseName)
      .collection("Conversation");

    const entry = changeEvent.fullDocument.entry[0];
    const change = entry.changes[0];
    const value = change.value;
    const business_phone_number_id = value.metadata.phone_number_id.toString();

    let customer_phone_number = "";
    let set = {};

    if (value.statuses) {
      const status = value.statuses[0];
      customer_phone_number = status.recipient_id.toString();

      set = {
        business_phone_number_id,
        customer_phone_number,
        timestamp: status.timestamp,
        user_ids: [],
      };
    }

    if (value.contacts) {
      const contact = value.contacts[0];
      customer_phone_number = contact.wa_id.toString();
      set = {
        business_phone_number_id,
        customer_phone_number,
        name: contact.profile.name,
        timestamp: value.messages[0].timestamp,
        user_ids: [],
      };
    }

    // Step 1: Try to find the document
    let conversation = await collection.findOne({
      customer_phone_number,
      business_phone_number_id,
    });

    if (conversation) {
      // Step 2: If found, update it
      await collection.updateOne(
        { customer_phone_number, business_phone_number_id },
        { $set: set }
      );
    } else {
      // Step 3: If not found, insert a new document
      const insertResult = await collection.insertOne(set);
      conversation = await collection.findOne({ _id: insertResult.insertedId });
    }

    return conversation;
  } catch (err) {
    console.log("create-conversation error: ", err.message);
  }
};
