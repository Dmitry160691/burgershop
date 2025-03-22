import s from './modal-owerlay.module.scss';
import { FC, ReactElement } from 'react';

type ModalOverlayProps = {
	handleClose: () => void;
	children?: ReactElement;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ handleClose }) => {
	return <div onClick={handleClose} className={s.container} />;
};
