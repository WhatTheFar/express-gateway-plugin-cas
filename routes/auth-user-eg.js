const passport = require('../config/passport')
const middlewares = require('../config/middlewares')
const asyncifyHandler = require('../utils/async-handler')
const User = require('../models/user-model')

module.exports = gatewayExpressApp => {
	gatewayExpressApp.post(
		'/auth/user',
		asyncifyHandler(async (req, res, next) => {
			try {
				const user = await User.create({
					...req.body
				})
				return res.json(user)
			} catch (error) {
				next(error)
			}
		})
	)
}
