import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import ms = require('ms');
import { JWT_SECRET } from '../config';
import { JWT_EXPIRATION_DELTA, JWT_REFRESH_EXPIRATION_DELTA } from './../config/index';
import { User } from './../models/user-model';

export const findUserByPayload = async (payload: IJwtPayload) => {
	const user = await User.findOne({
		where: { username: payload.username }
	});
	if (user && user.password === payload.password) {
		return user;
	}
	return null;
};

export const generateAuthToken = (
	user: UserInstance,
	refreshExpiresIn: number = null
) => {
	const payload: any = {
		username: user.username,
		password: user.password
	};
	if (refreshExpiresIn) {
		if (refreshExpiresIn < Date.now()) {
			return null;
		}
		payload.expiresIn = refreshExpiresIn;
	} else if (JWT_REFRESH_EXPIRATION_DELTA) {
		payload.expiresIn = Date.now() + ms(JWT_REFRESH_EXPIRATION_DELTA);
	}
	const options: any = {};
	if (JWT_EXPIRATION_DELTA) {
		options.expiresIn = JWT_EXPIRATION_DELTA;
	}
	return jwt.sign(payload, JWT_SECRET, options);
};

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const comparePassword = (user: UserInstance, password: string) => {
	return bcrypt.compare(password, user.password);
};
