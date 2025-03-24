import { FC } from 'react';
import s from './ingredient-category.module.scss';
import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { IngredientType } from '../../types/app.types';

type IngredientCategoryProps = {
	title: string;
	items: IngredientType[];
};

export const IngredientCategory: FC<IngredientCategoryProps> = ({
	title,
	items,
}) => {
	return (
		<>
			<h2 className='mt-10 text_type_main-medium'>{title}</h2>
			<div className={`ml-3 mb-3 ${s['flex-container']}`}>
				{items.map((item) => (
					<IngredientCard key={item._id} item={item} />
				))}
			</div>
		</>
	);
};
