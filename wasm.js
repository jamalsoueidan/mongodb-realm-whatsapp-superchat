// scripts/copy-file.js
const fs = require("fs");
const path = require("path");

const sourcePath = path.resolve(
  __dirname,
  "node_modules/realm/dist/realm-js-wasm.wasm"
);
const destinationPath = path.resolve(
  __dirname,
  "node_modules/.vite/deps/realm-js-wasm.wasm"
);

fs.copyFile(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error("Error copying file:", err);
  } else {
    console.log("File copied successfully!");
  }
});
