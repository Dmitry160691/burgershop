import s from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement } from 'react';
import { ModalOverlay } from '@components/modal-overlay/modal-owerlay';

type ModalProps = {
	handleClose: () => void;
	title?: string;
	children: ReactElement;
};

export const Modal: FC<ModalProps> = ({ handleClose, title, children }) => {
	return (
		<>
			<ModalOverlay hendrler={handleClose} />
			<div
				className={`${s.container} pt-10 pr-10 pb-15 pl-10`}
				onClick={() => console.log('тык')}>
				<div className={s.header}>
					<h1 className='text text_type_main-large'>{title}</h1>
					<CloseIcon className={s.ikon} type='primary' onClick={handleClose} />
				</div>
				{children}
			</div>
		</>
	);
};
