import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { login } from '../../api/auth.api';
import { RequestLogin } from '../../types/app.types';

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isLoading, isError, errorMessage } = useAppSelector(
		(state) => state.auth
	);

	const [value, setValue] = useState<RequestLogin>({
		email: '',
		password: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(login(value)).then((response) => {
			if (response.meta.requestStatus === 'fulfilled') {
				const searchParams = new URLSearchParams(location.search);
				const redirectTo = searchParams.get('redirectTo');

				navigate(redirectTo ? redirectTo : '/', { replace: true });
			}
		});
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValue((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div>
			<form className='mb-20' onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>Вход</h2>
				<EmailInput
					name='email'
					value={value.email}
					placeholder='Email'
					onChange={onInputChange}
					autoComplete='email'
				/>
				<PasswordInput
					onChange={onInputChange}
					value={value.password}
					placeholder='Пароль'
					name='password'
					autoComplete='password'
				/>
				{isError && <p>{errorMessage}</p>}
				<Button htmlType='submit'>{isLoading ? 'Загрузка...' : 'Войти'}</Button>
			</form>
			<div className='mb-4'>
				<span className='text text_type_main-default text_color_inactive mr-2'>
					Вы — новый пользователь?
				</span>
				<Link
					to='/register'
					className='link text text_type_main-default text_color_inactive'>
					Зарегистрироваться
				</Link>
			</div>
			<div>
				<span className='text text_type_main-default text_color_inactive mr-2'>
					Забыли пароль?
				</span>
				<Link
					to='/forgot-password'
					className='link text text_type_main-default text_color_inactive'>
					Восстановить пароль
				</Link>
			</div>
		</div>
	);
};
