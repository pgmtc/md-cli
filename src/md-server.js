const chalk = require('chalk')
const MdServer = require('@pgmtc/md-server').default
const MdWebClient = require('@pgmtc/md-web-client')
const config = require('./md-config')
const log = console.log

module.exports = {
  run: function(p) {
    log(chalk.blue('Running md-server'))

    const PORT = p.port
    const WEBCLIENT_PORT = p.wport

    const mdServer = new MdServer(config)
    const mdWebClient = new MdWebClient()
    mdServer.DISABLE_AUTH = 1
    mdServer.DISABLE_NATS = 0
    mdServer.DISABLE_PROXY = 0
    mdServer.DISABLE_SOCKETS = 0
    mdServer.PORT = PORT
    mdServer.WEB_CLIENT = `http://localhost:${WEBCLIENT_PORT}`

    mdServer.listen()
    mdWebClient.listen(WEBCLIENT_PORT)

  }
}
