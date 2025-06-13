import { OrderType } from '../../types/app.types';
import s from './progress.module.scss';
import { ProgressDone } from './progress-done';
import { ProgressColumn } from './progress-column';
import { FC } from 'react';

type ProgressOrdersProps = {
	orders: OrderType[];
	total: number;
	totalToday: number;
};

export const ProgressOrders: FC<ProgressOrdersProps> = ({
	total,
	totalToday,
	orders,
}) => {
	const ordersDone = orders
		.filter((order) => order.status === 'done')
		.slice(0, 10);
	const ordersPending = orders
		.filter((order) => order.status === 'pending')
		.slice(0, 10);

	return (
		<aside className={s.aside}>
			<div className={s.top}>
				<ProgressColumn
					title='Готовы:'
					orders={ordersDone}
					style={{ color: '#00CCCC' }}
				/>
				<ProgressColumn title='В работе:' orders={ordersPending} />
			</div>
			<ProgressDone title='Выполнено за все время:' total={total} />
			<ProgressDone title='Выполнено за сегодня:' total={totalToday} />
		</aside>
	);
};
