// export let DATABASE_URL =
// 	process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres';

// export let AUTH_HEADER = process.env.AUTH_HEADER || 'auth-user';

// export let ADMIN_KEY = process.env.ADMIN_KEY || 'this_is_an_admin_api_key';

// export let JWT_SECRET = process.env.JWT_SECRET || 'this_is_a_secret';

// export let JWT_EXPIRATION_DELTA = process.env.JWT_EXPIRATION_DELTA || null;

// export let JWT_REFRESH_EXPIRATION_DELTA =
// 	process.env.JWT_REFRESH_EXPIRATION_DELTA || '14d';

export let DATABASE_URL = 'postgres://postgres:password@localhost:5432/postgres';

export let AUTH_HEADER = 'auth-user';

export let ADMIN_KEY = 'admin_key';

export let JWT_SECRET = 'jwt_secret';

export let JWT_EXPIRATION_DELTA = null;

export let JWT_REFRESH_EXPIRATION_DELTA = null;

export const initConfig = (settings: any) => {
	DATABASE_URL = settings.DATABASE_URL || DATABASE_URL;
	AUTH_HEADER = settings.AUTH_HEADER || AUTH_HEADER;
	ADMIN_KEY = settings.ADMIN_KEY || ADMIN_KEY;
	JWT_SECRET = settings.JWT_SECRET || JWT_SECRET;
	JWT_EXPIRATION_DELTA = settings.JWT_EXPIRATION_DELTA || JWT_EXPIRATION_DELTA;
	JWT_REFRESH_EXPIRATION_DELTA =
		settings.JWT_REFRESH_EXPIRATION_DELTA || JWT_REFRESH_EXPIRATION_DELTA;
};
