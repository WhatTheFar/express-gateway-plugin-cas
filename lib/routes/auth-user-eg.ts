import { Application } from 'express-serve-static-core';
import { apiKeyAuthorize } from '../middleware/authentication';
import User from '../models/user-model';
import { corsMiddleware, jsonMiddleware } from './../middleware';
import { asyncifyHandler } from './../utils/async-handler';
import { ResponseUtil } from './../utils/response-util';

export default (gatewayExpressApp: Application) => {
	gatewayExpressApp.options('/auth/user', corsMiddleware);
	gatewayExpressApp.options('/auth/user/*', corsMiddleware);

	gatewayExpressApp.get(
		'/auth/user',
		corsMiddleware,
		apiKeyAuthorize,
		asyncifyHandler(async (req, res, next) => {
			try {
				const users = await User.findAll();
				return res.json(users);
			} catch (error) {
				next(error);
			}
		})
	);

	gatewayExpressApp.get(
		'/auth/user/:username',
		corsMiddleware,
		apiKeyAuthorize,
		asyncifyHandler(async (req, res, next) => {
			const username = req.params.username;
			try {
				const user = await User.findOne({ where: { username } });
				if (!user) {
					return ResponseUtil.sendInvalidId(res);
				}
				return res.json(user);
			} catch (error) {
				next(error);
			}
		})
	);

	gatewayExpressApp.post(
		'/auth/user',
		corsMiddleware,
		jsonMiddleware,
		apiKeyAuthorize,
		asyncifyHandler(async (req, res, next) => {
			try {
				const user = await User.create({
					...req.body
				});
				return res.json(user);
			} catch (error) {
				return ResponseUtil.sendDuplicateKeyError(res, 'Username is invalid');
			}
		})
	);

	gatewayExpressApp.delete(
		'/auth/user/:username',
		corsMiddleware,
		apiKeyAuthorize,
		asyncifyHandler(async (req, res, next) => {
			const row = await User.destroy({ where: { username: req.params.username } });
			if (row > 0) {
				return res.send('Success');
			}
			return ResponseUtil.sendInvalidId(res);
		})
	);
};
