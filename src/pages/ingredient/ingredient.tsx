import { FC, useEffect } from 'react';
import s from './ingredient.module.scss';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Link, useParams } from 'react-router-dom';
import { addIngredient } from '@services/slices/viewSlice';
import { IngredientDetail } from '@components/ingredient-details/ingrediends-detail';

export const Ingredient: FC = () => {
	const { id } = useParams();
	const { selectIngredient } = useAppSelector((state) => state.view);
	const { data } = useAppSelector((state) => state.ingredients);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data.length) {
			const currentIngredient = data.find((item) => item._id === id);

			currentIngredient && dispatch(addIngredient(currentIngredient));
		}
	}, [data]);

	return (
		<div className={s.container}>
			{data && selectIngredient ? (
				<div className={`${s.ingredient} mt-30`}>
					<h1 className={`${s.title} text_type_main-large`}>
						Детали ингредиента
					</h1>
					<IngredientDetail />
				</div>
			) : (
				<div className={s.ingredient}>
					<h1 className={`${s.title} text_type_main-large mt-30 mb-20`}>
						Ингридиент не найден
					</h1>
					<div className={s.title}>
						<Link
							to='/'
							className='text text_type_main-default text_color_inactive'>
							В конструктор
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
