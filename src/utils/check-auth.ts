import { AppDispatch } from '@services/store';
import { getCookie } from './cookie';
import { getUser } from '../api/user.api';
import { logout } from '../api/auth.api';
import { cancelCheck } from '@services/slices/authSlice';

export const checkAuth = () => async (dispatch: AppDispatch) => {
	const refreshToken = getCookie('refresh');

	if (!refreshToken) {
		dispatch(cancelCheck());
		return;
	}

	try {
		await dispatch(getUser());
	} catch (error) {
		dispatch(logout());
		throw new Error('Ошибка при проверке авторизации');
	}
};
