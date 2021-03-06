export let DATABASE_URL;
export let AUTH_HEADER;
export let ADMIN_KEY;
export let JWT_SECRET;
export let JWT_EXPIRATION_DELTA;
export let JWT_REFRESH_EXPIRATION_DELTA;
export let USER_MODEL_PATH;
export let ADMIN_CORS;

export const initConfig = (settings: ExpressGateway.PluginSettings) => {
	DATABASE_URL = settings.DATABASE_URL;
	AUTH_HEADER = settings.AUTH_HEADER;
	ADMIN_KEY = settings.ADMIN_KEY;
	JWT_SECRET = settings.JWT_SECRET;
	JWT_EXPIRATION_DELTA = settings.JWT_EXPIRATION_DELTA;
	JWT_REFRESH_EXPIRATION_DELTA = settings.JWT_REFRESH_EXPIRATION_DELTA;
	USER_MODEL_PATH = settings.USER_MODEL_PATH;
	ADMIN_CORS = settings.ADMIN_CORS;
};
