import { FC } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type IngredientCardProps = {
	item: any;
};

export const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
	const { image, name, price } = item;

	return (
		<>
			<div className={`mt-7 ${s['ingredient-card']}`}>
				<Counter count={1} />
				<img src={image} alt={name} className='mb-1 ml-4 mr-4' />
				<div className='mb-1'>
					<span className='pr-2 text_type_digits-default'>{price}</span>
					<CurrencyIcon type={'primary'} />
				</div>
				<p className='text_type_main-default'>{name}</p>
			</div>
		</>
	);
};
