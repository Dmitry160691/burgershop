import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ingredient from './slices/ingredientsSlice';
import cart from './slices/cartSlice';
import order, {
	connect,
	disconnect,
	onConnected,
	onDisconnected,
	sendMessage,
	onMessageReceived,
	onError,
} from './slices/orderSlice';
import auth, {
	connect as userConnect,
	disconnect as userDisconnect,
	onConnected as onUserConnected,
	onDisconnected as onUserDisconnected,
	sendMessage as userSendMessage,
	onMessageReceived as onUserMessageReceived,
	onError as onUserError,
} from './slices/authSlice';
import view from './slices/viewSlice';
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

export const reducer = combineSlices(ingredient, cart, order, view, auth);

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
