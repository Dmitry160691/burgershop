import s from './app.module.scss';
import { AppHeader } from '@components/app-header/app-header';
import { Home } from '@pages/home/home';
import { NotFound } from '@pages/not-found/not-found';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from '@pages/login/login';
import { Register } from '@pages/register/register';
import { ResetPassword } from '@pages/reset-password/reset-password';
import { ForgotPassword } from '@pages/forgot-password/forgot-password';
import { Modal } from '@components/modal/modal';
import { IngredientDetail } from '@components/ingredient-details/ingrediends-detail';
import { useAppDispatch } from '@services/store';
import { removeIngredient } from '@services/slices/viewSlice';
import { Ingredient } from '@pages/ingredient/ingredient';
import { Orders } from '@pages/orders/orders';
import { ProfileLayout } from '@pages/profile-layout/profile-layout';
import { Profile } from '@pages/profile/profile';

export const App = () => {
	const location = useLocation();
	const background = location.state?.background;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		navigate(-1);
		dispatch(removeIngredient());
	};

	return (
		<>
			<AppHeader />
			<main className={s.container}>
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						//TODO
						element={<Login />}
					/>
					<Route
						path='/register'
						//TODO
						element={<Register />}
					/>
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route
						path='/reset-password'
						//TODO
						element={<ResetPassword />}
					/>
					<Route
						path='/profile'
						//TODO
						element={<ProfileLayout />}>
						<Route
							index
							//TODO
							element={<Profile />}
						/>
						<Route
							path='orders'
							//TODO
							element={<Orders />}
						/>
					</Route>
					<Route path='/ingredients/:id' element={<Ingredient />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				{background && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal onClose={handleCloseModal} title='Детали ингредиента'>
									<IngredientDetail />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</>
	);
};
