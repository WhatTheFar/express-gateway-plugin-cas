import { Application, NextFunction, Request, Response } from 'express-serve-static-core';
import passport from '../config/passport';
import {
	corsMiddleware,
	jsonMiddleware,
	middlewares,
	passportMiddlewares,
	urlencodedMiddleware
} from './../middleware';
import { getRefreshTokenCallback } from './../utils/passport-util';
import { generateAuthToken } from './../utils/user-util';

export default (gatewayExpressApp: Application) => {
	gatewayExpressApp.options('/auth/token', corsMiddleware);
	gatewayExpressApp.options('/auth/login', corsMiddleware);
	gatewayExpressApp.options('/auth/logout', corsMiddleware);

	gatewayExpressApp.get(
		'/auth/token',
		corsMiddleware,
		passport.authenticate('basic-plugin', { session: false }),
		(req: Request, res: Response, next: NextFunction) => {
			const user = req.user as UserInstance;
			const token = generateAuthToken(user);
			res.json({ token });
		}
	);

	gatewayExpressApp.post(
		'/auth/token',
		corsMiddleware,
		jsonMiddleware,
		urlencodedMiddleware,
		passport.authenticate('local-plugin', { session: false }),
		(req: Request, res: Response, next: NextFunction) => {
			const user = req.user as UserInstance;
			const token = generateAuthToken(user);
			res.json({ token });
		}
	);

	gatewayExpressApp.post(
		'/auth/refresh',
		corsMiddleware,
		jsonMiddleware,
		urlencodedMiddleware,
		(req: Request, res: Response, next: NextFunction) => {
			passport.authenticate(
				'jwt-plugin',
				{ session: false },
				getRefreshTokenCallback(req, res, next)
			)(req, res, next);
		}
	);

	gatewayExpressApp.get(
		'/auth/login',
		corsMiddleware,
		middlewares,
		passport.authenticate('basic-plugin'),
		(req: Request, res: Response, next: NextFunction) => {
			res.send('Success');
		}
	);

	gatewayExpressApp.post(
		'/auth/login',
		corsMiddleware,
		middlewares,
		passport.authenticate('local-plugin'),
		(req: Request, res: Response, next: NextFunction) => {
			res.send('Success');
		}
	);

	gatewayExpressApp.get(
		'/auth/logout',
		corsMiddleware,
		passportMiddlewares,
		(req: Request, res: Response) => {
			req.logout();
			res.send('Success');
		}
	);
};
