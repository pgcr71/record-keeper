const fs = require("fs");
fs.readFile("ormconfig.js", "utf8", (err, data) => {
  var formatted = data.replace(/const isDev = false;/g, "const isDev = true;");

  fs.writeFile("ormconfig.js", formatted, "utf8", (err) => console.log(err));
});
