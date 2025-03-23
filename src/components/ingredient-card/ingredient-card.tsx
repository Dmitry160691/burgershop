import { FC, useState } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetail } from '@components/ingredient-details/ingrediends-detail';
import { IngredientType } from '../../types/app.types';
import { Modal } from '@components/modal/modal';
import { useModal } from '../../hooks/useModal';

type IngredientCardProps = {
	item: IngredientType;
	count?: number;
};

export const IngredientCard: FC<IngredientCardProps> = ({
	item,
	count = 1,
}) => {
	const { image, name, price } = item;

	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			{isModalOpen && (
				<Modal onClose={closeModal} title='Детали ингредиента'>
					<IngredientDetail ingredient={item} />
				</Modal>
			)}
			<div className={`mt-7 ${s.card}`} onClick={openModal}>
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
