import { FC } from 'react';
import s from './ingredient-category.module.scss';
import { IngredientCard } from '@components/ingredient-card/ingredient-card';

type IngredientCategoryProps = {
	title: string;
	items: any[];
};

export const IngredientCategory: FC<IngredientCategoryProps> = ({
	title,
	items,
}) => {
	return (
		<>
			<h2 className='mt-10 text_type_main-medium'>{title}</h2>
			<div className={`ml-3 mr-3 mb-3 ${s['flex-container']}`}>
				{items.map((item, index) => (
					<IngredientCard key={index} item={item} />
				))}
			</div>
		</>
	);
};
