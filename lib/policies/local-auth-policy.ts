import 'express-gateway';
import passport from '../config/passport';

const policy: ExpressGateway.Policy = {
	name: 'local-auth',
	policy: actionParams => {
		return (req, res, next) => {
			// TODO: add custom callback
			passport.authenticate('local-plugin', { session: false })(req, res, next);
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
