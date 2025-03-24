import { FC } from 'react';
import s from './ingredient-constructor-element.module.scss';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type IngredientConstructorElementProps = {
	text: string;
	price: number;
	thumbnail: string;
};

export const IngredientConstructorElement: FC<
	IngredientConstructorElementProps
> = ({ text, price, thumbnail }) => {
	return (
		<div className={`${s.container}`}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={text}
				thumbnail={thumbnail}
				price={price}
				extraClass='ml-2'
			/>
		</div>
	);
};
