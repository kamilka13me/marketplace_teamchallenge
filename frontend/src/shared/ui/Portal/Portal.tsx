import { ReactNode, FC, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

const portalRoot = document.body as HTMLElement;

interface PortalProps {
  children: string | ReactNode;
  onClose: () => void;
}

const Portal: FC<PortalProps> = (props) => {
  const { children, onClose } = props;

  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.classList.add(
      'fixed',
      'top-0',
      'left-0',
      'w-screen',
      'h-screen',
      'bg-black-transparent-50',
      'z-[99999]',
    );
  }

  useEffect(() => {
    const el = elRef.current!;

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === el) {
        onClose();
      }
    };

    el.addEventListener('click', handleClickOutside);

    portalRoot.appendChild(el);

    return () => {
      el.removeEventListener('click', handleClickOutside);
      portalRoot.removeChild(el);
    };
  }, [onClose]);

  return createPortal(children, elRef.current);
};

export default Portal;
