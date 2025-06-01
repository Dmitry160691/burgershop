import ListOrders from '@components/list-order/list-order';
import { useAppDispatch, useAppSelector } from '../../services/store';
import ProgressOrders from '@components/progress/progress-orders';
import { useEffect } from 'react';
import { disconnect, connect } from '@services/slices/orderSlice';
import s from './feed.module.scss';
import { Loader } from '@components/loader/loader';
import { WSS_ORDERS_URL } from '../../constants';

export function Feed() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(connect(WSS_ORDERS_URL));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	const { data, status } = useAppSelector((state) => state.order);

	if (status === 'error') {
		return <div>Ошибка при загрузке заказов</div>;
	}

	if (data?.orders?.length && status === 'connected') {
		return (
			<div>
				<h1 className='mt-10 mb-5 text_type_main-large'>Лента заказов</h1>
				<div className={s.feed}>
					<ListOrders orders={data.orders} />
					<ProgressOrders
						total={data.total}
						totalToday={data.totalToday}
						orders={data.orders}
					/>
				</div>
			</div>
		);
	}

	return <Loader />;
}
