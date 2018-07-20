import 'express-gateway';
import passport from '../config/passport';
import { getCommonAuthCallback } from './../utils/passport-util';

const policy: ExpressGateway.Policy = {
	name: 'jwt-auth',
	policy: actionParams => {
		return (req, res, next) => {
			// TODO: add custom callback
			passport.authenticate(
				'jwt-plugin',
				{ session: false },
				getCommonAuthCallback(actionParams, req, res, next)
			)(req, res, next);
		};
	},
	schema: {
		$id: 'http://express-gateway.io/schemas/policies/jwt-auth.json',
		type: 'object',
		properties: {
			passThrough: { type: 'boolean', default: false },
			passThroughSafeMethod: { type: 'boolean', default: false }
		}
	}
};

export default policy;
