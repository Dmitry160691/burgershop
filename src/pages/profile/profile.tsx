import React, { FC, useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '@services/store';
import { updateUser } from '../../api/user.api';
import s from './profile.module.scss';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	const { values, setValues, handleChange } = useForm({
		name: user ? user.name : '',
		email: user ? user.email : '',
		password: '',
	});

	const [isChanged, setChanged] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(updateUser(values));
		setValues((prev) => ({ ...prev, password: '' }));
		setChanged(false);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isChanged) setChanged(true);
		handleChange(e);
	};

	const handleCancel = () => {
		setValues({
			name: user ? user.name : '',
			email: user ? user.email : '',
			password: '',
		});
		setChanged(false);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<Input
				value={values.name}
				onChange={onInputChange}
				placeholder='Имя'
				name='name'
				icon='EditIcon'
			/>
			<EmailInput
				value={values.email}
				onChange={onInputChange}
				name='email'
				placeholder='E-mail'
				isIcon={true}
			/>
			<PasswordInput
				value={values.password}
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
