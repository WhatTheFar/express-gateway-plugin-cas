const session = require('express-session')
const passport = require('../config/passport')
const bodyParser = require('body-parser')

module.exports = gatewayExpressApp => {
    gatewayExpressApp.use(session({ secret: 'session_secret' }))
    gatewayExpressApp.use(bodyParser.urlencoded({ extended: false }));
    gatewayExpressApp.use(passport.initialize())
    gatewayExpressApp.use(passport.session())
}
