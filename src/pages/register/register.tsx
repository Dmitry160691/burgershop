import React from 'react';
import { Link } from 'react-router';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { register } from '../../api/auth.api';
import s from './register.module.scss';
import { useForm } from '../../hooks/useForm';

export const Register = () => {
	const dispatch = useAppDispatch();

	const { errorMessage } = useAppSelector((state) => state.auth);

	const { values, handleChange } = useForm({
		email: '',
		password: '',
		name: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(register(values));
	};

	return (
		<div className={s.container}>
			<form className={`${s.form} mb-20`} onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
				<Input
					type='text'
					placeholder='Имя'
					onChange={handleChange}
					value={values.name}
					name='name'
				/>
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
				{errorMessage && <p className={''}>{errorMessage}</p>}
				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
			</form>
			<div className={s.link}>
				<span className='text text_type_main-default text_color_inactive mr-2'>
					Уже зарегистрированы?
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
