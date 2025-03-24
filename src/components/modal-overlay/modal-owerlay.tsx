import s from './modal-owerlay.module.scss';
import { FC, ReactElement } from 'react';

type ModalOverlayProps = {
	onClose: () => void;
	children?: ReactElement;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
	return <div onClick={onClose} className={s.container} />;
};
