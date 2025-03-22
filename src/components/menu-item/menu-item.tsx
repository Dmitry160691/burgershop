import s from './menu-item.module.scss';
import { FC, ReactNode } from 'react';

type MenuItemProps = {
	icon: ReactNode;
	text: string;
};

export const MenuItem: FC<MenuItemProps> = ({ icon, text }) => {
	return (
		<a href='/' className={`mt-4 mb-4 ml-5 mr-5 ${s.item}`}>
			{icon}
			<span className={'ml-2 text_type_main-default text_color_inactive'}>
				{text}
			</span>
		</a>
	);
};
