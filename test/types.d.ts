import * as seqeulize from 'sequelize';

declare global {
	interface ICustomUserAttributes {
		id?: string;
		username: string;
		password: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		phoneNumber?: string;
		faIdPrefix: string;
		createdAt?: string;
		updatedAt?: string;
	}

	type CustomUserInstance = seqeulize.Instance<ICustomUserAttributes> &
		ICustomUserAttributes;

	type CustomUserModel = seqeulize.Model<CustomUserInstance, ICustomUserAttributes>;
}
