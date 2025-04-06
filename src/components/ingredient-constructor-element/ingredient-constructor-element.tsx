import { FC } from 'react';
import s from './ingredient-constructor-element.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@services/store';
import { useDrag, useDrop } from 'react-dnd';
import { moveIngredient } from '@services/slices/cartSlice';

type IngredientConstructorElementProps = {
	id: string;
	text: string;
	price: number;
	thumbnail: string;
	handleClose?: () => void;
};

export const IngredientConstructorElement: FC<
	IngredientConstructorElementProps
> = ({ text, price, thumbnail, id, handleClose }) => {
	const dispatch = useAppDispatch();

	const [, drag] = useDrag({
		type: 'move',
		item: { id },
	});

	const [, drop] = useDrop<{ id: string }>({
		accept: 'move',
		drop(item) {
			if (id && item.id !== id) {
				dispatch(moveIngredient({ fromId: id, toId: item.id }));
			}
		},
	});

	return (
		<div className={`${s.container}`} ref={(node) => drag(drop(node))}>
			<button className={s.grab}>
				<DragIcon type='primary' />
			</button>
			<ConstructorElement
				text={text}
				thumbnail={thumbnail}
				price={price}
				extraClass='ml-2'
				handleClose={handleClose}
			/>
		</div>
	);
};
