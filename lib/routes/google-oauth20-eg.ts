import { Request, Response } from 'express-serve-static-core';
import { Application } from 'express-serve-static-core';
import passport from '../config/passport';
import User from '../models/user-model';
import { passportMiddlewares } from './../middleware';

export default (gatewayExpressApp: Application) => {
	gatewayExpressApp.get(
		'/auth/google',
		passport.authenticate('google-plugin', { scope: ['profile'] })
	);

	gatewayExpressApp.get(
		'/auth/google/callback',
		passportMiddlewares,
		passport.authenticate('google-plugin', { failureRedirect: '/auth/google' }),
		(req: Request, res: Response) => {
			const user = req.user as User;
			const token = user.generateAuthToken();
			res.json({ token });
		}
	);
};
