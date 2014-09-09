var fs = require('fs');

function save(path,data,call) {
  // Saves specified worksheet data to disk.
  // Requires:
  //  path - Base directory
  //  data - Worksheet data
  //  call - Callback taking err

  fs.writeFile(path,JSON.stringify(data),call);
}
module.exports.save = save;
