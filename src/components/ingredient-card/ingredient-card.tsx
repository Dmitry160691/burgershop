import { FC, useState } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetail } from '@components/ingredient-details/ingrediends-detail';
import { IngredientType } from '../../types/app.types';

type IngredientCardProps = {
	item: IngredientType;
	count?: number;
};

export const IngredientCard: FC<IngredientCardProps> = ({
	item,
	count = 1,
}) => {
	const { image, name, price } = item;
	const [isOpenIngredientDetails, setIsOpenIngredientDetails] = useState(false);

	const onOpen = () => setIsOpenIngredientDetails(true);
	const onClose = () => setIsOpenIngredientDetails(false);

	return (
		<>
			{isOpenIngredientDetails && (
				<IngredientDetail ingredient={item} onClose={onClose} />
			)}
			<div className={`mt-7 ${s.card}`} onClick={onOpen}>
				<Counter count={count} />
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
