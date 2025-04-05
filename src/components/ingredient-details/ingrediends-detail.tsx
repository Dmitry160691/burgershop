import { FC } from 'react';
import s from './ingrediends-detail.module.scss';
import { CompoundBlock } from '@components/compound-block/compound-block';
import { useAppSelector } from '@services/store';

export const IngredientDetail: FC = () => {
	const { selectIngredient } = useAppSelector((state) => state.view);
	if (!selectIngredient) return null;
	const {
		image_large: imageSrc,
		name,
		calories,
		proteins,
		fat,
		carbohydrates,
	} = selectIngredient;

	return (
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
