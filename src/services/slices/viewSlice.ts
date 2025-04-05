import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '../../types/app.types';

type ViewState = {
	selectIngredient: IngredientType | null;
};

const initialState: ViewState = {
	selectIngredient: null,
};

const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		addIngredient: (state, action: PayloadAction<IngredientType>) => {
			state.selectIngredient = action.payload;
		},
		removeIngredient: (state) => {
			state.selectIngredient = null;
		},
	},
});

export const { addIngredient, removeIngredient } = viewSlice.actions;
export default viewSlice;
