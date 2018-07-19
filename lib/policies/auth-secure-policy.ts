import 'express-gateway';

const policy: ExpressGateway.Policy = {
	name: 'auth-secure',
	policy: actionParams => {
		return (req, res, next) => {
			delete req.headers['auth-user'];
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
