const session = require('express-session')
const passport = require('./passport')
const bodyParser = require('body-parser')

const jsonMiddleware = bodyParser.json()
const urlencodedMiddleware = bodyParser.urlencoded({ extended: false })
const passportMiddlewares = [
    session({ secret: 'session_secret' }), 
    passport.initialize(),
	passport.session()
]

const middlewares = [
    jsonMiddleware,
    urlencodedMiddleware,
    ...passportMiddlewares
]

module.exports = {
    jsonMiddleware,
    urlencodedMiddleware,
    passportMiddlewares,
    middlewares
}
