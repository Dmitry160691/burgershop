import s from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useEffect, useState } from 'react';
import { getIngredients } from '../api/burer-data.api';
import { TailSpin } from 'react-loader-spinner';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const result = await getIngredients();
				setData(result.data);
				setIsLoading(false);
			} catch (error) {
				console.error('Ошибка при получении ингредиентов:', error);
				setIsError(true);
				setIsLoading(false);
			}
		};
		fetch();
	}, []);

	return isLoading ? (
		<div className={s['blocks-wrapper']}>
			<TailSpin
				height='160'
				width='160'
				color='#4C4CFF'
				ariaLabel='tail-spin-loading'
				radius='1'
			/>
		</div>
	) : isError ? (
		<div className={`${s.error} text_type_main-large`}>Ой, сломалось...</div>
	) : (
		<>
			<AppHeader />
			<main className={s.container}>
				<BurgerIngredients data={data} />
				<BurgerConstructor data={data} />
			</main>
		</>
	);
};
