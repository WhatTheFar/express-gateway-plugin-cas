// @ts-check
/// <reference path="./types.d.ts" />
/// <reference path="../lib/types/sequelize.d.ts" />

const _ = require('lodash');

/** @type {DefineFunciton<CustomUserInstance, ICustomUserAttributes>} */
const defineFunction = (sequelize, Datatypes) => {
	/** @type {SequelizeAttributes<ICustomUserAttributes>} */
	const attributes = {
		username: { type: Datatypes.STRING, allowNull: true, unique: true },
		password: { type: Datatypes.STRING, allowNull: false },
		firstName: { type: Datatypes.STRING },
		lastName: { type: Datatypes.STRING },
		email: { type: Datatypes.STRING },
		phoneNumber: { type: Datatypes.STRING },
		faIdPrefix: { type: Datatypes.STRING }
	};
	return sequelize.define(
		'users',
		{
			username: { type: Datatypes.STRING, allowNull: true, unique: true },
			password: { type: Datatypes.STRING, allowNull: false },
			firstname: { type: Datatypes.STRING },
			lastname: { type: Datatypes.STRING },
			email: { type: Datatypes.STRING },
			phoneNumber: { type: Datatypes.STRING },
			fa_id_prefix: { type: Datatypes.STRING }
		},
		{
			hooks: {
				afterCreate: (user, options) => {
					const faId = _.padStart(user.id, 5, '0');
					user.username = `${user.faIdPrefix}${faId}`;
					return user.save();
				}
			}
		}
	);
};

module.exports = defineFunction;
