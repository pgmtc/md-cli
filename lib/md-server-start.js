const chalk = require('chalk')
const MdServerRun = require('@pgmtc/md-server').default
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
  .option('-p, --port [port]', 'Port of the md-server')
  .option('-w, --web-client-port [port]', 'Port of the web client')
  .option('-n, --nats [server]', 'NATS server url', 0)
  .option('-a, --auth', 'Enable authentication', 0)
  .option('-x, --proxy', 'Enable http proxy', 0)
  .option('--auth-client [param]', 'Auth client ID')
  .option('--auth-secret [param]', 'Auth client secret')
  .option('--auth-callback-url [param]', 'Auth callback url', 'http://localhost:8080')
  .parse(process.argv);

const configPath = path.join(process.cwd(), p.config)
if (!fs.existsSync(configPath)) {
  log(chalk.red(`Config file ${configPath} does not exist. Generate new one using md server init`))
  return
}

var config = YAML.load(configPath)

// Run the server
log(chalk.blue('Running md-server'))
const mdServer = new MdServerRun(config)
const mdWebClient = new MdWebClient()
mdServer.DISABLE_AUTH = config.disableAuth && !p.auth
mdServer.DISABLE_NATS = config.disableNats && !p.nats
mdServer.DISABLE_PROXY = config.disableProxy && !p.proxy
mdServer.PORT = p.port || config.port || 10000
const WEBCLIENT_PORT = p.webClientPort || config.webClientPort || 10001
mdServer.WEB_CLIENT = `http://localhost:${WEBCLIENT_PORT}`

mdServer.GOOGLE_CLIENT_ID = p.authClient || config.authClient
mdServer.GOOGLE_CLIENT_SECRET = p.authSecret || config.authSecret
mdServer.AUTH_CALLBACK_URL = p.authCallbackUrl || config.authCallbackUrl

mdServer.listen()
mdWebClient.listen(WEBCLIENT_PORT)

