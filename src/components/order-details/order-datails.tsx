import { FC } from 'react';
import s from './order-datails.module.scss';
import imageDone from '../../assets/image-done.svg';
import { useAppSelector } from '@services/store';

export const OrderDetails: FC = () => {
	const { isLoading, isError, orderNumber } = useAppSelector(
		(state) => state.order
	);
	return (
		<div className={`${s.order} mt-4`}>
			{isLoading ? (
				<h2 className='text text_type_main-medium pb-15'>Loading...</h2>
			) : isError ? (
				<h2 className='text text_type_main-medium pb-15'>
					{'Ошибка при создании заказа. Попробуйте еще раз.'}
				</h2>
			) : (
				<>
					<span className={`${s['order-number']} text_type_digits-large mb-8`}>
						{orderNumber}
					</span>
					<span className='text_type_main-medium mb-15'>
						идентификатор заказа
					</span>
					<img src={imageDone} alt='success' className={`${s.img} mb-15`} />
					<span className='text_type_main-default mb-2'>
						Ваш заказ начали готовить
					</span>
					<span className='text_type_main-default text_color_inactive mb-15'>
						Дождитесь готовности на орбитальной станции
					</span>
				</>
			)}
		</div>
	);
};
