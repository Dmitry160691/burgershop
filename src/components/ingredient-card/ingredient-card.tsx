import { FC } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetail } from '@components/ingredient-details/ingrediends-detail';
import { IngredientType } from '../../types/app.types';
import { Modal } from '@components/modal/modal';
import { useModal } from '../../hooks/useModal';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '@services/store';
import { addIngredient, removeIngredient } from '@services/slices/viewSlice';

type IngredientCardProps = {
	ingredient: IngredientType;
};

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
	const { image, name, price, __v: count } = ingredient;

	const { isModalOpen, openModal, closeModal } = useModal();

	const dispatch = useAppDispatch();
	const [, drag] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	const handleOpenModal = () => {
		openModal();
		dispatch(addIngredient(ingredient));
	};

	const handleCloseModal = () => {
		closeModal();
		dispatch(removeIngredient());
	};

	return (
		<>
			{isModalOpen && (
				<Modal onClose={handleCloseModal} title='Детали ингредиента'>
					<IngredientDetail />
				</Modal>
			)}
			<div className={`mt-7 ${s.card}`} onClick={handleOpenModal} ref={drag}>
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
