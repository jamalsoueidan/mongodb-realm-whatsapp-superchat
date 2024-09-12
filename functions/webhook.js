exports = function ({ query, headers, body }, response) {
  const challenge = Number(query["hub.challenge"]);

  if (challenge) {
    return challenge;
  }

  const reqBody = body.text();

  function parseNestedJson(data) {
    if (typeof data === "object" && data !== null) {
      for (let key in data) {
        if (typeof data[key] === "string") {
          try {
            let nestedJson = JSON.parse(data[key]);
            data[key] = nestedJson;
            // Recursively parse the nested JSON
            parseNestedJson(nestedJson);
          } catch (e) {
            // Not a JSON string, continue
          }
        } else if (typeof data[key] === "object") {
          parseNestedJson(data[key]);
        }
      }
    }
  }

  let decodedJson = JSON.parse(reqBody);
  parseNestedJson(decodedJson);

  const doc = context.services
    .get("mongodb-atlas")
    .db("cloudapi")
    .collection("Data")
    .insertOne(decodedJson);

  return doc;
};
