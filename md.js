#!/usr/bin/env node
process.env.SUPPRESS_NO_CONFIG_WARNING=1
const program = require('commander');
const chalk = require('chalk')
const mdServer = require('./src/md-server')
const pjson = require('./package.json')


program
  .version(pjson.version)
  .option('-s, --server', 'run md-server ')
  .option('-p, --port [port]', 'Port of the md-server', 10000)
  .option('-w, --wport [port]', 'Port of the web client', 10001)
  .option('-u, --ui [type]', 'Specify location of the md-web-client')
  .parse(process.argv);

if (program.server) {
  mdServer.run(program)
} else {
  console.log(chalk.yellow('Nothing to run, use -s'))
  program.help()
}


