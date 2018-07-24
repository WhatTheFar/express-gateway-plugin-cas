import axios, { AxiosInstance } from 'axios';
import * as dotenv from 'dotenv';
import { Server } from 'http';
import { ADMIN_KEY, AUTH_HEADER, initConfig } from './../lib/config/index';
import app from './app';

let Application: Server;
let axiosInstance: AxiosInstance;
const username = 'test';
const password = 'password123';
const credential = {
	username,
	password
};

let apiKeyAuthHeader: any;
let jwtAuthHeader: any;
const basicAuthOption: any = {
	auth: credential
};

const setApiKeyAuthHeader = (apiKey: string) => {
	apiKeyAuthHeader = {
		Authorization: `apiKey ${apiKey}`
	};
};
const setJwtHeader = (token: string) => {
	jwtAuthHeader = {
		Authorization: `Bearer ${token}`
	};
};

beforeAll(async done => {
	dotenv.config();
	initConfig(process.env);

	axiosInstance = axios.create({
		baseURL: 'http://localhost:8080/',
		validateStatus: status => status < 400
	});

	setApiKeyAuthHeader(ADMIN_KEY);
	try {
		await axiosInstance.post('/auth/user', credential, {
			headers: apiKeyAuthHeader
		});
	} catch (error) {
		console.log();
	}

	try {
		const {
			data: { token }
		} = await axiosInstance.post('/auth/token', credential);
		setJwtHeader(token);
	} catch (error) {
		console.log();
	}

	Application = app.listen(8081, done);
});

afterAll(done => {
	if (Application) {
		Application.close(done);
	}
});

describe('User routes', () => {
	const testCredential = {
		username: 'test2',
		password: 'password123'
	};
	test('should create test user', async () => {
		// expect.assertions(1);
		const { data } = await axiosInstance.post('/auth/user', testCredential, {
			headers: apiKeyAuthHeader
		});
		expect(data.username).toBe(testCredential.username);
	});
	test('should delete test user', async () => {
		// expect.assertions(1);
		const { status } = await axiosInstance.delete(
			`/auth/user/${testCredential.username}`,
			{
				headers: apiKeyAuthHeader
			}
		);
		expect(status).toBe(200);
	});
});

describe('Auth routes', () => {
	test('basic auth, should receive jwt token', async () => {
		expect.assertions(1);
		const {
			data: { token }
		} = await axiosInstance.get('/auth/token', basicAuthOption);
		expect(token).toBeDefined();
	});

	test('local auth, should receive jwt token', async () => {
		expect.assertions(1);
		const {
			data: { token }
		} = await axiosInstance.post('/auth/token', credential);
		expect(token).toBeDefined();
	});

	test('login session, should login with cookie', async () => {
		expect.assertions(2);
		const res = await axiosInstance.post('/auth/login', credential);
		const cookie = res.headers['set-cookie'];

		expect(res.headers['set-cookie']).toBeDefined();

		const resSession = await axiosInstance.get('/session', {
			headers: {
				cookie
			}
		});
		expect(resSession.status).toBe(200);
	});

	test("logout session, shouldn't login with session", async () => {
		expect.assertions(2);
		const res = await axiosInstance.get('/auth/logout');
		const cookie = res.headers['set-cookie'];

		expect(res.headers['set-cookie']).toBeDefined();

		const sessionReq = axiosInstance.get('/session', {
			headers: {
				cookie
			}
		});
		await expect(sessionReq).rejects.toHaveProperty('response.status', 401);
	});
});

describe('jwt-auth policy', () => {
	test('should return 200', async () => {
		expect.assertions(2);
		const { data, status } = await axiosInstance.get('/jwt', {
			headers: jwtAuthHeader
		});
		expect(status).toBe(200);
		expect(data.header[AUTH_HEADER]).toBe(username);
	});
});

describe('auth-secure policy', () => {
	test('should delete auth-user header', async () => {
		expect.assertions(1);
		const { data } = await axiosInstance.get('/secure', {
			headers: {
				[AUTH_HEADER]: 'test'
			}
		});
		expect(data.header[AUTH_HEADER]).toBeUndefined();
	});
});

describe('passThrough params', () => {
	test('should return 200', async () => {
		expect.assertions(2);
		const { data, status } = await axiosInstance.get('/jwt', {
			headers: jwtAuthHeader
		});
		expect(status).toBe(200);
		expect(data.header[AUTH_HEADER]).toBe(username);
	});
});
