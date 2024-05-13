const fs = require("fs");
const dir = process.argv;

fs.readdir(dir[2], "utf8", function doneReading(err, data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].split(".").slice(1) == dir[3]) {
      console.log(data[i]);
    }
  }
});
