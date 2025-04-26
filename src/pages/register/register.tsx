import React, { useState } from 'react';
import { Link } from 'react-router';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { register } from '../../api/auth.api';
import { RequestRegister } from '../../types/app.types';

export const Register = () => {
	const dispatch = useAppDispatch();

	const { isError, errorMessage } = useAppSelector((state) => state.auth);

	const [value, setValue] = useState<RequestRegister>({
		email: '',
		password: '',
		name: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(register(value));
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValue((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div className={''}>
			<form className='mb-20' onSubmit={handleSubmit}>
				<h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
				<Input
					type='text'
					placeholder='Имя'
					onChange={onInputChange}
					value={value.name}
					name='name'
				/>
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
				{isError && <p className={''}>{errorMessage}</p>}
				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
			</form>
			<div>
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
