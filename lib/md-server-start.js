const chalk = require('chalk')
const MdServer = require('@pgmtc/md-server').default
const MdWebClient = require('@pgmtc/md-web-client')
const program = require('commander')
const path = require('path')
const YAML = require('yamljs')
const log = console.log
var fs = require('fs');

function collect(val, values) {
  values.push(val);
  return values;
}

let p = program
  .option('-c, --config [file]', 'Configuration file (yaml)', '.mdconfig.yml')
  // .option('-p, --port [port]', 'Port of the md-server')
  // .option('-w, --web-client-port [port]', 'Port of the web client')
  // .option('-n, --nats [server]', 'NATS server url', 0)
  // .option('-a, --auth', 'Enable authentication', 0)
  // .option('-x, --proxy', 'Enable http proxy', 0)
  // .option('-s, --storage', 'Enable mongoDb storage', 0)
  // .option('--mongodb-url [param]', 'Mongo DB location')
  // .option('--auth-client [param]', 'Auth client ID')
  // .option('--auth-secret [param]', 'Auth client secret')
  // .option('--auth-callback-url [param]', 'Auth callback url', 'http://localhost:8080')
  .parse(process.argv);

const configPath = path.join(process.cwd(), p.config)
if (!fs.existsSync(configPath)) {
  log(chalk.red(`Config file ${configPath} does not exist. Generate new one using md server init`))
  return
}

var config = YAML.load(configPath)

// Run the server
log(chalk.blue('Running md-server'))
if (!config.WEB_CLIENT && config.WEB_CLIENT_PORT) {
  log(chalk.blue(`External WEB_CLIENT not provided, spinning embedded server on port ${config.WEB_CLIENT_PORT}`))
  config.WEB_CLIENT = `http://localhost:${config.WEB_CLIENT_PORT}`
}

const mdServer = new MdServer(config)
const mdWebClient = new MdWebClient()

mdServer.listen()
mdWebClient.listen(config.WEB_CLIENT_PORT)

