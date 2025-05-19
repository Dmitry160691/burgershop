import { FC, useState } from 'react';
import s from './burger-ingredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCategory } from '@components/ingredient-category/ingredient-category';
import { useAppSelector } from '@services/store';

export const BurgerIngredients: FC = () => {
	const [current, setCurrent] = useState('bun');

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

	const { data, isLoading, isError } = useAppSelector(
		(state) => state.ingredients
	);

	const handleScroll = (event: React.UIEvent<HTMLElement>) => {
		const containerTop = event.currentTarget.getBoundingClientRect().top;
		const containerScroll = event.currentTarget.scrollTop;

		let closestKey: string | null = null;
		let distance = Infinity;

		tabs
			.map((v) => v.value)
			.forEach((key) => {
				const element = document.getElementById(key);

				if (element) {
					const elementTop =
						element.getBoundingClientRect().top -
						containerTop +
						containerScroll;

					const distanceToTop = Math.abs(elementTop - containerScroll);

					if (distanceToTop < distance) {
						distance = distanceToTop;
						closestKey = key;
					}
				}
			});

		if (closestKey !== null) {
			setCurrent(closestKey);
		}
	};

	return (
		<section className={s.container}>
			<h1 className='mt-10 text_type_main-large'>Соберите бургер</h1>
			<div className={`mt-5 ${s['container-tabs']}`}>
				{tabs.map((v) => (
					<a key={v.value} href={`#${v.value}`} className={s.link}>
						<Tab
							value={v.value}
							active={current === v.value}
							onClick={() => setCurrent(v.value)}>
							{v.title}
						</Tab>
					</a>
				))}
			</div>
			{isLoading ? (
				'Loading...'
			) : isError ? (
				'Ошибка, мы уже спешим на помощь'
			) : (
				<div
					className={s['container-ingredient-category']}
					onScroll={handleScroll}>
					{tabs.map((v) => (
						<div id={v.value} key={v.value}>
							<IngredientCategory
								title={v.title}
								items={data.filter((item) => item.type === v.value)}
							/>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
