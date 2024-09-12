exports = async function (responseJson) {
  try {
    return convertValueToCorrectType(responseJson);
  } catch (error) {
    console.error(error.message);
  }
};

function convertValueToCorrectType(data) {
  const result = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key);
      const item = data[key];

      if (item && typeof item === "object" && item.type && item.value) {
        // Process the value based on its type
        switch (item.type) {
          case "number":
            result[key] = {
              ...item,
              value: Number(item.value),
            };
            if (isNaN(result[key].value)) {
              throw new Error(
                `Value for key '${key}' cannot be converted to a number.`
              );
            }
            break;
          case "string":
            result[key] = {
              ...item,
              value: String(item.value),
            };
            break;
          // Add more cases if needed for other types
          default:
            throw new Error(`Unknown type '${item.type}' for key '${key}'.`);
        }
      } else if (item && typeof item === "object" && item !== null) {
        // Recursively process nested objects
        console.log(key);
        result[key] = convertValueToCorrectType(item);
      } else {
        console.log(key);
        // Copy the value as is if it doesn't match the expected structure
        result[key] = item;
      }
    }
  }

  console.log(JSON.stringify(result, null, 2));
  return result;
}
