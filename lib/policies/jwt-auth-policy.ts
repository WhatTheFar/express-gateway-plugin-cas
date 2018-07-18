import 'express-gateway';
import passport from '../config/passport';

const policy: ExpressGateway.Policy = {
	name: 'jwt-auth',
	policy: actionParams => {
		console.log('jwt policy');
		return (req, res, next) => {
			// TODO: add custom callback
			passport.authenticate('jwt', { session: false })(req, res, next);
		};
	}
};

export default policy;
