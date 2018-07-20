import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from '.';
import User from '../models/user-model';

// const uri = 'postgres://user:pass@example.com:5432/dbname'
export const initDatabase = (dbURI: string = DATABASE_URL) => {
	const sequelize = new Sequelize(dbURI);
	sequelize.addModels([User]);
	User.sync();
};
