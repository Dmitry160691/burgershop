import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../constants';

type RequestData = {
	ingredients: string[];
};

type ResponseData = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export const postOrder = createAsyncThunk<ResponseData, RequestData>(
	'order/post',
	async (data: RequestData) => {
		return await fetch(`${BASE_API_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok) return res.json();
			res.json().then((err) => Promise.reject(err));
		});
	}
);
