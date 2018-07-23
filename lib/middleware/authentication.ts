import { RequestHandler } from 'express-serve-static-core';
import { ADMIN_KEY } from '../config';
import { ResponseUtil } from '../utils/response-util';

export const adminAuthorize: RequestHandler = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return ResponseUtil.sendUnauthorized(res);
};

export const apiKeyAuthorize: RequestHandler = (req, res, next) => {
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		return ResponseUtil.sendUnauthorized(res);
	}
	if (!/^apiKey \S+$/.test(authHeader)) {
		return ResponseUtil.sendUnauthorized(res, 'Invalid authorization header format.');
	}
	const apiKey = authHeader.split(' ')[1];
	if (apiKey === ADMIN_KEY) {
		return next();
	}
	return ResponseUtil.sendUnauthorized(res);
};
