import s from './list-order-badge.module.scss';

type Props = {
	background: string;
	text?: string;
	style?: React.CSSProperties;
};

export function ListOrdersBadge({ background, text, ...props }: Props) {
	const style = text
		? {
				background,
				opacity: 0.6,
		  }
		: {
				background,
		  };

	return (
		<span className={s.badge} {...props}>
			<span className={s.background} style={style}></span>
			{text && (
				<span className={`text text_type_main-default ${s.extra}`}>{text}</span>
			)}
		</span>
	);
}
