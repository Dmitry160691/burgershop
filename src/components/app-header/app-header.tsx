import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';
import { MenuItem } from '@components/menu-item/menu-item';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const AppHeader: FC = () => {
	return (
		<header className={s.header}>
			<div className={s['left-block']}>
				<MenuItem icon={BurgerIcon} text='Конструктор' path='/' />
				<MenuItem icon={ListIcon} text='Лента заказов' path='/feed' />
			</div>

			<Link to='/'>
				<Logo />
			</Link>
			<div className={s['right-block']}>
				<MenuItem icon={ProfileIcon} text='Личный кабинет' path='/profile' />
			</div>
		</header>
	);
};
