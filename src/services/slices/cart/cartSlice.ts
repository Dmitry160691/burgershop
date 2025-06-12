import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientAndIdType } from '../../../types/app.types';

type CartState = {
	data: IngredientAndIdType[];
};

export const initialState: CartState = {
	data: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addIngredient: (state, action: PayloadAction<IngredientAndIdType>) => {
			if (action.payload.type === 'bun') {
				state.data = state.data.filter((item) => item.type !== 'bun');
			}

			state.data.push(action.payload);
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ fromId: string; toId: string }>
		) => {
			const { fromId, toId } = action.payload;

			const fromIndex = state.data.findIndex((item) => item.id === fromId);
			const toIndex = state.data.findIndex((item) => item.id === toId);

			if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
				[state.data[fromIndex], state.data[toIndex]] = [
					state.data[toIndex],
					state.data[fromIndex],
				];
			}
		},
		clearCart: (state) => {
			state.data = [];
		},
	},
});

export const { addIngredient, removeIngredient, moveIngredient, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
