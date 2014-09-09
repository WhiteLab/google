var minimist = require('minimist');

function usage() {
  // Resolve name of script.
  basename = require('path').basename(process.argv[1])

  // Print usage message.
  console.error("Usage:");
  console.error(require('util').format('  %s [<option>]* [<arg>]*',basename));
  console.error()
  console.error('Options:');
  console.error('  -h         : Print this help message.');
  console.error('  -k <key>   : Use specified private key.');
  console.error('  -u <user>  : Use specified username.');
  console.error('  -o <dir>   : Base directory for output.');
  console.error();
  console.error('Positional arguments:');
  console.error('  <ss>     : Spreadsheet to pull.');
  console.error('  [<ws>]+  : Worksheet(s) to pull.');
}

function parse(call) {
  // Parse arguments.
  var args = minimist(process.argv.slice(2));

  // Check for help flag.
  if (args.h) { usage(); call(1); }

  // Check for key file.
  if ( typeof args.k !== 'string' ) { call('private key file must be specified'); }

  // Check for username.
  if ( typeof args.u !== 'string' ) { call('username must be specified'); }

  // Check that the spreadsheet has been specified.
  if (args._.length < 1) { call('spreadsheet name must be specified'); }

  // Check that one or more worksheets are specified.
  if (args._.length < 2) { call('one or most worksheet names must be specified'); }

  // Check that the output directory is a string.
  if ( args.o && typeof args.o !== 'string' ) { call('output directory must be a string'); }

  // Call back with parsed arguments.
  call(null,
    args.u, // User ID
    args.k, // Key File
    args._[0], // Spreadsheet Name
    args._.slice(1), // Worksheets
    typeof args.o !== 'string' ? '.' : args.o // Output dir
  );
}
module.exports.parse = parse;
