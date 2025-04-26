import { Link, useLocation } from 'react-router-dom';
import s from './menu-item.module.scss';
import { FC } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type MenuItemProps = {
	icon: FC<TIconProps>;
	text: string;
	path: string;
};

export const MenuItem: FC<MenuItemProps> = ({ icon, text, path }) => {
	const { pathname } = useLocation();
	const active = pathname === path;
	const textStyle = active ? 'text_color_primary' : 'text_color_inactive';

	return (
		<Link to={path} className={`mt-4 mb-4 ml-5 mr-5 ${s.item}`}>
			{icon({ type: active ? 'primary' : 'secondary' })}
			<span className={`ml-2 text_type_main-default ${textStyle}`}>{text}</span>
		</Link>
	);
};
