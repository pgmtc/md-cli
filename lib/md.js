#!/usr/bin/env node
process.env.SUPPRESS_NO_CONFIG_WARNING=1
const program = require('commander');
const pjson = require('../package.json')

program
  .version(pjson.version)
  .command('server', 'server [action]')
  .parse(process.argv);
