import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../../api/post-order.api';

type OrderState = {
	orderNumber: number | null;
	isLoading: boolean;
	isError: boolean;
};

const initialState: OrderState = {
	orderNumber: null,
	isLoading: false,
	isError: false,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(postOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.orderNumber = action.payload.order.number;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;

				console.error(action.payload);
			});
	},
});

export default orderSlice;
