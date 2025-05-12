import { NavLink } from 'react-router-dom';
import s from './not-found.module.scss';

export const NotFound = () => {
	return (
		<div className={s.center}>
			<p className='text text_type_main-large mt-25 mb-6'>Ой, 404...</p>
			<NavLink to='/'>
				<p className='text text_type_main-medium'>На главную</p>
			</NavLink>
		</div>
	);
};
