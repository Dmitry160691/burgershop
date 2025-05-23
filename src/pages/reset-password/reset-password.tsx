import React, { FC, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { resetPassword } from '../../api/auth.api';
import s from './reset-password.module.scss';
import { useForm } from '../../hooks/useForm';

export const ResetPassword: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

	const { values, handleChange } = useForm({
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

	useEffect(() => {
		if (!location.state?.isForgotPage) {
			navigate('/forgot-password', { replace: true });
		}
	}, [location, navigate]);

	return (
		<div className={s.container}>
			<form className={`${s.form} mb-20`} onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h2>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name='password'
					placeholder='Введите новый пароль'
					autoComplete='new-password'
				/>
				<Input
					type='text'
					placeholder='Введите код из письма'
					onChange={handleChange}
					value={values.token}
					name='token'
					error={!!errorMessage}
					errorText={errorMessage || 'Ошибка!'}
					size='default'
					autoComplete='one-time-code'
				/>
				{errorMessage && <p className={''}>{errorMessage}</p>}
				<Button htmlType='submit'>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
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
