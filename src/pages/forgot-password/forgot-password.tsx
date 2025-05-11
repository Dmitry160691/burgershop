import React from 'react';
import { Link, useNavigate } from 'react-router';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './forgot-password.module.scss';
import { useAppDispatch, useAppSelector } from '@services/store';
import { forgotPassword } from '../../api/auth.api';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

	const { values, handleChange } = useForm({ email: '' });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(forgotPassword(values)).then((response) => {
			if (response.meta.requestStatus === 'fulfilled') {
				navigate('/reset-password', { state: { isForgotPage: true } });
			}
		});
	};

	return (
		<div className={s.container}>
			<form className={`${s.form} mb-20`} onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h2>
				<EmailInput
					name='email'
					value={values.email}
					placeholder='Укажите email'
					onChange={handleChange}
					isIcon={false}
					autoComplete='email'
				/>
				{errorMessage && <p>{errorMessage}</p>}
				<Button htmlType='submit'>
					{isLoading ? 'Загрузка...' : 'Восстановить'}
				</Button>
			</form>
			<div className={s.link}>
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
