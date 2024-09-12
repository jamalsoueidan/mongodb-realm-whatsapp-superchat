exports = async function (arg) {
  const serviceName = "mongodb-atlas";

  const messageCollection = context.services
    .get(serviceName)
    .db("cloudapi")
    .collection("Message");

  const { node, message, conversation } = arg;

  try {
    const { trigger, whatsapp } = node.data;

    console.log("on-bots-start init", node.id);

    node.data.trigger = {
      status: "done",
      done: { message: message._id },
    };

    return {
      updatedNode: node,
      done: true,
      source: node.id,
    };
  } catch (err) {
    console.log("Error on-bots-start:", JSON.stringify(err));
  }
};
