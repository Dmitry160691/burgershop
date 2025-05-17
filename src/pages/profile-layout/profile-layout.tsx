import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import s from './profile-layout.module.scss';
import { useAppDispatch } from '@services/store';
import { logout } from '../../api/auth.api';
import { FC } from 'react';

export const ProfileLayout: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onExit = () => {
		dispatch(logout()).then((response) => {
			if (response.meta.requestStatus === 'fulfilled') {
				navigate('/login', { replace: true });
			}
		});
	};

	return (
		<div className={s.container}>
			<div className={s.left}>
				<ul className={s.navigate}>
					<li className={s.link}>
						<NavLink to='/profile' end>
							{({ isActive }) => (
								<span
									className={`text text_type_main-medium ${
										isActive ? s.active : ''
									}`}>
									{'Профиль'}
								</span>
							)}
						</NavLink>
					</li>
					<li className={s.link}>
						<NavLink to='orders'>
							{({ isActive }) => (
								<span
									className={`text text_type_main-medium ${
										isActive ? s.active : ''
									}`}>
									{'История заказов'}
								</span>
							)}
						</NavLink>
					</li>
					<li className={s.link}>
						<span
							className={`${s.exit} text text_type_main-medium`}
							onClick={onExit}>
							Выход
						</span>
					</li>
				</ul>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<Outlet />
		</div>
	);
};
