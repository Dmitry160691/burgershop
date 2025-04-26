import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import {
	RequestForgotData,
	RequestLogin,
	RequestRegister,
	RequestReset,
	ResponseAuth,
	ResponseAuthData,
} from '../types/app.types';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

export const authMiddleware = (data: ResponseAuthData) => {
	const { accessToken, refreshToken } = data;

	const [_, token] = accessToken.split(' ');
	console.log(token);
	setCookie('token', token, {
		expires: 20 * 60,
	});
	setCookie('refresh', refreshToken);

	return data;
};

export const register = createAsyncThunk<ResponseAuthData, RequestRegister>(
	'auth/register',
	async (data: RequestRegister): Promise<ResponseAuthData> => {
		return await request('/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		}).then(authMiddleware);
	}
);

export const login = createAsyncThunk<ResponseAuthData, RequestLogin>(
	'auth/login',
	async (data: RequestLogin): Promise<ResponseAuthData> => {
		return await request('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		}).then(authMiddleware);
	}
);

export const logout = createAsyncThunk<ResponseAuth>(
	'auth/logout',
	async (): Promise<ResponseAuth> => {
		const token = getCookie('refresh');

		return await request('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ token }),
		}).then((data) => {
			deleteCookie('token');
			deleteCookie('refresh');
			return data;
		});
	}
);

export const forgotPassword = createAsyncThunk<ResponseAuth, RequestForgotData>(
	'auth/forgot',
	async (data: RequestForgotData): Promise<ResponseAuth> => {
		return await request('/password-reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		});
	}
);

export const resetPassword = createAsyncThunk<ResponseAuth, RequestReset>(
	'auth/reset',
	async (data: RequestReset): Promise<ResponseAuth> => {
		return await request('/password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		});
	}
);
