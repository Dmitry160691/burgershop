
import s from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

export const App = () => {

	return (
		<>
			<AppHeader />
			<div className={s.container}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</>
	);
};
