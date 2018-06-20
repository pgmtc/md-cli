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
    mdServer.DISABLE_AUTH = !p.auth
    mdServer.DISABLE_NATS = !p.nats
    mdServer.DISABLE_PROXY = !p.proxy
    mdServer.DISABLE_SOCKETS = 0
    mdServer.PORT = PORT
    mdServer.WEB_CLIENT = `http://localhost:${WEBCLIENT_PORT}`

    mdServer.GOOGLE_CLIENT_ID = p.authClient
    mdServer.GOOGLE_CLIENT_SECRET = p.authSecret
    mdServer.AUTH_CALLBACK_URL = p.authCallback

    console.log(p.portlet)

    return

    mdServer.listen()
    mdWebClient.listen(WEBCLIENT_PORT)

  }
}
