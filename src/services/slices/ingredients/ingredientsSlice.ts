import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseDataType, IngredientType } from '../../../types/app.types';
import { getIngredients } from '../../../api/get-ingredients.api ';

type IngredientState = {
	data: IngredientType[];
	isLoading: boolean;
	isError: boolean;
};

export const initialState: IngredientState = {
	data: [],
	isLoading: false,
	isError: false,
};

const ingredientSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		plusCount: (state, action: PayloadAction<string>) => {
			state.data = state.data.map((item) =>
				item._id === action.payload ? { ...item, __v: item.__v + 1 } : item
			);
		},
		minusCount: (state, action: PayloadAction<string>) => {
			state.data = state.data.map((item) =>
				item._id === action.payload ? { ...item, __v: item.__v - 1 } : item
			);
		},
		plusBun: (state, action: PayloadAction<string>) => {
			state.data = state.data.map((item) =>
				item._id === action.payload
					? { ...item, __v: 2 }
					: { ...item, __v: item.type === 'bun' ? 0 : item.__v }
			);
		},
		minusAll: (state) => {
			state.data = state.data.map((item) => ({ ...item, __v: 0 }));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})

			.addCase(
				getIngredients.fulfilled,
				(state, action: PayloadAction<ResponseDataType<IngredientType[]>>) => {
					state.data = action.payload.data;
					state.isLoading = false;
					state.isError = false;
				}
			)
			.addCase(getIngredients.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { plusCount, minusCount, plusBun, minusAll } =
	ingredientSlice.actions;
export default ingredientSlice.reducer;
