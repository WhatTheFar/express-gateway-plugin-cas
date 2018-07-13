// @ts-check
/// <reference path="../node_modules/express-gateway/index.d.ts" />

const passport = require('../config/passport')

/** @type {ExpressGateway.Policy} */
const policy = {
	name: 'local-auth',
	policy: actionParams => {
		return (req, res, next) => {
			// TODO: add custom callback
			passport.authenticate('local-plugin', { session: false })(req, res, next)
		}
	}
}

module.exports = policy
