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
import {
	OnlyAuth,
	OnlyUnAuth,
} from '@components/protected-route/protected-route';
import { useEffect } from 'react';
import { checkAuth } from '@utils/check-auth';

export const App = () => {
	const location = useLocation();
	const background = location.state?.background;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		navigate(-1);
		dispatch(removeIngredient());
	};

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<>
			<AppHeader />
			<main className={s.container}>
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route
						path='/register'
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route
						path='/profile'
						element={<OnlyAuth component={<ProfileLayout />} />}>
						<Route index element={<OnlyAuth component={<Profile />} />} />
						<Route
							path='orders'
							element={<OnlyAuth component={<Orders />} />}
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
