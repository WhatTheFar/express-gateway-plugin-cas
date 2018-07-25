import { resolve } from 'path';
import * as Sequelize from 'sequelize';
import { hashPassword } from './../utils/user-util';
export let User: UserModel;
export const initUserModel = (
	sequelize: Sequelize.Sequelize,
	userModelPath: string = null
) => {
	let UserModel: UserModel;
	if (userModelPath) {
		const path = resolve(process.cwd(), userModelPath);
		UserModel = sequelize.import<UserInstance, IUserAttributes>(path);
	} else {
		const attributes: SequelizeAttributes<IUserAttributes> = {
			username: { type: Sequelize.STRING, allowNull: false, unique: true },
			password: { type: Sequelize.STRING, allowNull: false },
			firstName: { type: Sequelize.STRING },
			lastName: { type: Sequelize.STRING },
			email: { type: Sequelize.STRING }
		};
		UserModel = sequelize.define<UserInstance, IUserAttributes>('users', attributes);
	}
	UserModel.beforeCreate(user => {
		return hashPassword(user.password).then(hashed => {
			user.password = hashed;
		});
	});
	User = UserModel;
	return UserModel;
};
