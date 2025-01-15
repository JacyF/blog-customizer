import { useEffect } from 'react';

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {

		if (!isMenuOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isMenuOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose?.();
			}
		};

		document.addEventListener('keydown', handleEscape);
		window.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen, rootRef, onClose, onChange]);
};
