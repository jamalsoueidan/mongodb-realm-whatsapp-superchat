exports = async function (arg) {
  const serviceName = "mongodb-atlas";

  const messageCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Message");

  const { node, message, conversation, rerun, prevNode } = arg; //prevNode will be undefined if the node is set to be first to run in the flow

  try {
    const { trigger, whatsapp, config, bot } = node.data;

    // If the message haven't been sent yet, send them
    if (!trigger || rerun) {
      console.log(
        "on-bots-message init",
        node.id,
        "require_response",
        JSON.stringify(config)
      );

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
        status: config.require_response ? "waiting" : "done",
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
        waiting: {
          message: result.insertedId.toString(),
        },
      };

      return { updatedNode: node, done: !config.require_response }; //if require_response = true, it should set done to false, since we need to wait on the msg
    } else {
      console.log("on-bots-message response", node.id);

      await messageCollection.updateOne(
        {
          _id: message._id,
        },
        { $set: { bot } }
      );

      node.data.trigger = {
        ...node.data.trigger,
        status: "done",
        done: {
          message: message._id.toString(),
          type: message.type,
          text: message.text,
          media: message.media,
        },
        updated_at: Math.floor(Date.now() / 1000),
      };
      //we wait on the response!

      return {
        updatedNode: node,
        done: true,
      };
    }
  } catch (err) {
    console.log("Error on-bots-message:", JSON.stringify(err));
  }
};
