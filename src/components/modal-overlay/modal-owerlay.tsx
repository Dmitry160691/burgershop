import s from './modal-owerlay.module.scss';
import { FC, ReactElement } from 'react';

type ModalOverlayProps = {
	hendrler: () => void;
	children?: ReactElement;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ hendrler }) => {
	return <div onClick={hendrler} className={s.container} />;
};
