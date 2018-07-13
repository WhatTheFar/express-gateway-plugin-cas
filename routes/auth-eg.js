const passport = require('../config/passport')
const middlewares = require('../config/middlewares')

module.exports = gatewayExpressApp => {
	gatewayExpressApp.get(
		'/auth/token',
		middlewares,
		passport.authenticate('basic-plugin', { session: false }),
		(req, res, next) => {
			const token = req.user.generateAuthToken()
			res.json({ token })
		}
	)
}
