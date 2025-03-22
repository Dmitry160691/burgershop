import { FC } from 'react';
import s from './compound-block.module.scss';

type CompoundBlockProps = {
	title: string;
	value: string;
};

export const CompoundBlock: FC<CompoundBlockProps> = ({ title, value }) => {
	return (
		<div className={s.info}>
			<div className='text_type_main-small text_color_inactive mb-2'>
				{title}
			</div>
			<div className='text_type_digits-default text_color_inactive'>
				{value}
			</div>
		</div>
	);
};
