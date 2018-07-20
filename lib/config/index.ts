export const DATABASE_URL =
	process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres';

export const AUTH_HEADER = process.env.AUTH_HEADER || 'auth-user';

const config = {
	DATABASE_URL,
	AUTH_HEADER
};

export default config;
