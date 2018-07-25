import 'express-gateway';
import invokeMiddleware from '../utils/invokeMiddleware';
import { passportMiddlewares } from './../middleware';
import { getCommonAuthCallback } from './../utils/passport-util';

const policy: ExpressGateway.Policy = {
	name: 'session-auth',
	policy: actionParams => {
		return (req, res, next) => {
			invokeMiddleware(passportMiddlewares, req, res)
				.then(() => {
					const user = req.user as UserInstance;
					return getCommonAuthCallback(actionParams, req, res, next)(
						null,
						user,
						null
					);
				})
				.catch(err => {
					next(err);
				});
		};
	},
	schema: {
		$id: 'http://express-gateway.io/schemas/policies/session-auth.json',
		type: 'object',
		properties: {
			passThrough: { type: 'boolean', default: false },
			passThroughSafeMethod: { type: 'boolean', default: false }
		}
	}
};

export default policy;
