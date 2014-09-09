#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
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
    ws.receive(call);
  });
}
module.exports.pull = pull;

function save(path,data,info,call) {
  // Saves specified worksheet data to disk.
  // Requires:
  //  path - Base directory
  //  data - Worksheet data
  //  info - Worksheet info
  //  call - Callback taking err

  // TODO make spreadsheet directory
  // TODO write JSON formatted worksheet data

  console.dir(data);
  console.dir(info);
  call(null);
}
module.exports.save = save;

function create_dir(info,callback) {
  // Make spreadsheet-unique directory if necessary.
  fs.exists(info.spreadsheetId,function mkdir(exists) {
    exists ? util.debug(util.format('%s exists - using',info.spreadsheetId))
           : fs.mkdirSync(info.spreadsheetId);
  });
}

function worksheet_write(path,rows) {
  // Write rows out to worksheet-named file.
  fs.writeFile(path,JSON.stringify(rows),function(err) {
    if (err) { throw err; }
  });
}
