import { Request } from 'express-serve-static-core';
import User from '../models/user-model';
import { AUTH_HEADER } from './../config/index';

export const setReqAuthUser = (req: Request, user: User) => {
	if (user) {
		req.headers[AUTH_HEADER] = user.username;
	}
	return req;
};

export const getReqAuthUser = (req: Request) => req.headers[AUTH_HEADER];
