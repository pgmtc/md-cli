const program = require('commander')
const YAML = require('yamljs')
const path = require('path')
const chalk = require('chalk')
var fs = require('fs');
const log = console.log
const appDir = path.dirname(require.main.filename)
const curDir = process.cwd()

let p = program
  .option('-c, --config [file]', 'Configuration file to generate', '.mdconfig.yml')
  .option('-f, --force', 'Force rewriting existing file', false)
  .parse(process.argv);

const configPath = path.join(process.cwd(), p.config)
if (fs.existsSync(configPath) && !p.force) {
  log(chalk.red(`Error: file ${configPath} already exists`))
  log(chalk.red(`Delete the file or provide filename by using -c [filename]`))
  return
}

let emptyConfig = YAML.load(path.join(appDir, 'template', 'server-config.yml'))
fs.writeFileSync(configPath, YAML.stringify(emptyConfig, 4, 2))

log(chalk.green(`File written into ${configPath}`))
