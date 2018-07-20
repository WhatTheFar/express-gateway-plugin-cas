import 'express-gateway';
import User from '../models/user-model';
import invokeMiddleware from '../utils/invokeMiddleware';
import { setReqAuthUser } from '../utils/request-util';
import { ResponseUtil } from '../utils/response-util';
import { passportMiddlewares } from './../config/middlewares';
import { getCommonAuthCallback } from './../utils/passport-util';

const policy: ExpressGateway.Policy = {
	name: 'session-auth',
	policy: actionParams => {
		return (req, res, next) => {
			invokeMiddleware(passportMiddlewares, req, res)
				.then(() => {
					const user = req.user as User;
					return getCommonAuthCallback(actionParams, req, res, next)(null, user, null);
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
