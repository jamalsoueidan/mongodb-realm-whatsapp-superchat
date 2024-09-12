exports = async function (changeEvent) {
  const docId = changeEvent.documentKey._id;
  const message = changeEvent.fullDocument;

  const serviceName = "mongodb-atlas";
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

  const conversation = await conversationCollection.findOne({
    _id: message.conversation,
  });

  //We ignore message we send from our system to the user
  if (
    message.message_id === "not_send_yet" ||
    message.recipient === conversation.customer_phone_number
  ) {
    return null;
  }

  //TODO: check if we have any waiting...
  // maybe close the bots that have been waiting more then 15min
  let customerBots = await customerBotCollection
    .find({
      customer_phone_number: conversation.customer_phone_number,
      business_phone_number_id: conversation.business_phone_number_id,
      status: "waiting",
    })
    .toArray();

  if (customerBots.length === 0) {
    // Extract the bot IDs to exclude
    const excludeBotIds = customerBots.map((b) => b.bot);

    console.log("excludeBotIds", JSON.stringify(excludeBotIds));

    // Find bots that hasn't been initiated yet
    const bots = await botCollection
      .find({
        "nodes.data.type": "on_received_message",
        status: "published",
        business_phone_number_id: message.business_phone_number_id,
        _id: { $nin: excludeBotIds }, // Exclude bots that have already been initiated
      })
      .toArray();

    try {
      for (const bot of bots) {
        console.log(
          "started bot:",
          bot.title,
          "for user",
          conversation.customer_phone_number
        );
        // Find the start node
        const startNodeIndex = bot.nodes.findIndex(
          (node) => node.type === "start"
        );
        if (startNodeIndex > -1) {
          bot.nodes[startNodeIndex].data.trigger = {
            status: "done",
            done: { message: docId },
          }; //save the message id that started the flow!

          // Find the edge that starts from the current node
          const currentEdge = bot.edges.find(
            (edge) => edge.source === bot.nodes[startNodeIndex].id
          );

          // Set the current_node_id to the the next node, we dont care about the start.
          const nextNode = bot.nodes.find(
            (node) => node.id === currentEdge?.target
          );

          const newBotState = {
            business_phone_number_id: message.business_phone_number_id,
            customer_phone_number: conversation.customer_phone_number,
            bot: bot._id,
            nodes: bot.nodes,
            edges: bot.edges,
            current_node_id: nextNode?.id,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            status: "waiting",
            completed_nodes: 0,
          };

          const result = await customerBotCollection.insertOne(newBotState);
        }
      }
    } catch (err) {
      console.log(
        "Error occurred while executing for bot in bots:",
        err.message
      );
    }
  }

  context.functions.execute("on-bots-execute", { conversation, message });
};
