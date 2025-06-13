import { FC, useEffect } from 'react';
import s from './ingrediends-detail.module.scss';
import { CompoundBlock } from '@components/compound-block/compound-block';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useParams } from 'react-router-dom';
import { addIngredient } from '@services/slices/view/viewSlice';

export const IngredientDetail: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const { selectIngredient } = useAppSelector((state) => state.view);
	const { data, isLoading } = useAppSelector((state) => state.ingredients);

	useEffect(() => {
		const product = data.find((item) => item._id === id);

		if (product) dispatch(addIngredient(product));
	}, [id, data]);

	if (!selectIngredient) return <div>Ошибка при загрузке данных</div>;
	const {
		image_large: imageSrc,
		name,
		calories,
		proteins,
		fat,
		carbohydrates,
	} = selectIngredient;

	return isLoading ? null : (
		<div className={s.container}>
			<img src={imageSrc} alt={name} className={`${s.img} mb-4`} />
			<span className='text_type_main-medium mb-8'>{name}</span>
			<div className={s.compound}>
				<CompoundBlock title='Калории, ккал' value={calories} />
				<CompoundBlock title='Белки, г' value={proteins} />
				<CompoundBlock title='Жиры, г' value={fat} />
				<CompoundBlock title='Углеводы, г' value={carbohydrates} />
			</div>
		</div>
	);
};
