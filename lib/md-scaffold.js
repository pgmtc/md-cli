#!/usr/bin/env node
const inquirer = require('inquirer');
const stringUtils = require('./utils/string-utils')
process.env.SUPPRESS_NO_CONFIG_WARNING=1
const program = require('commander');
const CliTemplate = require('@pgmtc/md-cli-template').default


let p = program
  .option('-o, --output [id]', 'Both id and output location')
  .option('--template [template]', 'Template to use (vue-portlet, js-portlet, ...)')
  .option('--portletid [id]', 'Portlet ID')
  .option('--portletname [name]', 'Portlet Name')
  .parse(process.argv);

if (!p.output) {
  console.log('Missing output directory. Provide this with -o parameter')
  return
}

let prompts = []
if (!p.portletid) {
  prompts.push({
    type: 'input',
    name: 'id',
    message: "Enter portlet ID"
  })
}
if (!p.portletname) {
  prompts.push({
    type: 'input',
    name: 'name',
    message: "Enter portlet name"
  })
}
if (!p.template) {
  prompts.push({
    type: 'list',
    name: 'template',
    message: 'Select template',
    choices: ['vue-portlet'],
    filter: function(val) {
      return val.toLowerCase();
    }
  })
}

inquirer
  .prompt(prompts)
  .then(answers => {
    if (answers.id.length > 1) {
      answers.idUpper = answers.id.substr(0, 1).toUpperCase() + answers.id.substr(1, answers.id.length)
      answers.idDash = stringUtils.camelToDash(answers.id)
    }
    console.log(answers)
    const tpl = new CliTemplate()
    tpl.process(answers, p.output)
  });






