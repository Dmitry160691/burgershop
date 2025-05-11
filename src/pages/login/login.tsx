import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { login } from '../../api/auth.api';
import s from './login.module.scss';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

	const { values, handleChange } = useForm({ email: '', password: '' });

	const from = location.state?.from?.pathname || '/profile';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(login(values));
		navigate(from, { replace: true });
	};

	return (
		<div className={s.container}>
			<form className={`${s.form} mb-20`} onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium'>Вход</h2>
				<EmailInput
					name='email'
					value={values.email}
					placeholder='Email'
					onChange={handleChange}
					autoComplete='email'
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					placeholder='Пароль'
					name='password'
					autoComplete='password'
				/>
				{errorMessage && <p>{errorMessage}</p>}
				<Button htmlType='submit' size='medium'>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</Button>
			</form>
			<div className={`mb-4 ${s.link}`}>
				<span className='text text_type_main-default text_color_inactive mr-2'>
					Вы — новый пользователь?
				</span>
				<Link
					to='/register'
					className='link text text_type_main-default text_color_inactive'>
					Зарегистрироваться
				</Link>
			</div>
			<div className={s.link}>
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
