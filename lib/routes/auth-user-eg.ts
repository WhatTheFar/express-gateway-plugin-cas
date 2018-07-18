import { Application } from 'express-serve-static-core';
import User from '../models/user-model';
import { jsonMiddleware } from './../config/middlewares';
import { asyncifyHandler } from './../utils/async-handler';

export default (gatewayExpressApp: Application) => {
	gatewayExpressApp.post(
		'/auth/user',
		jsonMiddleware,
		asyncifyHandler(async (req, res, next) => {
			try {
				const user = await User.create({
					...req.body
				});
				return res.json(user);
			} catch (error) {
				next(error);
			}
		})
	);
};
