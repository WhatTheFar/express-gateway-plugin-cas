import { RequestHandler } from 'express-serve-static-core';
import { ResponseUtil } from '../utils/response-util';

export const adminAuthorize: RequestHandler = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return ResponseUtil.sendUnauthorized(res);
};
