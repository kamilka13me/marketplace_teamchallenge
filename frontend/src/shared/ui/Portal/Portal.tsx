import { ReactNode, FC, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

const portalRoot = document.body as HTMLElement;
const mainRoot = document.querySelector('#root') as HTMLElement;

interface PortalProps {
  children: string | ReactNode;
  onClose: () => void;
}

const Portal: FC<PortalProps> = (props) => {
  const { children, onClose } = props;

  const elRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.classList.add(
      'fixed',
      'top-0',
      'left-0',
      'w-screen',
      'h-screen',
      'bg-main-dark/50',
      'z-[99999]',
      'opacity-0',
      'transition-opacity',
      'duration-300',
    );

    portalRoot.classList.add('overflow-hidden');

    if (mainRoot) {
      mainRoot.setAttribute('inert', '');
    }

    portalRoot.addEventListener('keydown', handleKeyDown);

    setTimeout(() => {
      if (elRef.current) {
        elRef.current.classList.remove('opacity-0');
      }
    }, 0);
  }

  useEffect(() => {
    const el = elRef.current!;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (event.target === el) {
        onClose();
      }
    };

    el.addEventListener('mousedown', handleClickOutside);
    el.addEventListener('touchstart', handleClickOutside);

    portalRoot.appendChild(el);

    return () => {
      el.removeEventListener('mousedown', handleClickOutside);
      el.removeEventListener('touchstart', handleClickOutside);
      portalRoot.removeEventListener('keydown', handleKeyDown);
      portalRoot.removeChild(el);
      portalRoot.classList.remove('overflow-hidden');
      mainRoot.removeAttribute('inert');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(children, elRef.current);
};

export default Portal;
