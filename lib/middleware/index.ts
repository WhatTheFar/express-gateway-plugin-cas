import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';

const json = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: false });
export const passportMiddlewares = [
	session({
		secret: 'session_secret',
		resave: false,
		saveUninitialized: true
	}),
	passport.initialize(),
	passport.session()
];

export const jsonMiddleware: any[] = [json];
export const urlencodedMiddleware: any[] = [urlencoded];
export const corsMiddleware: any[] = [cors()];
export const middlewares: any[] = [json, urlencoded, ...passportMiddlewares];
