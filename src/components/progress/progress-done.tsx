import s from './progress.module.scss';

type Props = {
	title: string;
	total: number;
};

export default function ProgressDone({ title, total }: Props) {
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
}
