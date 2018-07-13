// @ts-check
/// <reference path="./node_modules/express-gateway/index.d.ts" />

/** @type {ExpressGateway.Plugin} */
const plugin = {
	version: '1.3.0',
	init: function(pluginContext) {
		pluginContext.registerPolicy(require('./policies/jwt-auth-policy'))
		pluginContext.registerPolicy(require('./policies/basic-auth-policy'))
		pluginContext.registerPolicy(require('./policies/session-auth-policy'))
		pluginContext.registerPolicy(require('./policies/local-auth-policy'))
		pluginContext.registerGatewayRoute(require('./routes/auth-eg'))
		pluginContext.registerGatewayRoute(require('./routes/auth-user-eg'))
		pluginContext.registerGatewayRoute(require('./routes/google-oauth20-eg'))
	},
	policies: ['jwt-auth', 'basic-auth', 'session-auth', 'local-auth'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
}

module.exports = plugin
