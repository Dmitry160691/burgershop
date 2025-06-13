import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addOrder, removeOrder } from '@services/slices/view/viewSlice';
import { OrderInfo } from '@pages/order-info/order-info';
import { Modal } from './modal';
import { useAppDispatch, useAppSelector } from '@services/store';

export const OrderModal = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { id } = useParams();
	const { selectOrder } = useAppSelector((state) => state.view);
	const { data, status } = useAppSelector((state) =>
		location.pathname.startsWith('/profile') ? state.auth : state.order
	);

	const handleCloseOrderModal = () => {
		navigate(-1);
		dispatch(removeOrder());
	};

	useEffect(() => {
		const currentOrder = data?.orders.find((order) => order._id === id);

		currentOrder && dispatch(addOrder(currentOrder));
	}, [data, id]);

	if (status === 'error') {
		return <div>Ошибка при загрузке заказов</div>;
	}

	if (data?.orders?.length && selectOrder) {
		return (
			<Modal onClose={handleCloseOrderModal} title='Детали ингредиента'>
				<OrderInfo />
			</Modal>
		);
	}
};
