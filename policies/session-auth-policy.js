// @ts-check
/// <reference path="../node_modules/express-gateway/index.d.ts" />

const { passportMiddlewares } = require('../config/middlewares')
const invokeMiddleware = require('../utils/invokeMiddleware')

/** @type {ExpressGateway.Policy} */
const policy = {
	name: 'session-auth',
	policy: actionParams => {
		return (req, res, next) => {
			console.log('session policy')
			invokeMiddleware(passportMiddlewares, req, res)
				.then(() => {
					if (!req.user) {
						return res.send('unauthorized')
					}
					next()
				})
				.catch(err => {
					console.log(err)
					next(err)
				})
		}
	}
}

module.exports = policy
