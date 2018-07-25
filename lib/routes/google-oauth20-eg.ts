import { Request, Response } from 'express-serve-static-core';
import { Application } from 'express-serve-static-core';
import passport from '../config/passport';
import { passportMiddlewares } from './../middleware';
import { generateAuthToken } from './../utils/user-util';

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
			const user = req.user as UserInstance;
			const token = generateAuthToken(user);
			res.json({ token });
		}
	);
};
