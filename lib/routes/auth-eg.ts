import { Application, NextFunction, Request, Response } from 'express-serve-static-core';
import passport from '../config/passport';
import User from '../models/user-model';
import {
	jsonMiddleware,
	middlewares,
	passportMiddlewares,
	urlencodedMiddleware
} from './../middleware';

export default (gatewayExpressApp: Application) => {
	gatewayExpressApp.get(
		'/auth/token',
		passport.authenticate('basic-plugin', { session: false }),
		(req, res, next) => {
			const user = req.user as User;
			const token = user.generateAuthToken();
			res.json({ token });
		}
	);

	gatewayExpressApp.post(
		'/auth/token',
		jsonMiddleware,
		urlencodedMiddleware,
		passport.authenticate('local-plugin', { session: false }),
		(req: Request, res: Response, next: NextFunction) => {
			const user = req.user as User;
			const token = user.generateAuthToken();
			res.json({ token });
		}
	);

	gatewayExpressApp.get(
		'/auth/login',
		middlewares,
		passport.authenticate('basic-plugin'),
		(req: Request, res: Response, next: NextFunction) => {
			res.send('Success');
		}
	);

	gatewayExpressApp.post(
		'/auth/login',
		middlewares,
		passport.authenticate('local-plugin'),
		(req: Request, res: Response, next: NextFunction) => {
			res.send('Success');
		}
	);

	gatewayExpressApp.get(
		'/auth/logout',
		passportMiddlewares,
		(req: Request, res: Response) => {
			req.logout();
			res.send('Success');
		}
	);
};
