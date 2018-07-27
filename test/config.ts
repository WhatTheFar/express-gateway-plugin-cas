import axios from 'axios';
import { config } from 'dotenv';
import { Server } from 'http';
import { ADMIN_KEY, initConfig } from './../lib/config/index';
import app from './app';

export const username = 'test';
export const password = 'password123';
export const credential = {
	username,
	password
};

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080/',
	validateStatus: status => status < 400
});

export const basicAuthOption: any = {
	auth: credential
};

export let apiKeyAuthHeader: any;
export let jwtAuthHeader: any;

export const setApiKeyAuthHeader = (apiKey: string) => {
	apiKeyAuthHeader = {
		Authorization: `apiKey ${apiKey}`
	};
};
export const setJwtHeader = (token: string) => {
	jwtAuthHeader = {
		Authorization: `Bearer ${token}`
	};
};

let Application: Server;
let isInit = false;
export const initTestConfig = async (done: jest.DoneCallback) => {
	config();
	initConfig(process.env);

	setApiKeyAuthHeader(ADMIN_KEY);

	if (!isInit) {
		try {
			await axiosInstance.post('/auth/user', credential, {
				headers: apiKeyAuthHeader
			});
		// tslint:disable-next-line:no-empty
		} catch (error) {}

		try {
			const {
				data: { token }
			} = await axiosInstance.post('/auth/token', credential);
			setJwtHeader(token);
		} catch (error) {
			process.exit();
		}
		isInit = true;
	}

	Application = app.listen(8081, done);
};

export const disposeTestConfig = (done: jest.DoneCallback) => {
	if (Application) {
		Application.close(done);
	}
};
