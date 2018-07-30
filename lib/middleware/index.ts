import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { RequestHandler } from 'express-serve-static-core';
import * as session from 'express-session';
import * as passport from 'passport';
import { ADMIN_CORS } from './../config/index';

const json = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: false });
export const passportMiddlewares: RequestHandler[] = [
	session({
		secret: 'session_secret',
		resave: false,
		saveUninitialized: true
	}),
	passport.initialize(),
	passport.session()
];

export const jsonMiddleware: RequestHandler[] = [json];
export const urlencodedMiddleware: RequestHandler[] = [urlencoded];
export let corsMiddleware: RequestHandler = cors();
export const middlewares: RequestHandler[] = [json, urlencoded, ...passportMiddlewares];

export const initMiddleware = () => {
	corsMiddleware = cors(ADMIN_CORS);
};
