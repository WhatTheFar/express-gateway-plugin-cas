import * as Sequelize from 'sequelize';
import { DATABASE_URL } from '.';
import { initUserModel } from '../models/user-model';
import { USER_MODEL_PATH } from './index';

// const uri = 'postgres://user:pass@example.com:5432/dbname'
export const initDatabase = (dbURI: string = DATABASE_URL) => {
	const sequelize = new Sequelize(dbURI);
	const User = initUserModel(sequelize, USER_MODEL_PATH);
	User.sync();
};
