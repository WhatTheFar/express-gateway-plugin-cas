import { AUTH_HEADER } from '../lib/config';
import {
	apiKeyAuthHeader,
	axiosInstance,
	basicAuthOption,
	credential,
	disposeTestConfig,
	initTestConfig,
	jwtAuthHeader,
	username
} from './config';

beforeAll(async done => {
	initTestConfig(done);
});

afterAll(done => {
	disposeTestConfig(done);
});

describe('User routes', () => {
	const testCredential = {
		username: 'test2',
		password: 'password123'
	};
	test('should get users', async () => {
		expect.assertions(1);
		const { status } = await axiosInstance.get('/auth/user', {
			headers: apiKeyAuthHeader
		});
		expect(status).toBe(200);
	});

	test('should get a test user', async () => {
		expect.assertions(2);
		const { status, data } = await axiosInstance.get(`/auth/user/${username}`, {
			headers: apiKeyAuthHeader
		});
		expect(status).toBe(200);
		expect(data.username).toBe(username);
	});

	test('should create test user', async () => {
		expect.assertions(1);
		const { data } = await axiosInstance.post('/auth/user', testCredential, {
			headers: apiKeyAuthHeader
		});
		expect(data.username).toBe(testCredential.username);
	});

	test('should update test user', async () => {
		expect.assertions(2);
		const newPassword = 'password456';
		await axiosInstance.put(
			`/auth/user/${testCredential.username}`,
			{
				password: newPassword
			},
			{
				headers: apiKeyAuthHeader
			}
		);
		await expect(
			axiosInstance.post('/auth/token', testCredential)
		).rejects.toThrowError();

		await expect(
			axiosInstance.post('/auth/token', {
				...testCredential,
				password: newPassword
			})
		).resolves.toHaveProperty('data.token');
	});

	test('should delete test user', async () => {
		expect.assertions(1);
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
