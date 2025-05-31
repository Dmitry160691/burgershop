import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType, OrderType } from '../../types/app.types';
import { fetchOrderById } from '../../api/post-order.api';

type ViewState = {
	selectIngredient: IngredientType | null;
	selectOrder: OrderType | null;
	isLoading: boolean;
	isError: boolean;
};

const initialState: ViewState = {
	selectIngredient: null,
	selectOrder: null,
	isLoading: false,
	isError: false,
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
		addOrder: (state, action: PayloadAction<OrderType>) => {
			state.selectOrder = action.payload;
		},
		removeOrder: (state) => {
			state.selectOrder = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchOrderById.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.selectOrder = action.payload;
			})
			.addCase(fetchOrderById.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { addIngredient, removeIngredient, addOrder, removeOrder } =
	viewSlice.actions;
export default viewSlice;
