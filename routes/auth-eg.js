const passport = require('../config/passport')
const {
	jsonMiddleware,
	urlencodedMiddleware,
	middlewares
} = require('../config/middlewares')

module.exports = gatewayExpressApp => {
	gatewayExpressApp.get(
		'/auth/token',
		passport.authenticate('basic-plugin', { session: false }),
		(req, res, next) => {
			const token = req.user.generateAuthToken()
			res.json({ token })
		}
	)

	gatewayExpressApp.post(
		'/auth/token',
		jsonMiddleware,
		urlencodedMiddleware,
		passport.authenticate('local-plugin', { session: false }),
		(req, res, next) => {
			const token = req.user.generateAuthToken()
			res.json({ token })
		}
	)

	gatewayExpressApp.post(
		'/auth/login',
		middlewares,
		passport.authenticate('local-plugin'),
		(req, res, next) => {
			res.send('Success')
		}
	)
}
