exports = async function (args) {
  var serviceName = "mongodb-atlas";

  const botCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Bot");

  const customerBotCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("CustomerBot");

  const conversationCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Conversation");

  const { _id, node_id, business_phone_number_id } = args;

  try {
    // Execute a FindOne in MongoDB
    const bot = await collection.findOne({
      _id: new BSON.ObjectId(_id),
      business_phone_number_id,
    });

    const conversation = await conversationCollection.findOne({
      _id: args.conversation,
      business_phone_number_id,
    });

    const newBotState = {
      business_phone_number_id: message.business_phone_number_id,
      customer_phone_number: conversation.customer_phone_number,
      bot: bot._id,
      nodes: bot.nodes,
      edges: bot.edges,
      current_node_id: node_id,
      created_at: Math.floor(Date.now() / 1000),
      updated_at: Math.floor(Date.now() / 1000),
    };

    return { conversation, newBotState };
  } catch (err) {
    console.log("Error occurred while executing updateOne:", err.message);

    return { error: err.message };
  }
};
