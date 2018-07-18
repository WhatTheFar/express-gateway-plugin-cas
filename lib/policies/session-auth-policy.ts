import 'express-gateway';
import User from '../models/user-model';
import invokeMiddleware from '../utils/invokeMiddleware';
import { setReqAuthUser } from '../utils/request-util';
import { passportMiddlewares } from './../config/middlewares';

const policy: ExpressGateway.Policy = {
	name: 'session-auth',
	policy: actionParams => {
		return (req, res, next) => {
			console.log('session policy');
			invokeMiddleware(passportMiddlewares, req, res)
				.then(() => {
					if (!req.user) {
						return res.send('unauthorized');
					}
					setReqAuthUser(req, req.user as User);
					next();
				})
				.catch(err => {
					console.log(err);
					next(err);
				});
		};
	},
	schema: {
		$id: 'http://express-gateway.io/schemas/policies/session-auth.json',
		type: 'object',
		properties: {
			passThrough: { type: 'boolean', default: false }
		}
	}
};

export default policy;
