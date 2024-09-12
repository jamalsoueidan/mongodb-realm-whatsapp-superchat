exports = async function (arg) {
  const serviceName = "mongodb-atlas";

  const messageCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Message");

  const customerBotCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("CustomerBot");

  const { node, message, conversation, rerun, bot } = arg;

  const customerBot = await customerBotCollection.findOne({
    _id: bot,
  });

  const edgesConnectedChat = customerBot.edges.filter(
    (edge) => edge.source === node.id
  );

  // Find all nodes connected to the node (based on edges)
  const nodesConnectedChat = customerBot.nodes.filter((nodeItem) =>
    edgesConnectedChat.some((edge) => edge.target === nodeItem.id)
  );

  try {
    const { trigger } = node.data;

    await messageCollection.updateOne(
      {
        _id: message._id,
      },
      { $set: { bot } }
    );

    console.log("on-bots-chat init", node.id);

    const chatgptResponse = await chatgpt(
      message.text?.body,
      nodesConnectedChat
    );

    const result = await messageCollection.insertOne({
      message_id: "not_send_yet",
      conversation: message.conversation,
      business_phone_number_id: message.business_phone_number_id,
      recipient: conversation.customer_phone_number,
      timestamp: Math.floor(Date.now() / 1000),
      statuses: [],
      bot,
      type: "text",
      text: {
        body: JSON.parse(chatgptResponse.choices[0].message.content).message,
      },
    });

    const targetId = JSON.parse(
      chatgptResponse.choices[0].message.content
    ).node_id;
    node.data.trigger = {
      status: "waiting",
      created_at: Math.floor(Date.now() / 1000),
      updated_at: null,
      count: (trigger?.count || 0) + 1,
      waiting: {
        message: result.insertedId.toString(),
        chat: [chatgptResponse],
      },
    };

    return { updatedNode: node, done: !!targetId, targetId };
  } catch (err) {
    console.log("Error on-bots-chat:", err.message);
  }
};

async function chatgpt(content, nodes) {
  console.log(
    `You are an assistant for a service. Respond naturally based on the user's input or trigger available nodes to perform actions like sending information, interactive lists, or initiating flows. When user input matches a node, reply with the node ID and a brief message to be sent to the user. Keep your tone friendly and match the user's language. If the user asks what you can do, briefly describe the nodes, e.g., "I can help you book a table or share our location." The available nodes are ${JSON.stringify(
      nodes
    )}.`
  );
  const request = await context.http.post({
    url: `https://api.openai.com/v1/chat/completions`,
    body: {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an assistant for a service. Based on the user's input, respond naturally and trigger available nodes to perform actions like sending information or initiating flows. When a node matches, provide a short, friendly message like "I’ll send that to you now," and return the node ID, but don't send any specific information from the node itself. The system will handle the action based on the node ID. Match the user’s language and keep responses concise. If the user asks what you can do, briefly describe the nodes, e.g., "I can help you book a table or send our location."" The available nodes are ${JSON.stringify(
            nodes
          )}.`,
        },
        { role: "user", content },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "response",
          schema: {
            type: "object",
            properties: {
              node_id: { type: "string" },
              message: { type: "string" },
            },
            required: ["node_id", "message"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    },
    headers: {
      Authorization: [`Bearer `],
    },
    encodeBodyAsJSON: true,
  });

  const response = JSON.parse(request.body.text());

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
}
