const passport = require('../config/passport')

module.exports = gatewayExpressApp => {
	gatewayExpressApp.get(
		'/auth/token',
		passport.authenticate('basic-plugin', { session: false }),
		(req, res, next) => {
			const token = req.user.generateAuthToken()
			res.json({ token })
		}
	)
}
