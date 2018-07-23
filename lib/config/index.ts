export const DATABASE_URL =
	process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres';

export const AUTH_HEADER = process.env.AUTH_HEADER || 'auth-user';

export const JWT_SECRET = process.env.JWT_SECRET || 'this_is_a_secret';

export const ADMIN_KEY = process.env.ADMIN_KEY || 'this_is_an_admin_api_key';
