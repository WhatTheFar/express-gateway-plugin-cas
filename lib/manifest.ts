import 'express-gateway';
import { initDatabase } from './config/db';
import basicPolicy from './policies/basic-auth-policy';
import jwtPolicy from './policies/jwt-auth-policy';
import localPolicy from './policies/local-auth-policy';
import sessionPolicy from './policies/session-auth-policy';
import authRoutes from './routes/auth-eg';
import authUserRoutes from './routes/auth-user-eg';
import googleOauth20Routes from './routes/google-oauth20-eg';

const plugin: ExpressGateway.Plugin = {
	version: '1.3.0',
	init: pluginContext => {
		const dbURI =
			process.env.DATABASE_URL ||
			'postgres://postgres:password@localhost:5432/postgres';
		initDatabase(dbURI);

		pluginContext.registerPolicy(jwtPolicy);
		pluginContext.registerPolicy(basicPolicy);
		pluginContext.registerPolicy(localPolicy);
		pluginContext.registerPolicy(sessionPolicy);
		pluginContext.registerGatewayRoute(authRoutes);
		pluginContext.registerGatewayRoute(authUserRoutes);
		pluginContext.registerGatewayRoute(googleOauth20Routes);
	},
	policies: ['jwt-auth', 'session-auth', 'local-auth']
};

export = plugin;
