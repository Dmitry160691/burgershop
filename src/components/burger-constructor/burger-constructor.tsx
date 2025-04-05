import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { IngredientConstructorElement } from '@components/ingredient-constructor-element/ingredient-constructor-element';
import { FC, useMemo } from 'react';
import { OrderDetails } from '@components/order-details/order-datails';
import { IngredientType, IngredientAndIdType } from '../../types/app.types';
import { Modal } from '@components/modal/modal';
import { useModal } from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useDrop } from 'react-dnd';
import {
	addIngredient,
	clearCart,
	removeIngredient,
} from '@services/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import {
	minusAll,
	minusCount,
	plusBun,
	plusCount,
} from '@services/slices/ingredientsSlice';
import { postOrder } from '../../api/post-order.api';

export const BurgerConstructor: FC = () => {
	const { data } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const { isModalOpen, openModal, closeModal } = useModal();

	const bun = data.find((v) => v.type === 'bun');
	const mainComponents = data.filter((v) => v.type !== 'bun');
	const count = useMemo(() => {
		return data.reduce((prev, current) => {
			if (current.type === 'bun') {
				return prev + current.price * 2;
			} else {
				return prev + current.price;
			}
		}, 0);
	}, [data]);

	const handleSubmitOrder = async () => {
		openModal();

		const result = await dispatch(
			postOrder({
				ingredients: data.map((item) => item._id),
			})
		);

		if (postOrder.fulfilled.match(result)) {
			dispatch(clearCart());
			dispatch(minusAll());
		}
	};

	const [, drop] = useDrop<IngredientType>({
		accept: 'ingredient',
		drop(item) {
			dispatch(addIngredient({ ...item, id: uuidv4() } as IngredientAndIdType));

			if (item.type === 'bun') {
				dispatch(plusBun(item._id));
			} else {
				dispatch(plusCount(item._id));
			}
		},
	});

	return (
		<>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
			<section ref={drop} className={`pl-4 ${s.container}`}>
				<>
					<div className={`mt-20 ${s['components-container']}`}>
						{bun ? (
							<div className='pl-8'>
								<ConstructorElement
									type='top'
									isLocked={true}
									text={`${bun.name} (верх)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							</div>
						) : (
							<div
								className={`${s['components-list']} ${s.top} text text_type_main-default`}>
								Выберите булки
							</div>
						)}
						<ul className={s['components-main']}>
							{mainComponents.length ? (
								mainComponents.map((item) => (
									<IngredientConstructorElement
										id={item.id}
										key={item.id}
										text={`${item.name}`}
										price={item.price}
										thumbnail={item.image}
										handleClose={() => {
											dispatch(removeIngredient(item.id));
											dispatch(minusCount(item._id));
										}}
									/>
								))
							) : (
								<li
									className={`${s['components-list']} text text_type_main-default`}>
									Выберите начинку
								</li>
							)}
						</ul>
						{bun ? (
							<div className='pl-8'>
								<ConstructorElement
									type='bottom'
									isLocked={true}
									text={`${bun.name} (низ)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							</div>
						) : (
							<div
								className={`${s['components-list']} ${s.bottom} text text_type_main-default`}>
								Выберите булки
							</div>
						)}
					</div>
					<div className={`mt-10 ${s.info}`}>
						<div className='mr-10'>
							<span className='text_type_digits-medium pr-2'>{count}</span>
							<CurrencyIcon type={'primary'} />
						</div>
						<Button
							htmlType='button'
							size='large'
							type='primary'
							onClick={handleSubmitOrder}>
							Оформить заказ
						</Button>
					</div>
				</>
			</section>
		</>
	);
};
