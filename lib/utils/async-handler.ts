import { RequestHandler } from 'express-serve-static-core';

export const asyncifyHandler: (fn: RequestHandler) => RequestHandler = fn => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
