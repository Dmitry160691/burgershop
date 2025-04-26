import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { resetPassword } from '../../api/auth.api';
import { RequestReset } from '../../types/app.types';

export const ResetPassword = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { isLoading, isError, errorMessage } = useAppSelector(
		(state) => state.auth
	);

	const [values, setValues] = useState<RequestReset>({
		password: '',
		token: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(resetPassword(values)).then((response) => {
			if (response.meta.requestStatus === 'fulfilled') {
				navigate('/login', { replace: true });
			}
		});
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (!location.state?.isForgotPage) {
			navigate('/forgot-password', { replace: true });
		}
	}, [location, navigate]);

	return (
		<div className={''}>
			<form className='mb-20' onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h2>
				<PasswordInput
					onChange={onInputChange}
					value={values.password}
					name='password'
					placeholder='Введите новый пароль'
					autoComplete='new-password'
				/>
				<Input
					type='text'
					placeholder='Введите код из письма'
					onChange={onInputChange}
					value={values.token}
					name='token'
					error={isError}
					errorText={errorMessage || 'Ошибка!'}
					size='default'
					autoComplete='one-time-code'
				/>
				{isError && <p className={''}>{errorMessage}</p>}
				<Button htmlType='submit'>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>
			<div>
				<span className='text text_type_main-default text_color_inactive mr-2'>
					Вспомнили пароль?
				</span>
				<Link
					to='/login'
					className='link text text_type_main-default text_color_inactive'>
					Войти
				</Link>
			</div>
		</div>
	);
};
