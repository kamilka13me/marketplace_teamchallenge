import React, { ReactNode, FC } from 'react';

import { Portal } from '@/shared/ui/Portal';

interface PortalProps {
  children: string | ReactNode;
  onCloseFunc: () => void;
  className?: string;
}

const ModalWindow: FC<PortalProps> = (props) => {
  const { children, onCloseFunc, className } = props;

  return (
    <Portal onClose={onCloseFunc}>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-main-white p-4 overflow-auto ${className}`}
      >
        {children}
      </div>
    </Portal>
  );
};

export default ModalWindow;
