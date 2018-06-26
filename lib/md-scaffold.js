#!/usr/bin/env node
process.env.SUPPRESS_NO_CONFIG_WARNING=1
const program = require('commander');
const CliTemplate = require('@pgmtc/md-cli-template').default


let p = program
  .option('-o, --output [id]', 'Both id and output location')
  .option('-t, --template [template]', 'Template to use (vue-portlet, js-portlet, ...)')
  .parse(process.argv);

let properties = {
  id: 'fromCli'
}

if (!p.output) {
  console.log('Missing output directory. Provide this with -o parameter')
  return
}

if (!p.template) {
  console.error('Missing template property. Provide this with -t parameter')
  return
}

const tpl = new CliTemplate(p.template)
tpl.process(properties, p.output)



