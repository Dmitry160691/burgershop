// import { ListOrdersItem } from '@components/list-opder-item/ListOrdersItem';
import { ListOrdersItem } from '@components/list-opder-item/list-orders-item';
import { OrderType } from '../../types/app.types';
import s from './list-order.module.scss';

type ListOrdersProps = {
	orders: OrderType[];
};

export default function ListOrders({ orders }: ListOrdersProps) {
	return (
		<section className={s.wrapper}>
			{orders.map((item) => (
				<ListOrdersItem key={item._id} {...item} />
			))}
		</section>
	);
}
