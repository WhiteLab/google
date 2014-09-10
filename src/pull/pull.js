var Spreadsheet = require('edit-google-spreadsheet');

function pull(ss,ws,uid,key,call) {
  // Returns a given worksheet in JSON format.
  // Requires:
  //  ss    - Spreadsheet ID
  //  ws    - Worksheet ID
  //  uid   - User ID
  //  key   - Private key filename
  //  call  - Callback taking err,data,info

  Spreadsheet.load({
    debug: true,
    spreadsheetName: ss,
    worksheetName: ws,
    oauth: {
      email: uid,
      keyFile: key,
    }
  },function (err,ws) {
    if (err) { call(err); }
    else { ws.receive({"getValues":true},call); }
  });
}
module.exports.pull = pull;
