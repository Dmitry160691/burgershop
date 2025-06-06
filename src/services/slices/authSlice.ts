import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	OrderMessageType,
	ResponseAuthData,
	ResponseUser,
	UserTypeWithoutPassword,
} from '../../types/app.types';
import {
	forgotPassword,
	login,
	logout,
	register,
	resetPassword,
} from '../../api/auth.api';
import { getUser, updateUser } from '../../api/user.api';

type State = {
	data: OrderMessageType | null;
	user: UserTypeWithoutPassword | null;
	isLoading: boolean;
	status:
		| 'connecting'
		| 'disconnecting'
		| 'connected'
		| 'disconnected'
		| 'error';
	error: Event | null;
	isError: boolean;
	errorMessage: string;
};

const initialState: State = {
	data: null,
	user: null,
	isLoading: true,
	status: 'disconnected',
	error: null,
	isError: false,
	errorMessage: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		connect: (state, _action: PayloadAction<string>) => {
			state.status = 'connecting';
			state.data = null;
		},
		disconnect: (state) => {
			state.status = 'disconnecting';
			state.data = null;
		},
		sendMessage: (_state, _action: PayloadAction<OrderMessageType>) => {},
		onConnected: (state, _action: PayloadAction<Event>) => {
			state.status = 'connected';
			state.data = null;
		},
		onDisconnected: (state, _action: PayloadAction<CloseEvent>) => {
			state.status = 'disconnected';
			state.data = null;
		},
		onMessageReceived: (state, action: PayloadAction<OrderMessageType>) => {
			state.data = action.payload;
		},
		onError: (state, action: PayloadAction<Event>) => {
			state.status = 'error';
			state.error = action.payload;
		},
		cancelCheck: (state) => {
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(register.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(
				register.fulfilled,
				(state, { payload }: PayloadAction<ResponseAuthData>) => {
					state.isLoading = false;
					state.isError = false;
					state.user = payload.user;
				}
			)

			.addCase(login.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(login.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(
				login.fulfilled,
				(state, { payload }: PayloadAction<ResponseAuthData>) => {
					state.isLoading = false;
					state.isError = false;
					state.user = payload.user;
				}
			)

			.addCase(logout.pending, (state) => {
				state.isError = false;
			})
			.addCase(logout.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.isError = false;
				state.user = null;
			})

			.addCase(forgotPassword.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(forgotPassword.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.isError = false;
			})

			.addCase(resetPassword.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(resetPassword.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.isError = false;
			})

			.addCase(getUser.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(getUser.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(
				getUser.fulfilled,
				(state, { payload }: PayloadAction<ResponseUser>) => {
					state.isLoading = false;
					state.isError = false;
					state.user = payload.user;
				}
			)

			.addCase(updateUser.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(updateUser.rejected, (state, { error }) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = error.message
					? error.message
					: 'Что-то пошло не так, попробуйте еще раз.';
			})
			.addCase(
				updateUser.fulfilled,
				(state, { payload }: PayloadAction<ResponseUser>) => {
					state.isLoading = false;
					state.isError = false;
					state.user = payload.user;
				}
			);
	},
});

export const {
	connect,
	disconnect,
	sendMessage,
	onConnected,
	onDisconnected,
	onMessageReceived,
	onError,
	cancelCheck,
} = authSlice.actions;

export default authSlice;
