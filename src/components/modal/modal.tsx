import s from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useEffect } from 'react';
import { ModalOverlay } from '@components/modal-overlay/modal-owerlay';
import { createPortal } from 'react-dom';

type ModalProps = {
	onClose: () => void;
	title?: string;
	children: ReactElement;
};

const modal = document.getElementById('modal');

export const Modal: FC<ModalProps> = ({ onClose, title, children }) => {
	useEffect(() => {
		const onEscKeyPressed = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', onEscKeyPressed);

		return () => {
			document.removeEventListener('keydown', onEscKeyPressed);
		};
	}, [onClose]);

	if (!modal) return null;

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={`${s.container} pt-10 pr-10 pb-15 pl-10`}>
				<div className={s.header}>
					<h1 className='text text_type_main-large'>{title}</h1>
					<CloseIcon className={s.icon} type='primary' onClick={onClose} />
				</div>
				{children}
			</div>
		</>,
		modal
	);
};
