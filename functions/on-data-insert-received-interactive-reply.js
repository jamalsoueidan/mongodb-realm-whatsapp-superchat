exports = async function (changeEvent) {
  const docId = changeEvent.documentKey._id;

  const serviceName = "mongodb-atlas";
  const databaseName = "cloudapi";
  const collection = context.services
    .get(serviceName)
    .db(databaseName)
    .collection("Message");

  try {
    const entry = changeEvent.fullDocument.entry[0];
    const change = entry.changes[0];
    const value = change.value;
    const message = value.messages[0];
    const business_phone_number_id = value.metadata.phone_number_id.toString();
    const context_id = message.context.id;

    const resultConversation = await context.functions.execute(
      "private-create-conversation",
      changeEvent
    );

    const resultMessage = await collection.findOne({ message_id: context_id });
    if (resultMessage) {
      await collection.updateOne(
        { message_id: context_id },
        {
          $push: {
            statuses: {
              status: "replied",
              timestamp: message.timestamp,
            },
          },
        }
      );
    }

    // for flow-list
    if (resultMessage.interactive.type === "flow") {
      const flow = await context.functions.execute("func-flow-get", {
        business_phone_number_id,
        flow_id: resultMessage.interactive.action.parameters.flow_id,
      });

      const flow_name = flow.name;
      const interactive_reply = convertValuesToType(
        message.interactive.nfm_reply.response_json
      );

      await collection.insertOne({
        message_id: message.id,
        ...(resultMessage ? { reply: resultMessage._id } : {}), //in case we send the flow from official whatsapp manager facebook (Send Flow), then we wouldn't have a message parent.
        bot: resultMessage.bot,
        business_phone_number_id,
        conversation: resultConversation._id,
        recipient: value.metadata.display_phone_number.toString(),
        timestamp: message.timestamp,
        interactive_reply: {
          flow_name,
          [flow_name]: interactive_reply, // do we really need this?
          type: "flow_reply",
        },
        type: "interactive_reply", //message.type,
      });

      return await collection.insertOne({
        business_phone_number_id,
        message_id: "not_send_yet",
        conversation: resultConversation._id,
        recipient: resultConversation.customer_phone_number,
        timestamp: message.timestamp + 5, //add +5 sec just so it comes after the reply in the app
        statuses: [],
        type: "text",
        hidden: true, //we dont want to show in the app, only send to user so he can see his reply!
        bot: resultMessage.bot,
        text: {
          preview_url: true,
          body: createMessage(interactive_reply),
        },
      });
    } else {
      console.log("else", message.interactive.type); //button, list_reply
      await collection.insertOne({
        message_id: message.id,
        bot: resultMessage.bot,
        ...(resultMessage ? { reply: resultMessage._id } : {}), //in case we send the flow from official whatsapp manager facebook (Send Flow), then we wouldn't have a message parent.
        business_phone_number_id,
        conversation: resultConversation._id,
        recipient: value.metadata.display_phone_number.toString(),
        timestamp: message.timestamp + 5,
        interactive_reply: message.interactive,
        type: "interactive_reply", //message.type,
      });
    }
  } catch (err) {
    console.log("on-received-interactive error: ", err.message);
  }
};

function createMessage(obj) {
  let message = "\r";

  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    // Check if the item contains both `question` and `value` properties
    if (
      item &&
      typeof item === "object" &&
      "question" in item &&
      "value" in item
    ) {
      let value = item.value;

      // If the type is date, convert the value to a formatted date string
      if (item.type === "date") {
        const date = new Date(item.value);
        date.setHours(date.getHours() + 4); //just to make sure the day switch to next day.
        value = date.toLocaleDateString();
      }

      message += `${item.question}\n\r${value}\n\n\r`;
    }
  });

  return message;
}

function convertValuesToType(obj) {
  // Create a new object to store the converted values
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const item = obj[key];

    // Check if the item contains both `type` and `value` properties
    if (item && typeof item === "object" && "type" in item && "value" in item) {
      // Copy the original properties
      newObj[key] = { ...item };

      // Convert the value based on its type
      switch (item.type) {
        case "number":
          newObj[key].value = Number(item.value);
          break;
        case "date":
          newObj[key].value = Number(item.value);
          break;
        case "string":
          newObj[key].value = String(item.value);
          break;
        // Add other cases for different types if needed
        default:
          newObj[key].value = item.value; // Keep the value unchanged if no matching type
          break;
      }
    } else {
      // If it doesn't follow the `type` and `value` rule, copy it as is
      newObj[key] = item;
    }
  });

  return newObj;
}
