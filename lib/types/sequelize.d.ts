import {
	DataTypeAbstract,
	DefineAttributeColumnOptions,
	Sequelize,
	DataTypes
} from 'sequelize';
import * as seqeulize from 'sequelize';

declare global {
	type SequelizeAttributes<T extends { [key: string]: any }> = {
		[P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions
	};

	type DefineFunciton<TInstance, TAttributes> = (
		sequelize: Sequelize,
		dataTypes: DataTypes
	) => seqeulize.Model<TInstance, TAttributes>;
}
