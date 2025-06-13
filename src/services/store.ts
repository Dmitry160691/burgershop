import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredient from './slices/ingredients/ingredientsSlice';
import cartReducer from './slices/cart/cartSlice';
import orderReducer, {
	connect,
	disconnect,
	onConnected,
	onDisconnected,
	sendMessage,
	onMessageReceived,
	onError,
} from './slices/order/orderSlice';
import authReducer, {
	connect as userConnect,
	disconnect as userDisconnect,
	onConnected as onUserConnected,
	onDisconnected as onUserDisconnected,
	sendMessage as userSendMessage,
	onMessageReceived as onUserMessageReceived,
	onError as onUserError,
} from './slices/auth/authSlice';
import viewReducer from './slices/view/viewSlice';
import { OrderMessageType } from '../types/app.types';
import { createWebSocketMiddleware } from '../socket-middleware';

const orderWebSocketMiddleware = createWebSocketMiddleware<OrderMessageType>(
	{
		connect,
		disconnect,
		onConnected,
		onDisconnected,
		sendMessage,
		onMessageReceived,
		onError,
	},
	{ withTokenRefresh: false }
);

const userOrderWebSocketMiddleware =
	createWebSocketMiddleware<OrderMessageType>(
		{
			connect: userConnect,
			disconnect: userDisconnect,
			onConnected: onUserConnected,
			onDisconnected: onUserDisconnected,
			sendMessage: userSendMessage,
			onMessageReceived: onUserMessageReceived,
			onError: onUserError,
		},
		{
			withTokenRefresh: true,
		}
	);

const reducer = combineReducers({
	ingredients: ingredient,
	cart: cartReducer,
	order: orderReducer,
	view: viewReducer,
	auth: authReducer,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			orderWebSocketMiddleware,
			userOrderWebSocketMiddleware
		),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
