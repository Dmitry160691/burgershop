import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../constants';

export const getIngredients = createAsyncThunk(
	'ingredients/get',
	async () =>
		await fetch(`${BASE_API_URL}/ingredients`).then((res) => {
			if (res.ok) return res.json();
			res.json().then((err) => Promise.reject(err));
		})
);
