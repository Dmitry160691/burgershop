import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	component: React.ReactElement;
};

type OnlyUnAuthProps = {
	component: React.ReactElement;
};

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
	onlyUnAuth = false,
	component,
}) => {
	const { user, isLoading } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (isLoading) {
		return <Loader />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}
	return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: React.FC<OnlyUnAuthProps> = ({ component }) => (
	<ProtectedRouteElement onlyUnAuth component={component} />
);
