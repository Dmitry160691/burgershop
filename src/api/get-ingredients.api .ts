import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from './request';

export const getIngredients = createAsyncThunk(
	'ingredients/get',
	async () => await request('/ingredients')
);
