import { Request } from 'express-serve-static-core';
import User from '../models/user-model';

export const setReqAuthUser = (req: Request, user: User) => {
	if (user) {
		req.headers['auth-user'] = user.username;
	}
	return req;
};
