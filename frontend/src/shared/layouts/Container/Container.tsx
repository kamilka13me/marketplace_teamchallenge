import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = (props) => {
  const { children, className } = props;

  return (
    <div className={`min-w-[375px] max-w-[1440px] px-4 xl:px-16 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
