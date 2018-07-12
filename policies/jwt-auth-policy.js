// @ts-check
/// <reference path="../node_modules/express-gateway/index.d.ts" />

const passport = require('../config/passport')

/** @type {ExpressGateway.Policy} */
const policy = {
	name: 'jwt-auth',
	policy: actionParams => {
		console.log('jwt policy')
		return (req, res, next) => {
			// TODO: add custom callback
			passport.authenticate('jwt', { session: false })(req, res, next)
		}
	}
}

module.exports = policy
