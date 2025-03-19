import { useState } from 'react';
import s from './burger-ingredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '@utils/data';
import { groupByType } from '@utils/groupByType';
import { IngredientCategory } from '@components/ingredient-category/ingredient-category';

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState('bun');

	const res = groupByType(data);

	const tabs = [
		{
			title: 'Булки',
			value: 'bun',
		},
		{
			title: 'Соусы',
			value: 'sauce',
		},
		{
			title: 'Начинки',
			value: 'main',
		},
	];

	return (
		<div className={s.container}>
			<h1 className='mt-10 text_type_main-large'>Соберите бургер</h1>
			<div className={`mt-5 ${s['container-tabs']}`}>
				{tabs.map((v, index) => (
					<Tab
						key={index}
						value={v.value}
						active={current === v.value}
						onClick={setCurrent}>
						{v.title}
					</Tab>
				))}
			</div>
			<div className={s['container-ingredient-category']}>
				{tabs.map((v) => (
					<IngredientCategory
						key={v.value}
						title={v.title}
						items={res[v.value]}
					/>
				))}
			</div>
		</div>
	);
};
