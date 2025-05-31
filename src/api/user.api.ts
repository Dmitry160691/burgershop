import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import { RequestUserUpdate, ResponseUser } from '../types/app.types';
import { getCookie } from '@utils/cookie';
import { authMiddleware } from './auth.api';

export const getToken = async () => {
	const token = getCookie('refresh');

	return await request('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ token }),
	}).then(authMiddleware);
};

export const getUser = createAsyncThunk<ResponseUser>(
	'get/user',
	async (): Promise<ResponseUser> => {
		const token = getCookie('token');
		if (!token) {
			await getToken();
		}

		return await request('/auth/user', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${getCookie('token')}`,
			},
		});
	}
);

export const updateUser = createAsyncThunk<ResponseUser, RequestUserUpdate>(
	'patch/user',
	async (data: RequestUserUpdate) => {
		return await request('/auth/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${getCookie('token')}`,
			},
			body: JSON.stringify(data),
		});
	}
);
