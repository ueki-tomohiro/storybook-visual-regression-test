const fs = require("fs");

fs.readFile("lerna.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err);
    return;
  }

  const packageJson = JSON.parse(data);
  const version = packageJson.version;
  console.log(version);
});
