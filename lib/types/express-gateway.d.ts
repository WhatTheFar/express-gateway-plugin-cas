declare namespace ExpressGateway {
	interface Plugin {
		options?: any;
	}

	interface PluginSettings {
		DATABASE_URL: string;
		AUTH_HEADER: string;
		ADMIN_KEY: string;
		JWT_SECRET: string;
		JWT_EXPIRATION_DELTA?: string;
		JWT_REFRESH_EXPIRATION_DELTA?: string;
		USER_MODEL_PATH?: string;
		ADMIN_CORS: {
			origin: string | boolean | Array<string>;
			methods: string | Array<string>;
			allowedHeaders?: string | Array<string>;
			exposedHeaders?: Array<string>;
			credentials?: boolean;
			maxAge?: number;
			optionsSuccessStatus: number;
			preflightContinue: boolean;
		};
	}

	interface PluginContext {
		settings?: PluginSettings;
	}
}
