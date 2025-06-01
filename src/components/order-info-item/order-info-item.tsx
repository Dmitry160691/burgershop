import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './order-info-item.module.scss';
import { useAppSelector } from '@services/store';

type Props = {
	id: string;
	count: number;
};

export function OrderInfoItem({ id, count }: Props) {
	const { isLoading, isError, data } = useAppSelector(
		(state) => state.ingredients
	);

	if (isLoading && isError) return null;

	const currentIngredient = data.find((item) => item._id === id);

	return currentIngredient ? (
		<li className={s.item}>
			<span className={s.badge}>
				<span
					className={s.background}
					style={{
						background: `center / cover no-repeat url("${currentIngredient.image_mobile}"), #131316`,
					}}></span>
			</span>
			<p className='text text_type_main-default ml-4'>
				{currentIngredient.name}
			</p>
			<div className={s.total}>
				<span className='text text_type_digits-default mr-2'>
					{`${count} x ${currentIngredient.price}`}
				</span>
				<CurrencyIcon type='primary' />
			</div>
		</li>
	) : null;
}
