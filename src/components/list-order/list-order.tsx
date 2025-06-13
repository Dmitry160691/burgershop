import { ListOrdersItem } from '@components/list-opder-item/list-orders-item';
import { OrderType } from '../../types/app.types';
import s from './list-order.module.scss';
import { FC } from 'react';

type ListOrdersProps = {
	orders: OrderType[];
};

export const ListOrders: FC<ListOrdersProps> = ({ orders }) => {
	return (
		<section className={s.wrapper}>
			{orders.map((item) => (
				<ListOrdersItem key={item._id} {...item} />
			))}
		</section>
	);
};
