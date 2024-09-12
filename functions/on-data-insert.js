exports = async function (changeEvent) {
  const value = changeEvent.fullDocument.entry[0].changes[0].value;
  if (value.messages) {
    const type = value.messages[0].type;
    const type_exec = {
      text: "on-data-insert-received-text",
      image: "on-data-insert-received-media",
      audio: "on-data-insert-received-media",
      document: "on-data-insert-received-media",
      video: "on-data-insert-received-media",
      interactive: "on-data-insert-received-interactive-reply",
    };
    console.log(type_exec[type], type);
    await context.functions.execute(type_exec[type], changeEvent);
  } else if (value.statuses) {
    const status = value.statuses[0].status;
    console.log("status", status);
    await context.functions.execute(
      "on-data-insert-received-status",
      changeEvent
    );
  }
};
