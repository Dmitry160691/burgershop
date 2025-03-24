import { FC } from 'react';
import s from './ingrediends-detail.module.scss';
import { CompoundBlock } from '@components/compound-block/compound-block';
import { IngredientType } from '../../types/app.types';

type IngredientDetailProps = {
	ingredient: IngredientType;
};

export const IngredientDetail: FC<IngredientDetailProps> = ({ ingredient }) => {
	const {
		image_large: imageSrc,
		name,
		calories,
		proteins,
		fat,
		carbohydrates,
	} = ingredient;

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
