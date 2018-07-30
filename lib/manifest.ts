import 'express-gateway';
import { initConfig } from './config';
import { initDatabase } from './config/db';
import { initPassport } from './config/passport';
import { initMiddleware } from './middleware/index';
import authSecurePolicy from './policies/auth-secure-policy';
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
		initConfig(pluginContext.settings);
		initDatabase();
		initPassport();
		initMiddleware();

		pluginContext.registerPolicy(authSecurePolicy);
		pluginContext.registerPolicy(jwtPolicy);
		pluginContext.registerPolicy(basicPolicy);
		pluginContext.registerPolicy(localPolicy);
		pluginContext.registerPolicy(sessionPolicy);
		pluginContext.registerGatewayRoute(authRoutes);
		pluginContext.registerGatewayRoute(authUserRoutes);
		pluginContext.registerGatewayRoute(googleOauth20Routes);
	},
	policies: ['auth-secure', 'jwt-auth', 'session-auth', 'local-auth'],
	schema: {
		$id: 'http://express-gateway.io/schemas/plugin/express-gateway-plugin-cas.json',
		type: 'object',
		properties: {
			DATABASE_URL: {
				type: 'string'
			},
			AUTH_HEADER: {
				type: 'string',
				default: 'auth-user'
			},
			ADMIN_KEY: {
				type: 'string',
				default: 'admin_key'
			},
			JWT_SECRET: {
				type: 'string',
				default: 'jwt_secret'
			},
			JWT_EXPIRATION_DELTA: {
				type: 'string'
			},
			JWT_REFRESH_EXPIRATION_DELTA: {
				type: 'string'
			},
			USER_MODEL_PATH: {
				type: 'string'
			},
			ADMIN_CORS: {
				type: 'object',
				properties: {
					origin: {
						type: ['string', 'boolean', 'array'],
						items: { type: 'string' },
						default: '*'
					},
					methods: {
						type: ['string', 'array'],
						items: { type: 'string' },
						default: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
					},
					allowedHeaders: {
						type: ['string', 'array'],
						items: { type: 'string' }
					},
					exposedHeaders: {
						type: 'array',
						items: { type: 'string' }
					},
					credentials: {
						type: 'boolean'
					},
					maxAge: {
						type: 'integer'
					},
					optionsSuccessStatus: {
						type: 'integer',
						default: 204
					},
					preflightContinue: {
						type: 'boolean',
						default: false
					}
				},
			default: {}
			}
		},
		required: ['DATABASE_URL']
	},
	options: {
		DATABASE_URL: {
			title: "User's database url",
			type: 'string',
			required: true
		}
	}
};

export = plugin;
