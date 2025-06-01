import ListOrders from '@components/list-order/list-order';
import { useAppSelector } from '@services/store';

export const Orders = () => {
	const { data, status } = useAppSelector((state) => state.auth);

	if (status === 'error') {
		return <div>Ошибка при загрузке заказов</div>;
	}

	if (data?.orders?.length && status === 'connected') {
		return <ListOrders orders={data.orders.slice().reverse()} />;
	}
};
