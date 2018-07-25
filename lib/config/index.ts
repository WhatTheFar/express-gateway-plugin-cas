export let DATABASE_URL = 'postgres://postgres:password@localhost:5432/postgres';
export let AUTH_HEADER = 'auth-user';
export let ADMIN_KEY = 'admin_key';
export let JWT_SECRET = 'jwt_secret';
export let JWT_EXPIRATION_DELTA = null;
export let JWT_REFRESH_EXPIRATION_DELTA = null;
export let USER_MODEL_PATH = null;

export const initConfig = (settings: any) => {
	DATABASE_URL = settings.DATABASE_URL || DATABASE_URL;
	AUTH_HEADER = settings.AUTH_HEADER || AUTH_HEADER;
	ADMIN_KEY = settings.ADMIN_KEY || ADMIN_KEY;
	JWT_SECRET = settings.JWT_SECRET || JWT_SECRET;
	JWT_EXPIRATION_DELTA = settings.JWT_EXPIRATION_DELTA || JWT_EXPIRATION_DELTA;
	JWT_REFRESH_EXPIRATION_DELTA =
		settings.JWT_REFRESH_EXPIRATION_DELTA || JWT_REFRESH_EXPIRATION_DELTA;
	USER_MODEL_PATH = settings.USER_MODEL_PATH || USER_MODEL_PATH;
};
