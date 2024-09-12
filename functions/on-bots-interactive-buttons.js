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
      console.log("on-bots-interactive-buttons init", node.id);

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
        status: "waiting",
        created_at: Math.floor(Date.now() / 1000),
        updated_at: null,
        count: (trigger?.count || 0) + 1,
        waiting: {
          message: result.insertedId.toString(),
        },
      };

      return { updatedNode: node, done: false };
    } else if (
      message.reply?.toString() === trigger.waiting.message.toString()
    ) {
      //we wait on the response!
      console.log("on-bots-interactive-buttons response", node.id);

      await messageCollection.updateOne(
        {
          _id: message._id,
        },
        { $set: { bot } }
      );

      node.data.trigger = {
        ...node.data.trigger,
        status: "done",
        sourceHandle: message.interactive_reply.button_reply.id, //for nodes with multi selection, must return the sourceHandleId, save us time later!
        reply_count: (trigger?.reply_count || 0) + 1,
        done: {
          message: message._id.toString(),
          ...message.interactive_reply,
        },
        updated_at: Math.floor(Date.now() / 1000),
      };

      return {
        updatedNode: node,
        done: true,
        sourceHandle: message.interactive_reply.button_reply.id,
      };
    } else {
      console.log("start over? from here");
    }
  } catch (err) {
    console.log("Error on-bots-interactive-buttons:", err.message);
  }

  return { updatedNode: node, done: false };
};
