import { CSSProperties, ReactNode } from 'react';
import s from './progress.module.scss';
import { OrderType } from '../../types/app.types';

type ProgressColumnProps = {
	title: string;
	children?: ReactNode;
	orders: OrderType[];
	style?: CSSProperties;
};

export function ProgressColumn({ title, orders, style }: ProgressColumnProps) {
	return (
		<div className={s.columnRoot}>
			<h3 className='text text_type_main-medium mb-6'>{title}</h3>
			<div className={s.column}>
				{orders.map((order) => (
					<p
						key={order._id}
						className={`${s.item} text text_type_digits-default`}
						style={style}>
						{order.number}
					</p>
				))}
			</div>
		</div>
	);
}
