import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { IngredientConstructorElement } from '@components/ingredient-constructor-element/ingredient-constructor-element';
import { FC, useState } from 'react';
import { OrderDetails } from '@components/order-details/order-datails';
import { IngredientType } from '../../types/app.types';
import { Modal } from '@components/modal/modal';
import { useModal } from '../../hooks/useModal';

type BurgerConstructorProps = {
	data: IngredientType[];
};

export const BurgerConstructor: FC<BurgerConstructorProps> = ({ data }) => {
	const bun = data.find((v) => v.type === 'bun');
	const mainComponents = data.filter((v) => v.type !== 'bun');
	const orderNumber = '034536';

	const { isModalOpen, openModal, closeModal } = useModal();

	if (!bun) return null;
	return (
		<>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
			<section className={`pl-4 ${s.container}`}>
				<div className={`mt-20 ${s['components-container']}`}>
					<div className='pl-8'>
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
					<ul className={s['components-main']}>
						{mainComponents.map((item, index) => (
							<IngredientConstructorElement
								key={index}
								text={`${item.name}`}
								price={item.price}
								thumbnail={item.image}
							/>
						))}
					</ul>
					<div className='pl-8'>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				</div>
				<div className={`mt-10 ${s.info}`}>
					<div className='mr-10'>
						<span className='text_type_digits-medium pr-2'>610</span>
						<CurrencyIcon type={'primary'} />
					</div>
					<Button
						htmlType='button'
						size='large'
						type='primary'
						onClick={openModal}>
						Оформить заказ
					</Button>
				</div>
			</section>
		</>
	);
};
