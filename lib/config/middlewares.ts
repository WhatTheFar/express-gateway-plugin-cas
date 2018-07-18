import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as passport from 'passport';

export const jsonMiddleware = bodyParser.json();
export const urlencodedMiddleware = bodyParser.urlencoded({ extended: false });
export const passportMiddlewares = [
	session({ secret: 'session_secret' }),
	passport.initialize(),
	passport.session()
];

export const middlewares = [jsonMiddleware, urlencodedMiddleware, ...passportMiddlewares];
