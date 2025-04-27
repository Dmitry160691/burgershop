import React, { useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { RequestUserUpdate } from '../../types/app.types';
import { updateUser } from '../../api/user.api';
import s from './profile.module.scss';

export const Profile = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	const [value, setValue] = useState<RequestUserUpdate>({
		name: user ? user.name : '',
		email: user ? user.email : '',
		password: '',
	});

	const [isChanged, setChanged] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(updateUser(value));
		setValue((prev) => ({ ...prev, password: '' }));
		setChanged(false);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (!isChanged) setChanged(true);
		setValue((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCancel = () => {
		setValue({
			name: user ? user.name : '',
			email: user ? user.email : '',
			password: '',
		});
		setChanged(false);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<Input
				value={value.name}
				onChange={onInputChange}
				placeholder='Имя'
				name='name'
				icon='EditIcon'
			/>
			<EmailInput
				value={value.email}
				onChange={onInputChange}
				name='email'
				placeholder='E-mail'
				isIcon={true}
			/>
			<PasswordInput
				value={value.password}
				onChange={onInputChange}
				name='password'
				icon='EditIcon'
			/>
			{isChanged && (
				<div className={s.buttons}>
					<Button htmlType='button' type='secondary' onClick={handleCancel}>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
