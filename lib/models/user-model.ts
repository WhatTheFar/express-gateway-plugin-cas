import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import ms = require('ms');
import {
	AllowNull,
	BeforeCreate,
	Column,
	Default,
	Model,
	Table,
	Unique
} from 'sequelize-typescript';
import { IDefineOptions } from '../../node_modules/sequelize-typescript/lib/interfaces/IDefineOptions';
import { JWT_SECRET } from '../config';
import { JWT_EXPIRATION_DELTA, JWT_REFRESH_EXPIRATION_DELTA } from './../config/index';

export interface IJwtPayload {
	username: string;
	password: string;
	expiresIn: number;
}

const tableOptions: IDefineOptions = {
	tableName: 'users',
	timestamps: true
};

@Table(tableOptions)
class User extends Model<User> {
	@BeforeCreate
	public static hasPassword(instance: User) {
		return hashPassword(instance.password).then(
			hashed => (instance.password = hashed)
		);
	}

	public static findByPayload = async (payload: any) => {
		const user = await User.findOne({
			where: { username: payload.username }
		});
		if (user.password === payload.password) {
			return user;
		}
		return null;
		// return (User.findOne({
		// 	where: { username: payload.username }
		// }) as PromiseLike<User | null>) as Promise<User | null>;
	};

	@AllowNull(false)
	@Unique
	@Column
	public username!: string;

	@AllowNull(false)
	@Column
	public password!: string;

	@Default(false)
	@Column
	public isAdmin!: boolean;

	@Column public firstname!: string;

	@Column public lastname!: string;

	public comparePassword(password: string) {
		return bcrypt.compare(password, this.password);
	}

	public generateAuthToken(refreshExpiresIn: number = null) {
		const payload: any = {
			username: this.username,
			password: this.password
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
	}
}

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export default User;
