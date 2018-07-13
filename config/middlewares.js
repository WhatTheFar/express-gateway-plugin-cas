const session = require('express-session')
const passport = require('./passport')
const bodyParser = require('body-parser')

const middlewares = [
    session({ secret: 'session_secret' }),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    passport.initialize(),
    passport.session()
]

module.exports = middlewares