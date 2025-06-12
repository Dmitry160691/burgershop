import { FC } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../types/app.types';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '@services/store';
import { addIngredient } from '@services/slices/view/viewSlice';
import { useLocation, useNavigate } from 'react-router-dom';

type IngredientCardProps = {
	ingredient: IngredientType;
};

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
	const { image, name, price, __v: count, _id: id } = ingredient;

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [, drag] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	const handleOpenModal = () => {
		navigate(`/ingredients/${id}`, {
			state: { background: location },
		});
		dispatch(addIngredient(ingredient));
	};

	return (
		<>
			<div className={`${s.card} mt-7 `} onClick={handleOpenModal} ref={drag}>
				{!!count && <Counter count={count} />}
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
