import { Request } from 'express-serve-static-core';
import { AUTH_HEADER } from './../config/index';

export const setReqAuthUser = (req: Request, user: UserInstance) => {
	if (user) {
		req.headers[AUTH_HEADER] = user.username;
	}
	return req;
};

export const getReqAuthUser = (req: Request) => req.headers[AUTH_HEADER];
