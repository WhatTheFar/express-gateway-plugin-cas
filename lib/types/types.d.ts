import * as seqeulize from 'sequelize';

declare global {
	interface IJwtPayload {
		username: string;
		password: string;
		expiresIn: number;
	}
	interface IUserAttributes {
		id?: string;
		username: string;
		password: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		createdAt?: string;
		updatedAt?: string;
	}

	type UserInstance = seqeulize.Instance<IUserAttributes> & IUserAttributes;

	type UserModel = seqeulize.Model<UserInstance, IUserAttributes>;
}
