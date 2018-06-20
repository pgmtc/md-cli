#!/usr/bin/env node
process.env.SUPPRESS_NO_CONFIG_WARNING=1
const program = require('commander');
const chalk = require('chalk')
const mdServer = require('./src/md-server')
const pjson = require('./package.json')

function collect(val, values) {
  values.push(val);
  return values;
}
program
  .version(pjson.version)
  .option('-l, --listen [port]', 'Port of the md-server', 8080)
  .option('-w, --wport [port]', 'Port of the web client', 8081)
  .option('-n, --nats', 'Enable NATS', 0)
  .option('-x, --proxy', 'Enable HTTP proxy', 0)
  .option('-a, --auth', 'Enable authentication', 0)
  .option('--auth-client [param]', 'Auth client ID')
  .option('--auth-secret [param]', 'Auth client secret')
  .option('--auth-callback [param]', 'Auth callback url', 'http://localhost:8080')
  .option('-p, --portlet [value]', 'A repeatable value', collect, [])
  .option('-u, --ui [type]', 'Specify location of the md-web-client')
  .parse(process.argv);

mdServer.run(program)

