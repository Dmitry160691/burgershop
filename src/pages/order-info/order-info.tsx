import { useAppSelector } from '../../services/store';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './order-info.module.scss';
import { OrderInfoItem } from '@components/order-info-item/order-info-item';
import { Loader } from '@components/loader/loader';

const statusMap = {
	created: 'Создан',
	pending: 'Готовится',
	done: 'Выполнен',
};

export function OrderInfo() {
	const { selectOrder } = useAppSelector((state) => state.view);
	const { data: ingredients } = useAppSelector((state) => state.ingredients);

	if (selectOrder && ingredients.length) {
		const ingredientCount = selectOrder.ingredients.reduce((acc, id) => {
			acc[id] = (acc[id] || 0) + 1;

			return acc;
		}, {} as { [id: string]: number });

		const ingredientsWithCount = Object.keys(ingredientCount).map((id) => ({
			id,
			count: ingredientCount[id],
		}));

		const totalPrice = Object.keys(ingredientCount).reduce((total, id) => {
			const ingredient = ingredients.find(
				(ingredient) => ingredient._id === id
			);

			if (ingredient) {
				total += ingredient.price * ingredientCount[id];
			}

			return total;
		}, 0);

		return (
			<div className={s.container}>
				<div className='pb-15'>
					<p className={`${s.number} text text_type_digits-default pb-10`}>
						#{selectOrder.number}
					</p>
					<h1 className='text text_type_main-medium pb-3'>
						{selectOrder.name}
					</h1>
					<div
						className='text text_type_main-default'
						style={{
							color: selectOrder.status === 'done' ? '#00cccc' : '',
						}}>
						{statusMap[selectOrder.status]}
					</div>
				</div>
				<div className={s.content}>
					<h2 className='text text_type_main-medium pb-6'>Состав:</h2>
					<ul className={`${s.list} pr-8`}>
						{ingredientsWithCount.map((ingredient) => (
							<OrderInfoItem key={ingredient.id} {...ingredient} />
						))}
					</ul>
				</div>
				<div className={`${s.bottom} pt-10`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(selectOrder.createdAt)}
					/>
					<div className={s.total}>
						<span className='text text_type_digits-default mr-2'>
							{totalPrice}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		);
	}

	return <Loader />;
}
