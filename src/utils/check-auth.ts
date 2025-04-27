import { AppDispatch } from '@services/store';
import { getCookie } from './cookie';
import { getUser } from '../api/user.api';
import { logout } from '../api/auth.api';

export const checkAuth = () => async (dispatch: AppDispatch) => {
	const accessToken = getCookie('token');
	const refreshToken = getCookie('refresh');

	if (!refreshToken) {
		return;
	}

	try {
		if (accessToken) {
			await dispatch(getUser());
		}
	} catch (error) {
		dispatch(logout());
		throw new Error('Ошибка при проверке авторизации');
	}
};
