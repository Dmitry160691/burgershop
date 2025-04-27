import { FC } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import s from './loader.module.scss';

export const Loader: FC = () => {
	return (
		<div className={s.container}>
			<BallTriangle
				height={100}
				width={100}
				radius={5}
				color='#4C4CFF'
				ariaLabel='ball-triangle-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
		</div>
	);
};
