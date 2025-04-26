import { FC, useEffect } from 'react';
import s from './ingredient.module.scss';
import { CompoundBlock } from '@components/compound-block/compound-block';
import { useAppDispatch, useAppSelector } from '@services/store';
import { Link, useParams } from 'react-router-dom';
import { getIngredients } from '../../api/get-ingredients.api ';
import { addIngredient } from '@services/slices/viewSlice';

export const Ingredient: FC = () => {
	const { id } = useParams();
	console.log('id', id);
	const { selectIngredient } = useAppSelector((state) => state.view);
	const { data, isLoading } = useAppSelector((state) => state.ingredients);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	useEffect(() => {
		if (data.length) {
			const currentIngredient = data.find((item) => item._id === id);

			currentIngredient && dispatch(addIngredient(currentIngredient));
		}
	}, [data]);

	return isLoading ? (
		'Добавить реакт-лоадер'
	) : data && selectIngredient ? (
		<div className={s.container}>
			<img
				src={selectIngredient.image_large}
				alt={selectIngredient.name}
				className={`${s.img} mb-4`}
			/>
			<span className='text_type_main-medium mb-8'>
				{selectIngredient.name}
			</span>
			<div className={s.compound}>
				<CompoundBlock
					title='Калории, ккал'
					value={selectIngredient.calories}
				/>
				<CompoundBlock title='Белки, г' value={selectIngredient.proteins} />
				<CompoundBlock title='Жиры, г' value={selectIngredient.fat} />
				<CompoundBlock
					title='Углеводы, г'
					value={selectIngredient.carbohydrates}
				/>
			</div>
		</div>
	) : (
		<div style={{ margin: '0 auto', textAlign: 'center' }}>
			<div className='text text_type_main-medium mb-4'>
				Ингридиент не найден
			</div>
			<Link to='/' className='text text_type_main-default text_color_inactive'>
				В конструктор
			</Link>
		</div>
	);
};
