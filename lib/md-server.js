const program = require('commander')

let p = program
  .command('start', 'start server')
  .command('init', 'create .mdconfig.yml file')
  .parse(process.argv);

