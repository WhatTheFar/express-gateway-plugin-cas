// @ts-check
/// <reference path="../node_modules/express-gateway/index.d.ts" />

/** @type {ExpressGateway.Policy} */
const policy = {
	name: 'jwt-auth',
	policy: actionParams => {
		return (req, res, next) => {
			console.log('executing policy example with params', actionParams);
			next()
		};
	}
};

module.exports = policy