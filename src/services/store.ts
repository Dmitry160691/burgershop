import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredient from './slices/ingredientsSlice';
import cart from './slices/cartSlice';
import order from './slices/orderSlice';
import view from './slices/viewSlice';

export const reducer = combineSlices(ingredient, cart, order, view);

export const store = configureStore({
	reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
