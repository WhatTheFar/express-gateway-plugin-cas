import 'express-gateway';
import { AUTH_HEADER } from './../config/index';

const policy: ExpressGateway.Policy = {
	name: 'auth-secure',
	policy: actionParams => {
		return (req, res, next) => {
			delete req.headers[AUTH_HEADER];
			next();
		};
	},
	schema: {
		$id: 'http://express-gateway.io/schemas/policies/session-auth.json',
		type: 'object',
		properties: {}
	}
};

export default policy;
