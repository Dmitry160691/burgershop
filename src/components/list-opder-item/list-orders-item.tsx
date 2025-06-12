import { ListOrdersBadge as Badge } from '../list-order-badge/list-orders-badge';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router';
import s from './list-orders-item.module.scss';
import { useAppDispatch, useAppSelector } from '@services/store';
import { addOrder } from '@services/slices/view/viewSlice';
import { OrderType } from '../../types/app.types';
import { FC } from 'react';

type ListOrdersItem = {
	hasStatus?: boolean;
} & OrderType;

const status = {
	created: 'Создан',
	pending: 'Готовится',
	done: 'Выполнен',
};

export const ListOrdersItem: FC<ListOrdersItem> = (props) => {
	const {
		ingredients: ingredientsProp,
		_id: id,
		number,
		createdAt,
		name,
		hasStatus,
		status: statusProp,
	} = props;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isLoading, isError, data } = useAppSelector(
		(state) => state.ingredients
	);

	const handleOpenModal = () => {
		navigate(id, {
			state: { background: location },
		});
		dispatch(addOrder(props));
	};

	const ingredients = ingredientsProp
		.map((ingredient) => data.find((item) => item._id === ingredient))
		.filter(
			(ingredient): ingredient is NonNullable<typeof ingredient> =>
				ingredient != null
		);

	const total = ingredients.reduce((sum, { price }) => sum + price, 0);

	return (
		<div className={`${s.item}`} onClick={handleOpenModal}>
			<div className={`${s.header} pb-6`}>
				<p className='text text_type_digits-default'>{`#${number}`}</p>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(createdAt)}
				/>
			</div>
			<h3 className='text text_type_main-medium'>{name}</h3>
			{hasStatus && (
				<div className='pb-6'>
					<p
						className='text text_type_main-default pt-2'
						style={statusProp === 'done' ? { color: '#00CCCC' } : undefined}>
						{status[statusProp]}
					</p>
				</div>
			)}
			<div className={s.bottom}>
				{isLoading ? (
					<p>Загрузка...</p>
				) : isError ? (
					<p className='text text_type_main-default text_color_error'>
						Ошибка получения данных
					</p>
				) : (
					<>
						<div className={`${s.badges}`}>
							{ingredients.slice(0, 6).map((ingredient, i) => {
								return (
									<Badge
										key={i}
										text={
											i === 5 && ingredients.length > 6
												? `+${ingredients.length - 6}`
												: undefined
										}
										background={`center / cover no-repeat url("${ingredient.image_mobile}"), #131316`}
										style={{
											left: `-${16 * i}px`,
											zIndex: -i,
										}}
									/>
								);
							})}
						</div>
						<p className={`${s.price} text text_type_digits-default`}>
							{total}
							<CurrencyIcon type='primary' />
						</p>
					</>
				)}
			</div>
		</div>
	);
};
