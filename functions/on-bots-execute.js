const nodeTypes = {
  "interactive-buttons": "on-bots-interactive-buttons",
  "interactive-list": "on-bots-interactive-list",
  location: "on-bots-location",
  "interactive-flow": "on-bots-interactive-flow",
  message: "on-bots-message",
  plus: "",
  chat: "on-bots-chat",
  start: "on-bots-start",
};

// sourceHandle if node have multiply sourceHandle
// targetId if node have one sourceHandle with multiply nodes
const findNextNode = function (
  customerBot,
  currentNode,
  sourceHandle,
  targetId
) {
  console.log("find next node", currentNode.id, sourceHandle, targetId);
  if (sourceHandle) {
    const currentEdge = customerBot.edges.find(
      (edge) =>
        edge.source === currentNode.id && edge.sourceHandle === sourceHandle
    );

    return customerBot.nodes.findIndex(
      (node) => node.id === currentEdge?.target && node.type !== "plus"
    );
  } else if (targetId) {
    return customerBot.nodes.findIndex((node) => node.id === targetId);
  } else {
    const currentEdge = customerBot.edges.find(
      (edge) => edge.source === currentNode.id
    );
    return customerBot.nodes.findIndex(
      (node) => node.id === currentEdge?.target && node.type !== "plus"
    );
  }
};

const executeNode = async function (customerBot, message, conversation) {
  const nodeIndex = customerBot.nodes.findIndex(
    (node) => node.id === customerBot.current_node_id
  );

  if (nodeIndex > -1) {
    const node = customerBot.nodes[nodeIndex];

    console.log("executing", node.type);
    //done boolean indicate if moving forward, or staying on the same node.
    // sourceHandle if node have multiply sourceHandle
    // targetId if node have one sourceHandle with multiply nodes
    const { updatedNode, done, sourceHandle, targetId } =
      await context.functions.execute(nodeTypes[node.type], {
        bot: customerBot._id,
        node,
        message,
        conversation,
      });

    customerBot.status = "waiting";
    customerBot.nodes[nodeIndex] = updatedNode;
    customerBot.updated_at = Math.floor(Date.now() / 1000);

    console.log("finished with", done, sourceHandle);

    if (done) {
      const nextNodeIndex = findNextNode(
        customerBot,
        customerBot.nodes[nodeIndex],
        sourceHandle,
        targetId
      );
      console.log("found nextNodeIndex", nextNodeIndex);
      if (nextNodeIndex > -1) {
        console.log(
          "moving to next node",
          customerBot.nodes[nextNodeIndex].type
        );
        customerBot.current_node_id = customerBot.nodes[nextNodeIndex].id;
        customerBot = await executeNode(customerBot, message, conversation);
      } else {
        customerBot.status = "complete";
      }
    } else {
      console.log("waiting on response", updatedNode.type);
    }
  }
  return customerBot;
};

exports = async function (arg) {
  const { conversation, message } = arg;

  const serviceName = "mongodb-atlas";
  const customerBotCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("CustomerBot");

  const customerBot = await customerBotCollection.findOne({
    customer_phone_number: conversation.customer_phone_number,
    business_phone_number_id: conversation.business_phone_number_id,
    status: {
      $ne: "complete",
    },
  });

  if (customerBot) {
    const result = await executeNode(customerBot, message, conversation);

    await customerBotCollection.updateOne(
      { _id: customerBot._id },
      { $set: customerBot }
    );
  }
};
