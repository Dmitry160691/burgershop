import { FC } from 'react';
import s from './progress.module.scss';

type ProgressDoneProps = {
	title: string;
	total: number;
};

export const ProgressDone: FC<ProgressDoneProps> = ({ title, total }) => {
	return (
		<div className={s.done}>
			<h3 className='text text_type_main-medium'>{title}</h3>
			<div
				className='text text_type_digits-large'
				style={{
					textShadow: '0 4px 32px rgb(51 51 255 / 50%)',
				}}>
				{total}
			</div>
		</div>
	);
};
