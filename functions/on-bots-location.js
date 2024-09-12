exports = async function (arg) {
  const serviceName = "mongodb-atlas";

  const messageCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Message");

  const { node, message, conversation, rerun, bot } = arg;

  try {
    const { trigger, whatsapp } = node.data;

    // If the interactive buttons haven't been sent yet, send them
    if (!trigger || rerun) {
      console.log("on-bots-location init", node.id);

      const result = await messageCollection.insertOne({
        message_id: "not_send_yet",
        conversation: message.conversation,
        business_phone_number_id: message.business_phone_number_id,
        recipient: conversation.customer_phone_number,
        timestamp: Math.floor(Date.now() / 1000),
        statuses: [],
        bot,
        ...whatsapp,
      });

      node.data.trigger = {
        status: "done",
        created_at: Math.floor(Date.now() / 1000),
        updated_at: null,
        count: (trigger?.count || 0) + 1,
        done: {
          message: result.insertedId.toString(),
        },
      };

      return { updatedNode: node, done: true };
    }
  } catch (err) {
    console.log("Error on-bots-location:", err.message);
  }

  return { updatedNode: node, done: true };
};
