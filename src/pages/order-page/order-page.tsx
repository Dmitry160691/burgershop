import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@services/store';
import { OrderInfo } from '@pages/order-info/order-info';
import { fetchOrderById } from '../../api/post-order.api';
import s from './order-page.module.scss';

export function OrderPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { data, status } = useAppSelector((state) =>
		location.pathname.startsWith('/profile') ? state.auth : state.order
	);

	useEffect(() => {
		if (!id) return;
		const currentOrder = data?.orders.find((order) => order._id === id);
		if (!currentOrder) {
			dispatch(fetchOrderById(id));
		}
	}, [data]);

	return (
		<main className={`${s.content} pt-30`}>
			<OrderInfo />
		</main>
	);
}
